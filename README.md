React Socket Context
=========

[![Build Status](https://travis-ci.org/makii42/react-socket-context.svg?branch=master)](https://travis-ci.org/makii42/react-socket-context) [![Dependencies](https://david-dm.org/makii42/react-socket-context/status.svg)](https://david-dm.org/makii42/react-socket-context)

A small component that creates a [socket.io](http://socket.io/) connection and exposes it via
the components' [context][context] to child components.

## How to install?

    npm install --save FIXME

## Wait? There is `react-socket`?

`react-socket` is great if you just wanna listen to events that are streamed from the server to the client. As your component does never get direct access to the socket itself in your code, you can not easily _emit_ events on the socket to pass messages to the server.

By exposing the socket directly though the [context][context] to all child components, you have direct access to it and can emit as well as subscribe to events.

## So how do I use it?

Given this start:

```javascript
import React from 'react';
import { render } from 'react-dom';

import SocketContext from 'react-socket-context';
import MyComponent from './MyComponent';

render(
  <SocketContext>
    <MyComponent foo="bar"/>
  </SocketContext>
    , document.getElementById('app')
);
```

This will set up a socket at the default URL (wherever your app was loaded from), and expose it in the child context for child components to access. To access it in `MyComponent`, do as follows:

```javascript
import React, { Component, PropTypes } from 'react';

export default class MyComponent extends Component {
  componentDidMount() {
    this.context.socket.on('bootstrap', (data) => this.handleDataBootstrap(data));
    this.context.socket.on('event', (data) => this.handleDataIncremental(data));
    this.context.socket.emit('bootstrap', { duration: Moment.duration(1, 'h') } );
  }

  handleDataBootstrap(data) {
    // Handle your bootstrap data package to set up the component.
    this.setState({foo: data.foo});
  }

  handleDataIncremental(data) {
    // Merge the new event
    const newFoo = this.mergeFoo(this.state.foo, data);
    this.setState({foo: newFoo});
  }

  mergeFoo(base, increment) {
    // merge data
  }
  // ...
}

DelayChart.contextTypes = {
  socket: PropTypes.object,
};
```

Looking at this component, it just accesses the provided `socket` via `this.context.socket`. For that to work, *you need to declare your usage of the socket in `contextTypes`*.



[context]: https://facebook.github.io/react/docs/context.html
