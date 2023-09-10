// import { REACT_ELEMENT } from 'react';
import { REACT_ELEMENT, REACT_FORWARD_REF } from './utils';
import Component from './component';

function createElement(type, properties, children) {
  let ref = properties.ref || null;
  let key = properties.key || null;
  ['key', 'ref', '__self', '__source'].forEach((key) => {
    delete properties[key];
  });
  let props = { ...properties };
  if (arguments.length > 3) {
    props.children = Array.prototype.slice.call(arguments, 2);
  } else {
    props.children = children;
  }

  return {
    $$typeof: REACT_ELEMENT,
    type,
    key,
    ref,
    props
  };
}

function createRef() {
  return { current: null };
}

function forwardRef(render) {
  return {
    $$typeof: REACT_FORWARD_REF,
    render
  };
}

const React = {
  createElement,
  createRef,
  forwardRef,
  Component
};

export default React;
