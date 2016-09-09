import 'jsdom-global/register'
import Assert from 'assert';
import Sinon from 'sinon';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';

import React, { Component, PropTypes, ContextTypes } from 'react';

import SocketContext from '../src/SocketContext';

describe('<SocketContext />', () => {
  let SocketIOClient, testChild, seenSocket;

  const socket = {
    close: Sinon.spy(),
  };

  beforeEach(() => {
    testChild = <TestChild />
    SocketIOClient = Sinon.stub();
    SocketIOClient.returns(socket);
    SocketContext.__Rewire__('SocketIOClient', SocketIOClient);
  });

  afterEach(()=> {
    SocketContext.__ResetDependency__('SocketIOClient');
    seenSocket = void 0;
  })

  it('sets up socket connection without namespace', () => {
    const wrapper = mount(<SocketContext>{testChild}</SocketContext>);
    expect(SocketIOClient.calledOnce).to.equal(true);
    expect(seenSocket).to.be.equal(socket);
  });

  it('sets up socket connection with namespace', () => {
    const wrapper = mount(<SocketContext namespace="/foo">{testChild}</SocketContext>);
    expect(SocketIOClient.calledOnce).to.equal(true);
    expect(SocketIOClient.calledWith('/foo')).to.equal(true);
    expect(seenSocket).to.be.equal(socket);
  });

  it('closes socket on unmount', () => {
    const wrapper = mount(<SocketContext>{testChild}</SocketContext>);
    wrapper.unmount();
    expect(socket.close.calledOnce).to.equal(true);
  })

  // example child component: does just extract the socket for assertions
  class TestChild extends Component {

    componentDidMount() {
      seenSocket = this.context.socket;
    }

    render() {
      return (
        <span>Hi there!</span>
      );
    }

  }

  TestChild.contextTypes = {
    socket: PropTypes.object,
  };

});
