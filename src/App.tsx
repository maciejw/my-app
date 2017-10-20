import * as React from 'react';
import { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import './App.css';
import { Module1Loadable } from './Module1Contract';

const logo = require('./logo.svg');

interface AppProps {
  welcome: string;
}
interface AppState {
  checked: boolean;
  checkedText: string;
}
type LoadedModule = { default?: {} };
type RenderResult = JSX.Element | JSX.Element[] | string | number | null | false;

interface AsyncProps<TComponent> {
  load: () => Promise<LoadedModule>;
  children: (Component: TComponent | false) => RenderResult;
}
interface AsyncState<TComponent> {
  Component: TComponent | false;
}
class Async<TComponent>
  extends Component<AsyncProps<TComponent>, AsyncState<TComponent>> {
  constructor() {
    super();
    this.state = { Component: false };
  }
  componentDidMount() {
    this.props.load().then(m => {
      this.setState({ Component: (m.default || m) as TComponent });
    });

  }

  render() {
    return this.props.children(this.state.Component);
  }

}

const Module1Async = () => (
  <Async load={() => import('./Module1')}>
    {(Module1: Module1Loadable) => Module1 ? <Module1 info="hello from app" /> : <div>Loading...</div>}
  </Async>
);

class App extends React.Component<AppProps, AppState> {
  constructor() {
    super();
    this.state = { checked: false, checkedText: 'no' };
  }

  onClick() {
    this.setState((prevState: AppState, props: AppProps) => {
      let { checked } = prevState;
      checked = !checked;
      const checkedText = checked ? 'yes' : 'no';
      return { checked, checkedText };
    });
  }

  render() {
    return [
      (
        <div className="App" key="1">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>{this.props.welcome}</h2>
          </div>
          <p className="App-intro">
            To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
          <label>
            click me <input type="checkbox" checked={this.state.checked} onClick={() => this.onClick()} />
          </label>
          <p>
            clicked? {this.state.checkedText}
          </p>
        </div>
      ), (
        <div key="2">
          <ul>
            <li><Link to="/">root</Link></li>
            <li><Link to="/module1">module1</Link></li>
          </ul>

          <Route path="/module1" component={Module1Async} />
        </div>
      )

    ];
  }
}

export default App;
