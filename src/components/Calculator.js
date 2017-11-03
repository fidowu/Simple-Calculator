import React from 'react';

class KeyBoard extends React.Component{

  handle(e) {

    this.props.handle(e);
  }

  render(){

    const operator = this.props.val % 1 === 0  || this.props.val === '.' ? ' number ' : ' operator '; 
    const clName = 'button  ' + `key-${this.props.val}` + operator ;

    return (
        <button className={clName} onClick={this.handle.bind(this)} 
                 name={this.props.val} >{this.props.val}</button>  
      )
  }
}


const doCalculation = {
    '÷' : (number_1, number_2) =>  number_1 / number_2,
    '+' : (number_1, number_2) =>  parseFloat(number_1) + parseFloat(number_2),
    'x' : (number_1, number_2) =>  number_1 * number_2,
    '-' : (number_1, number_2) =>  number_1 - number_2
}


class CalcKeys extends React.Component {

  constructor(){

    super();

    this.state = {
      keys: [ 'C', '+/-', '%', '÷',
              7, 8, 9, 'x', 
          4, 5, 6, '-',
          1, 2, 3, '+',
          0, '.', '=']
    };

      this.handle = this.handle.bind(this);

  }

  handle(e){

    this.props.handle(e)
  }

  render(){

    return (

      <div className="calc-keys"> {/* this is the wrapper with flex */}
        
        {this.state.keys.map(function(value, i){

          return <KeyBoard {...this.props}  key={i} i={i} val={value} handle={this.handle} />

        }, this)}
        
      </div>
      )
  }
}

class Calculator extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
      answer : 0,
      first:"",
      last:"",
      operator:""
    }

    this.handle = this.handle.bind(this);
  }

  handle(e) {

    const operator = e.target.className.indexOf('operator') === -1 ? false : true;
    const regex = /[+-]?\d+(\.\d+)?/g;
    let padOperatior = " " + e.target.name + " ";

    if (operator && e.target.name ==='C') {

        this.setState({display:"", answer : 0, first: "", last: "", operator:""});

    } else {

      if (operator && this.state.first ) {

         if  (!this.state.last && e.target.name !== "=" && e.target.name !== "%"  
              && e.target.name !== "+/-") {

          this.setState({operator : e.target.name});

        }

        if (e.target.name === "%") {

          if (!this.state.last) {

            let n = this.state.first / 100;
          
            this.setState({first:n})

          } else {

            let n = this.state.last/ 100;

              this.setState({last:n})
          }

          return;
        }

        if (e.target.name === "+/-") {

          if (!this.state.last) {
            
            let n = this.state.first > 0 ? Math.abs(this.state.first) * -1 :
                           Math.abs(this.state.first);
            this.setState({first:n})

          } else {

            let n = this.state.last > 0 ? Math.abs(this.state.last) * -1 :
                           Math.abs(this.state.last); 
            this.setState({last:n});
          }

          return;
        }

        if (this.state.last) {

          const answer = doCalculation[this.state.operator](this.state.first, this.state.last);
            const op = e.target.name === '=' ? "" : e.target.name;
            const lc = e.target.name === '=' ? "" : answer;

          this.setState({answer, first: lc, operator : op, last : ""});
        }
      }

      if (!operator) {

        if (!this.state.operator   && !this.state.last) {

            let arr =  this.state.first + e.target.name;
          this.setState({ first : arr})

        } else {

          let arr =  this.state.last + e.target.name;
          this.setState({ last : arr})

        }
      }
    }

  }

  render(){

    const p = this.state.first + " " + this.state.operator + " " + this.state.last;

    return (

      <div className="calc-keyboard ">
        <div className="result-bar">
          {this.state.answer}
        </div>
        <div className="values-entered">{p} </div>
        <CalcKeys handle={this.handle} />   
      </div>

      )
  }

}

export default Calculator;