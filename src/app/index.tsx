import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('react-page'));

// @ts-ignore
if (module.hot) {
    // @ts-ignore
    module.hot.accept();
}
