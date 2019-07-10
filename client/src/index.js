import React from 'react';
import ReactDOM from 'react-dom';
import Main from './Main';
import './index.css';
import * as serviceWorker from './serviceWorker';


// ReactDOM.render(<Header />, document.getElementById('header'));
// ReactDOM.render(<Sidebar />, document.getElementById('sidebar'));
// ReactDOM.render(<Concerts />, document.getElementsByClassName('container-fluid'));

ReactDOM.render(<Main />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
