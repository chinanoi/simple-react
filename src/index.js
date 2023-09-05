// import ReactDOM from 'react-dom';
// import React from 'react';
import React from './react';
import ReactDOM from './react-dom';

class MyClassComponent extends React.Component {
  counter = 0;
  constructor(props) {
    super(props);
    this.state = { count: '0' };
  }
  updateShowText(newText) {
    this.setState({
      count: newText
    });
  }
  render() {
    return (
      <div
        className='test-class'
        style={{
          color: 'red',
          cursor: 'pointer',
          border: '1px solid gray',
          borderRadius: '6px',
          display: 'inline-block',
          padding: '6px 12px'
        }}
        onClick={() => this.updateShowText('' + ++this.counter)}
      >
        Simple React Counter: {this.state.count}
      </div>
    );
  }
}

ReactDOM.render(<MyClassComponent />, document.getElementById('root'));



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
