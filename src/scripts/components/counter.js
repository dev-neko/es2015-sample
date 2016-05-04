import React from 'react';

export default class Counter extends React.Component {

  constructor() {
    super();
    this.state = {
      count: 0
    }

    this._minusCount = this._minusCount.bind(this);
    this._plusCount  = this._plusCount.bind(this);
  }


  render() {
    return (
      <div className="counter">
        <p className="counter-value">
          Now "{this.state.count}" counts.
        </p>
        <p className="counter-ui">
          <span>
            <a href="" onClick={this._plusCount}>Plus</a>
            &nbsp;|&nbsp;
            <a href="" onClick={this._minusCount}>Minus</a>  
          </span>
        </p>
      </div>
    );
  }

  _plusCount(e) {
    e.preventDefault();
    this.setState({
      count: (this.state.count + 1)
    });
  }

  _minusCount(e) {
    e.preventDefault();
    this.setState({
      count: (this.state.count - 1)
    });
  }




}
