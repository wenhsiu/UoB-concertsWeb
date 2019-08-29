import React from 'react';
import { Route, HashRouter } from 'react-router-dom';
import Header from './header/Header';
// import Sidebar from './sidebar/Sidebar';
import Concerts from './concerts/Concerts';
import Likelist from './like/Likelist';

class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			keyword: '',
			date: []
		}

		this.handleKeyoWord = this.handleKeyoWord.bind(this);
		this.handleDate = this.handleDate.bind(this);
	}

	handleKeyoWord(value) {
		this.setState({keyword: value});
	}

	handleDate(value) {
		this.setState({date: value});
	}

	render() {
		return(
			<HashRouter>
				{/*<!-- Header -->*/}
				<Header keyword={this.handleKeyoWord}/>
				{/*<!-- Content -->*/}
				<div id="content">
					<Route exact path="/" render={(props) => <Concerts keyword={this.state.keyword} />} />
					<Route path="/likelist" className="col-2" component={Likelist}/>
				</div>
			</HashRouter>
		);
	}
}

export default Main;
