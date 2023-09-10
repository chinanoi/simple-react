import { REACT_ELEMENT, REACT_FORWARD_REF } from './utils';
import { addEvent } from './event';

function setPropsForDom(dom, VNodeProps = {}) {
  console.log(VNodeProps);
  if (!dom) return;
  for (let key in VNodeProps) {
    if (key === 'children') continue;
    if (/^on[A-Z].*/.test(key)) {
      addEvent(dom, key.toLowerCase(), VNodeProps[key]);
    } else if (key === 'style') {
      Object.keys(VNodeProps[key]).forEach((styleName) => {
        dom.style[styleName] = VNodeProps[key][styleName];
      });
    } else {
      dom[key] = VNodeProps[key];
    }
  }
}
function getDomByFunctionComponent(VNode) {
  let { type, props } = VNode;
  let renderVNode = type(props);
  if (!renderVNode) return null;
  return createDOM(renderVNode);
}

function getDomByClassComponent(VNode) {
  let { type, props, ref } = VNode;
  let instance = new type(props);
  ref && (ref.current = instance);
  let renderVNode = instance.render();
  instance.oldVNode = renderVNode;
  if (!renderVNode) return null;
  return createDOM(renderVNode);
}

function getDomByForwardRefFunction(vNode) {
  let { type, props, ref } = vNode;
  let renderVdom = type.render(props, ref);
  if (!renderVdom) return null;
  return createDOM(renderVdom);
}

export function findDomByVNode(VNode) {
  if (!VNode) return;
  if (VNode.dom) return VNode.dom;
}

export function updateDomTree(oldDom, newVNode) {
  let parentNode = oldDom.parentNode;
  parentNode.removeChild(oldDom);
  parentNode.appendChild(createDOM(newVNode));
}

function createDOM(VNode) {
  // 创建元素  处理子元素   处理属性值
  const { type, props, $$typeof, ref } = VNode;
  let dom;
  if (type && type.$$typeof === REACT_FORWARD_REF) {
    return getDomByForwardRefFunction(VNode);
  }
  if (
    typeof type === 'function' &&
    type.IS_CLASS_COMPONENT &&
    $$typeof === REACT_ELEMENT
  ) {
    return getDomByClassComponent(VNode);
  }
  if (typeof type === 'function' && $$typeof === REACT_ELEMENT) {
    console.log(VNode);
    return getDomByFunctionComponent(VNode);
  }
  if (type && $$typeof === REACT_ELEMENT) {
    dom = document.createElement(type);
  }
  // 处理子元素，如果子元素为数组，为对象，为字符串，分别处理
  if (props && props.children) {
    if (
      props.children &&
      typeof props.children === 'object' &&
      props.children.type
    ) {
      mount(props.children, dom);
    } else if (Array.isArray(props.children)) {
      mountArray(props.children, dom);
    } else if (typeof props.children === 'string') {
      dom.appendChild(document.createTextNode(props.children));
    }
  }
  setPropsForDom(dom, props);
  VNode.dom = dom;
  ref && (ref.current = dom);
  return dom;
}

function mount(VNode, containerDOM) {
  let newDOM = createDOM(VNode);
  newDOM && containerDOM.appendChild(newDOM);
}

function mountArray(children, parent) {
  if (!Array.isArray(children)) return;
  for (let i = 0; i < children.length; i++) {
    if (typeof children[i] === 'string') {
      parent.appendChild(document.createTextNode(children[i]));
    } else {
      mount(children[i], parent);
    }
  }
}

function render(VNode, containerDOM) {
  // 将虚拟DOM转化成真实DOM
  // 将得到的真实DOM挂载到containerDOM中
  mount(VNode, containerDOM);
}

const ReactDOM = {
  render
};

export default ReactDOM;
