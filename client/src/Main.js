import React from 'react';
import { Route, HashRouter } from 'react-router-dom';
import Header from './header/Header';
import Sidebar from './sidebar/Sidebar';
import Concerts from './concerts/Concerts';
import Likelist from './like/Likelist';

class Main extends React.Component {
	render() {
		return(
			<HashRouter>
				{/*<!-- Header -->*/}
				<Header />
				<div className="row">
					{/*<!-- Sidebar -->*/}
					<Sidebar />
					{/*<!-- Content -->*/}
					<div id="content" className="col-8">
						<Route exact path="/" component={Concerts}/>
						<Route exact path="/Likelist" component={Likelist}/>
					</div>	
				</div>
			</HashRouter>
		);
	}
}

export default Main;
