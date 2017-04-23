import { Component } from 'react';
import PropTypes from 'prop-types';
import SocketIOClient from 'socket.io-client';

class SocketContext extends Component {

  componentWillMount() {
    this.socket = SocketIOClient(this.props.namespace);
  }

  componentWillUnmount() {
    this.socket.close();
    delete this.socket;
  }

  getChildContext() {
    return { socket: this.socket };
  }

  render() {
    return this.props.children;
  }
}

SocketContext.childContextTypes = {
  socket: PropTypes.object,
};

SocketContext.propTypes = {
  namespace: PropTypes.string,
  children: PropTypes.element.isRequired,
};

export default SocketContext;
