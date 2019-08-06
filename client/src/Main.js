import React from 'react';
import { Route, HashRouter } from 'react-router-dom';
import Header from './header/Header';
import Sidebar from './sidebar/Sidebar';
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
				<div className="row">
					{/*<!-- Sidebar -->*/}
					<Sidebar date={this.handleDate} />
					{/*<!-- Content -->*/}
					<div id="content" className="col-8">
						<Route exact path="/" render={(props) => <Concerts keyword={this.state.keyword} date={this.state.date} />} />
						<Route path="/likelist" component={Likelist}/>
					</div>	
				</div>
			</HashRouter>
		);
	}
}

export default Main;