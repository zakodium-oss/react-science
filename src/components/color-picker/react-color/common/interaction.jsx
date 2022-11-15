import { Component } from 'react';

export const handleFocus = (WrappedComponent, Span = 'span') =>
  class Focus extends Component {
    state = { focus: false };
    handleFocus = () => this.setState({ focus: true });
    handleBlur = () => this.setState({ focus: false });

    render() {
      return (
        <Span onFocus={this.handleFocus} onBlur={this.handleBlur}>
          <WrappedComponent {...this.props} {...this.state} />
        </Span>
      );
    }
  };
