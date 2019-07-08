import React from 'react';
import axios from 'axios';
import './concerts.css';

class Concerts extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			concertList: []
		}

		this.setInfo = this.setInfo.bind(this);
		this.display = this.display.bind(this);
		this.navigatePage = this.navigatePage.bind(this);

		this.setInfo();
	}

	// componentDidMount() {
	// 	axios.get("/getConcertsInfo").then((res) => {
	// 		console.log(res.data);
	// 		if(res.data.length === 0){return;}
	// 		this.setState({
	// 			concertList: res.data
	// 		})		
	// 	});
	// }

	setInfo() {
		axios.get("/getConcertsInfo").then((res) => {
			console.log(res.data);
			if(res.data.length === 0){return;}
			this.setState({
				concertList: res.data
			})		
		});
	}

	navigatePage(url) {
		window.open(url);
	}

	display() {
		return(
			this.state.concertList.map((element) => {
				return(
					<div className="row concert-info" key = {element.id}>
						<img src={"/getImage/" + element.img} className="col-4" alt={element.title}/>
						<div className="col-8 text-left">
							<h5>{element.title}</h5>
							<p>Date: {element.date}</p>
							<p>description: {element.description}</p>
							<div className="text-right">
								<input className="button_link" type="button" value="Info & Ticket" onClick={() => this.navigatePage(element.url)}/>
							</div>
						</div>
					</div>
				)
			})
		)
	}

	render() {
		return(
			<div>{this.display()}</div>
		)
	}

}
export default Concerts;
