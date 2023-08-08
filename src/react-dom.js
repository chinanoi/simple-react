import { REACT_ELEMENT } from './utils';

function createDOM(VNode) {
  // 创建元素  处理子元素   处理属性值
  const { type, props, $$typeof } = VNode;
  let dom;
  if (type && $$typeof === REACT_ELEMENT) {
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