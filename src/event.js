import { updaterQueue, flushUpdateQueue } from './component.js';

export function addEvent(dom, eventName, bindFunction) {
  dom.attach = dom.attach || {};
  dom.attach[eventName] = bindFunction;

  // 核心点 1/2: 事件绑定到document上
  if (document[eventName]) return;
  document[eventName] = dispatchEvent;
}

function dispatchEvent(nativeEvent) {
  // 是否批量
  updaterQueue.isBathingUpdate = true;
  // 这里本质上是对原始事件进行了一层代理
  // 核心点 2/2: 屏蔽浏览器差异
  // 将原始事件对象转化为自定义事件对象
  let syntheticEvent = createSyntheticEvent(nativeEvent);
  // 事件源：事件所在的原生对象，触发事件的dom对象
  let target = nativeEvent.target;
  /**
   * while循环是为了处理冒泡，否则执行执行下面代码就可以了:
   * let eventType = `on${nativeEvent.type}`;
   * let bindFunction = target.attach && target.attach[eventType];
   * bindFunction && bindFunction(nativeEvent.target)
   */
  while (target) {
    syntheticEvent.currentTarget = target;
    let eventName = `on${nativeEvent.type}`;
    let bindFunction = target.attach && target.attach[eventName];
    bindFunction && bindFunction(syntheticEvent);
    if (syntheticEvent.isPropagationStopped) {
      break;
    }
    // 从内而外循环
    target = target.parentNode;
  }

  flushUpdateQueue();
}

// 生成自定义事件对象
function createSyntheticEvent(nativeEvent) {
  let natvieEventKeyValues = {};
  for (let key in nativeEvent) {
    natvieEventKeyValues[key] =
      typeof nativeEvent[key] === 'function'
        ? nativeEvent[key].bind(nativeEvent)
        : nativeEvent[key];
  }
  let syntheticEvent = Object.assign(natvieEventKeyValues, {
    nativeEvent,
    isDefaultPrevented: false,
    isPropagationStopped: false,
    preventDefault: function () {
      this.isDefaultPrevented = true;
      if (this.nativeEvent.preventDefault) {
        this.nativeEvent.preventDefault();
      } else {
        this.nativeEvent.returnValue = false;
      }
    },
    stopPropagation: function () {
      this.isPropagationStopped = true;
      if (this.nativeEvent.stopPropagation) {
        this.nativeEvent.stopPropagation();
      } else {
        this.nativeEvent.cancelBubble = true;
      }
    }
  });
  return syntheticEvent;
}
