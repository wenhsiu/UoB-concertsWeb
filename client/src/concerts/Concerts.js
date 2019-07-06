import React from 'react';
import axios from 'axios';
import './concerts.css';

class Concerts extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			concertList: []
		}

		this.display = this.display.bind(this);
	}

	componentDidMount() {
		axios.get("/getConcertsInfo").then((res) => {
			console.log(res.data);
			if(res.data.length === 0){return;}
			this.setState({
				concertList: res.data
			})		
		});
	}

	display() {
		return(
			this.state.concertList.map((element) => {
				return(
					<div className="row concert-info" key = {element.id}>
						<img src="..." className="col-4" alt="..."/>
						<div className="col-8 text-left">
							<h5>Title: {element.title}</h5>
							<p>Date: {element.date}</p>
							<p>description: {element.description}</p>
							<div className="text-right">
								<input className = "button_link" type="button" value="Info & Ticket"/>
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
