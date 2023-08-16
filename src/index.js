// import ReactDOM from 'react-dom';
// import React from 'react';
import React from './react';
import ReactDOM from './react-dom';

class MyClassComponent extends React.Component {
  render() {
    return (
      <div className='test-class' style={{ color: 'red' }}>
        Simple React App<span>{this.props.xx}</span>
        <span>xx2</span>
      </div>
    );
  }
}

ReactDOM.render(<MyClassComponent xx="xx1"/>, document.getElementById('root'))



// function MyFunctionComponent(props){
//     return <div className='test-class' style={{color: 'red'}}>Simple React App<span>{props.xx}</span><span>xx2</span></div>
// }

// ReactDOM.render(<MyFunctionComponent xx="xx1"/>, document.getElementById('root'))


// ReactDOM.render(
//   <div style={{ color: 'red' }}> Hello Simple React </div>,
//   document.getElementById('root')
// );

// console.log(
//   <div style={{ color: 'red' }}>
//     Hello Simple React <span>111</span>
//     <span>22222</span>
//   </div>
// );
