import { findDomByVNode, updateDomTree } from './react-dom';

export let updaterQueue = {
  isBatch: false,
  updaters: new Set()
};

export function flushUpdateQueue() {
  updaterQueue.isBatch = false;
  for (let updater of updaterQueue.updaters) {
    updater.launchUpdate();
  }
  updaterQueue.updaters.clear();
}

class Updater {
  constructor(ClassComponentInstance) {
    this.ClassComponentInstance = ClassComponentInstance;
    this.pendingState = [];
  }

  addState(partialState) {
    this.pendingState.push(partialState);
    this.preHandleForUpdate();
  }
  preHandleForUpdate() {
    // 如果是批量
    if (updaterQueue.isBatch) {
      updaterQueue.updaters.add(this);
    } else {
      // 不是批量
      this.launchUpdate();
    }
  }
  launchUpdate() {
    const { ClassComponentInstance, pendingState } = this;
    if (pendingState.length === 0) return;
    ClassComponentInstance.state = this.pendingState.reduce(
      (preState, newState) => {
        return { ...preState, ...newState };
      },
      ClassComponentInstance.state
    );
    this.pendingState.length = 0;
    ClassComponentInstance.update();
  }
}

class Component {
  static IS_CLASS_COMPONENT = true;
  constructor(props) {
    this.updater = new Updater(this);
    this.state = {};
    this.props = props;
  }
  setState(partialState) {
    console.log('partialState', partialState);
    // 1. 合并属性
    // this.state = [...this.state, ...partialState];
    // 2. 重新渲染更新
    // this.update();
    this.updater.addState(partialState);
  }
  update() {
    // 1. 获取重新执行render函数后的虚拟DOM，新虚拟DOM
    // 2. 根据新虚拟DOM生成新的真实DOM
    // 3. 将真实DOM挂载到页面上
    let oldVNode = this.oldVNode; // TODO: 让类组件拥有一个oldVNode属性保存类组件实例对应的虚拟DOM
    let oldDOM = findDomByVNode(oldVNode);
    let newVNode = this.render();
    updateDomTree(oldDOM, newVNode);
    this.oldVNode = oldVNode;
  }
}

export default Component;
