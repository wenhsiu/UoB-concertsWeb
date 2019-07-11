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

	navigatePage(url) {
		window.open(url);
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
								<button className="like_button" type="button">
									<i className="fas fa-heart like"></i>
									<i className="far fa-heart notlike"></i>
								</button>
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
			<div>{this.display()}</div>
		)
	}

}
export default Concerts;
