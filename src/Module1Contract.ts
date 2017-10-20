import { Component } from 'react';

export interface Module1Props {
  info: string;
  test?: boolean;
}
export abstract class Module1 extends Component<Module1Props> {

}

export type Module1Loadable = typeof Module1 | false;
