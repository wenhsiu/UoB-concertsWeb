import React from 'react';
import axios from 'axios';
import './concerts.css';
import Likebutton from '../like/Likebutton';
import ConcertList from './ConcertList';

class Concerts extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			concertList: [],
		}

		this.display = this.display.bind(this);
		this.getCookie = this.getCookie.bind(this);
		this.navigatePage = this.navigatePage.bind(this);
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

	getCookie(cname) {
		var name = cname + "=";
		var decodedCookie = decodeURIComponent(document.cookie);
		var ca = decodedCookie.split(';');
		for(var i = 0; i <ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) === ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) === 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	}

	display() {
		return(
			this.state.concertList.map((element) => {
				return(
					<div className="row concert-info" key = {element.id}>
						<img src={"concerts_images/" + element.img} className="concert_img col-5" alt={element.title}/>
						<div className="col-7 text-left">
							<h5>{element.title}</h5>
							<p>Date: {element.date}</p>
							<p>{element.description}</p>
							<div className="text-right">
								<Likebutton id={element.id} />
								<input className="concert_link" type="button" value="Info & Ticket" onClick={() => this.navigatePage(element.url)}/>
							</div>
						</div>
					</div>
				)
			})
		)
	}

	render() {
		return(
			// <div>{this.display()}</div>
			<ConcertList concert={this.state.concertList} navigate={this.navigatePage}></ConcertList>
		)
	}

}
export default Concerts;
