import { Component, PropTypes } from 'react';
import SocketIOClient from 'socket.io-client';

class Socketeer extends Component {

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

Socketeer.childContextTypes = {
  socket: PropTypes.object,
};

Socketeer.propTypes = {
  namespace: PropTypes.string,
  children: PropTypes.element.isRequired,
};

export default Socketeer;
