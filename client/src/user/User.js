import React from 'react';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './user.css'


class User extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: false,
			account: "",
			password: ""
		};

		this.toggle = this.toggle.bind(this);
		this.getCookie = this.getCookie.bind(this);
		this.deleteCookie = this.deleteCookie.bind(this);
		this.setLoginOutButton = this.setLoginOutButton.bind(this);
		this.setLoginForm = this.setLoginForm.bind(this);
	}

	toggle() {
		this.setState(prevState => ({
			modal: !prevState.modal
		}));
	}

	handleKeyPress(e) {
		if (e.key === 'Enter') {
			e.preventDefault();
		}
	}

	loginClick(e) {
		e.preventDefault();
		    
		axios.post('/UserLogin', this.state).then((res) => {
			console.log(res);
			if(res.status === 200) {
				//add username into cookie
				let d = new Date();
				d.setTime(d.getTime() + (24*60*60*1000));
				let expire = "expires=" + d.toUTCString();
				document.cookie = "username=" + res.data + ";" + expire + "path=/;";
			}
         
		}).catch(function(error){ 
			
			console.log(error);
		});

		this.toggle();
	}

	registerClick(e) {
		e.preventDefault()					
		axios.post('/UserRegister', this.state)
		.then((res) => {
			console.log(res.data);
			
			if(res.status === 200) {
				//add username into cookie
				let d = new Date();
				d.setTime(d.getTime() + (24*60*60*1000));
				let expire = "expires=" + d.toUTCString();
				document.cookie = "username=" + res.data + ";" + expire + "path=/;";
			}
		})
		.catch(function(error){
			console.log(error);
		});

		window.location.reload();
		this.toggle();
	}

	handleACChange(e) {
		this.setState({account: e.target.value})
	}

	handlePWChange(e) {
		this.setState({password: e.target.value})
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

	deleteCookie() {
		let expire = "Thu, 01 Jan 1970 00:00:00 UTC";
		document.cookie = "username=; " + expire + "path=/;";
		window.location.reload();
	}

	setLoginOutButton() {
		if(this.getCookie("username") !== "") {
			return <input className = "button_link" type="button" value="Logout" onClick={this.deleteCookie} />
		} else {
			return <input className = "button_link" type="button" value="Login/Register" onClick={this.toggle} />
		}
	}

	setLoginForm() {
		return(
			<Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
				<ModalHeader toggle={this.toggle}>Login</ModalHeader>

				<ModalBody>
					<form  onKeyPress={(e) => this.handleKeyPress(e)}>
						<input className="email" type="text" placeholder="Email" onChange={(e) => this.handleACChange(e)} />
						<i className="fas fa-user username_icon "></i>
					</form>
					<form  onKeyPress={(e) => this.handleKeyPress(e)}>
						<input className="password" type="password" placeholder="Password" onChange={(e) => this.handlePWChange(e)}/>								
						<i className="fas fa-lock password_icon"></i>	
					</form>
				</ModalBody>

				<ModalFooter>
					<div className="new_member">
						<span>Not a member?</span>
						<a href="register.html">Join Now!</a>
					</div>
					<Button color="primary" onClick={(e) => this.loginClick(e)}>Login</Button>
				</ModalFooter>
			</Modal>
		);
	}

// {' '}
// 					<Button color="secondary" onClick={this.toggle}>Forget Password</Button>
	setRegisterForm() {
		return(
			<Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
				<ModalHeader toggle={this.toggle}>Create Account</ModalHeader>

				<ModalBody>
					<form  onKeyPress={(e) => this.handleKeyPress(e)}>
						<input className="email" type="text" placeholder="Email" onChange={(e) => this.handleACChange(e)} />
						<i className="fas fa-user username_icon "></i>
					</form>
					<form  onKeyPress={(e) => this.handleKeyPress(e)}>
						<input className="password" type="password" placeholder="Password" onChange={(e) => this.handlePWChange(e)}/>								
						<i className="fas fa-lock password_icon"></i>	
					</form>
				</ModalBody>

				<ModalFooter>
					<Button color="primary" onClick={(e) => this.registerClick(e)}>Create</Button>
				</ModalFooter>
			</Modal>
		);
	}


	render() {
		return(
			<div>
				{this.setLoginOutButton()}
				{this.setLoginForm()}
				<button className="like_list_button" type="button">
					<i className="fas fa-heart "></i>
				</button>
			</div>
		)
	}
}

export default User;
