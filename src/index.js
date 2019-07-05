import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Header from './header/Header';
import Sidebar from './sidebar/Sidebar';
import Concerts from './concerts/Concerts';
import * as serviceWorker from './serviceWorker';


ReactDOM.render(<Header />, document.getElementById('header'));
ReactDOM.render(<Sidebar />, document.getElementById('sidebar'));
// ReactDOM.render(<Concerts />, document.getElementsByClassName('container-fluid'));
ReactDOM.render(<Concerts />, document.getElementById('concerts'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
