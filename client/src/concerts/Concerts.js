import React from 'react';
import axios from 'axios';
import './concerts.css';
import Sidebar from '../sidebar/Sidebar';
// import Likebutton from '../like/Likebutton';
import ConcertList from './ConcertList';
// import Search from '../header/Search'

class Concerts extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			concertList: [],
			keyword: '',
			date: ""
		}

		this.navigatePage = this.navigatePage.bind(this);
		this.handleDate = this.handleDate.bind(this);
	}

	componentDidMount() {
		axios.get("/getConcertsInfo").then((res) => {
			// console.log(res.data);
			if(res.data.length === 0){return;}
			this.setState({
				concertList: res.data
			});
		});
	}

	navigatePage(url) {
		window.open(url);
	}
	handleDate(value) {
		this.setState({date: value});
	}

	render() {
		return(
			<div className="row">
				<Sidebar date={this.handleDate} className="col-2"/>
				<ConcertList concert={this.state.concertList} keyword={this.props.keyword} navigate={this.navigatePage} date={this.state.date}></ConcertList>
			</div>
		)
	}

}
export default Concerts;
