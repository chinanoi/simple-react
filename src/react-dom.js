import { REACT_ELEMENT } from './utils';

function setPropsForDom(dom, VNodeProps = {}) {
  if (!dom) return;
  for (let key in VNodeProps) {
    if (key === 'children') continue;
    if (/^on[A-Z].*/.test()) {
      // onXxx事件
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
  let { type, props } = VNode;
  let instance = new type(props);
  let renderVNode = instance.render();
  instance.oldVNode = renderVNode;
  setTimeout(() => {
    instance.setState({ test: '88888' });
  }, 3000);
  if (!renderVNode) return null;
  return createDOM(renderVNode);
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
  const { type, props, $$typeof } = VNode;
  let dom;
  if (
    typeof type === 'function' &&
    type.IS_CLASS_COMPONENT &&
    $$typeof === REACT_ELEMENT
  ) {
    console.log(VNode);
    return getDomByClassComponent(VNode);
  } else if (typeof type === 'function' && $$typeof === REACT_ELEMENT) {
    console.log(VNode);
    return getDomByFunctionComponent(VNode);
  } else if (type && $$typeof === REACT_ELEMENT) {
    console.log(type);
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
