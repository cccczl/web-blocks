import React = require('react');
import ReactDOM = require('react-dom');
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { lightBaseTheme } from 'material-ui/styles';

import ToolBox = require('./ToolBox');
import Game from '../app/Game';

const injectTapEventPlugin = require('react-tap-event-plugin');

injectTapEventPlugin();

const ViewPort = React.createClass<{ ref: string }, any>({
  getInitialState() {
    return {};
  },

  render() {
    return (
      <MuiThemeProvider>
        <div className="viewPort">
          <div className="miniConsole">
            <div className="miniConsoleOutput">
              <ul></ul>
            </div>
            <input className="miniConsoleInput" />
          </div>
          <div className="helpBar">
            Keys: [WASD]= Walk, [SHIFT]= Un/Lock Camera to Mouse, [SPACE]= Jump, [ESCAPE]= Toggle Code Editor, [Enter]= On-screen console
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
});

const App = React.createClass<{ game?: Game }, any>({
  getInitialState() {
    return {};
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext() {
    return {
      muiTheme: getMuiTheme(lightBaseTheme)
    };
  },

  render() {
    return (
      <div className="app">
        <ViewPort ref="viewPort"></ViewPort>
        <ToolBox game={this.props.game}></ToolBox>
      </div>
    );
  }
});

class UserInterface {
  container: HTMLDivElement;
  app: any;

  init(_container: HTMLDivElement) {
    this.container = _container;
    this.app = ReactDOM.render(<App />, this.container);
  }

  getViewPort() {
    return ReactDOM.findDOMNode(this.app.refs.viewPort) as HTMLDivElement;
  }

  setGame(game: Game) {
    this.app = ReactDOM.render(<App game={game} />, this.container);
  }
}

export default UserInterface;
