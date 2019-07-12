import React from 'react';
import axios from 'axios';
import '../concerts/concerts.css';


class Likelist extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: "",
			concertList: [],
			id: ""
		};

		this.getCookie = this.getCookie.bind(this);
		this.display = this.display.bind(this);
	}

	componentDidMount() {
		if(this.getCookie("username") !== "") {
			axios.get("/getLikeConcertsInfo/" + this.getCookie("username")).then((res) => {
				console.log(res.data);
				if(res.data.length === 0){return;}
				this.setState({
					concertList: res.data
				})		
			});
		}
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

	navigatePage(url) {
		window.open(url);
	}

	setLikeButton(e, id) {
		let user = this.getCookie("username");

		e.persist();
		this.setState({ id: id }, () => {
			// console.log(this.state.id);
			if(user !== "") {
			e.preventDefault();
			axios.post('/likeConcert/' + user, this.state).then((res) => {
				if(res.status === 200) {
					console.log("Add/delete successfully");
				}
			})
			.catch((err) => {
				console.log(err);
			});
		} else {
			this.toggle();
		}
		});
	}

	display() {
		return(
			this.state.concertList.map((element) => {
				return(
					<div className="row concert-info" key = {element.id}>
						<img src={"concerts_images/" + element.img} className="concert_img col-4" alt={element.title}/>
						<div className="col-8 text-left">
							<h5>{element.title}</h5>
							<p>Date: {element.date}</p>
							<p>{element.description}</p>
							<div className="text-right">
								<button className="like_button" type="button">
									<i class="fas fa-times cancel"></i>
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

export default Likelist;
