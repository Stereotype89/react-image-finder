import React, { Component } from 'react';
import propTypes from 'prop-types';

export class Button extends Component {
  static propTypes = { fn: propTypes.func };

  render() {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
    return (
      <button className="Button" type="button" onClick={e => this.props.fn()}>
        Load more
      </button>
    );
  }
}
