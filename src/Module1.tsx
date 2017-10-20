import { Component } from 'react';
import * as React from 'react';
import { Module1 as Module1Contract, Module1Props } from './Module1Contract';

export default class Module1 extends Component<Module1Props> implements Module1Contract {
    render() {
        return (<div>hello from Module1 {this.props.info}</div>);
    }
}
