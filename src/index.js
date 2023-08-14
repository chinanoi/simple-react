// import ReactDOM from 'react-dom';
// import React from 'react';
import React from './react';
import ReactDOM from './react-dom';

ReactDOM.render(
  <div style={{ color: 'red' }}> Hello Simple React </div>,
  document.getElementById('root')
);

console.log(
  <div style={{ color: 'red' }}>
    Hello Simple React <span>111</span>
    <span>22222</span>
  </div>
);
