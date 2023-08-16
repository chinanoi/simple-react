// import { REACT_ELEMENT } from 'react';
import { REACT_ELEMENT } from './utils';
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

const React = {
  createElement,
  Component
};

export default React;
