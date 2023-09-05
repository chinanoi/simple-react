// import ReactDOM from 'react-dom';
// import React from 'react';
import React from './react';
import ReactDOM from './react-dom';

//index.js
class CustomTextInput extends React.Component {
    constructor(props) {
      super(props);
      // create a ref to store the textInput DOM element
      this.textInput = React.createRef();
      this.focusTextInput = this.focusTextInput.bind(this);
    }
  
    focusTextInput() {
      // Explicitly focus the text input using the raw DOM API
      // Note: we're accessing "current" to get the DOM node
      this.textInput.current.focus();
    }
  
    render() {
      // tell React that we want to associate the <input> ref
      // with the `textInput` that we created in the constructor
      return (
        <div>
          <input
            type="text"
            ref={this.textInput} />
          <input
            type="button"
            value="Focus the text input"
            onClick={this.focusTextInput}
          />
        </div>
      );
    }
  }

  class AutoFocusTextInput extends React.Component {
    constructor(props) {
      super(props);
      this.textInput = React.createRef();
    }
  
    componentDidMount() {
      this.textInput.current.focusTextInput();
    }
  
    render() {
      return (
        <CustomTextInput ref={this.textInput} />
      );
    }
  }
  

class MyClassComponent extends React.Component {
  counter = 0;
  constructor(props) {
    super(props);
    this.state = { count: '0' };
    this.textInput4 = React.createRef();
  }
  updateShowText(newText) {
    this.setState({
      count: newText
    });
  }

  render() {
    return (
      <>
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
        <CustomTextInput />
      </>
    );
  }
}

ReactDOM.render(<AutoFocusTextInput />, document.getElementById('root'));



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
