import React from 'react';
import axios from 'axios';
import { Modal, ModalHeader } from 'reactstrap';


class Likebutton extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: this.props.id,
			isLiked: null,
			modal: false
		};

		this.getCookie = this.getCookie.bind(this);
		this.toggle = this.toggle.bind(this);
		// this.checkLiked = this.checkLiked.bind(this);
	}

	toggle() {
		this.setState(prevState => ({
			modal: !prevState.modal
		}));
	}

	// checkLiked() {
	componentDidMount() {
		let user = this.getCookie("username");

		if(user !== "") {
			axios.post('/checkLike/' + user, this.state).then((res) => {
				this.setState({
					isLiked: res.data
				})
				// console.log(res.data);
				// return res.data;
			})
			.catch(function(err){
				console.log(err);
			});
		}
	}

	handleClick(e) {
		let user = this.getCookie("username");

		if(user !== "") {
			e.preventDefault();
			axios.post('/likeConcert/' + user, this.state).then((res) => {
				if(res.status !== 400) {
					console.log("Add/delete successfully");
					this.setState({ isLiked: res.data });
					// console.log("updated: " + this.state.isLiked);
				}
			})
			.catch((err) => {
				console.log(err);
			});
		}

		this.toggle();
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

	render() {
		if(this.getCookie("username") !== "") {
			if(this.state.isLiked === true) {
				return(
					<button className="like_button isLiked" type="button" onClick={(e) => this.handleClick(e)}>
						<i className="fas fa-heart liked"></i>
						<i className="far fa-heart noliked"></i>
					</button>
				)
			} else {
				return(
					<button className="like_button" type="button" onClick={(e) => this.handleClick(e)}>
						<i className="fas fa-heart like"></i>
						<i className="far fa-heart notlike"></i>
					</button>
				)
			}
			
		} else {
			return(
				<span>
					<button className="like_button" type="button" onClick={this.toggle}>
						<i className="fas fa-heart like"></i>
						<i className="far fa-heart notlike"></i>
					</button>
					<Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
						<ModalHeader toggle={this.toggle}>Please login first!</ModalHeader>
					</Modal>
				</span>
			)
		}
	}
}

export default Likebutton;
