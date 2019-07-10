import React from 'react';
import './header.css';
import './header-small.css';
import logo from './logo.svg';
import Login from '../user/Login';
import Register from '../user/Register';
// import User from '../user/User';


class Header extends React.Component {

	constructor(props) {
		super(props);

		this.navigateToLogin = this.navigateToLogin.bind(this);
		// this.uploadItem = this.uploadItem.bind(this);
		this.getCookie = this.getCookie.bind(this);
		this.deleteCookie = this.deleteCookie.bind(this);
		this.setLoginOutButton = this.setLoginOutButton.bind(this);

	}

	navigateToLogin() {
		window.location.href="/login.html";
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
			return <input className = "button_link" type="button" value="Login/Register" onClick={this.navigateToLogin} />
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

	render() {
		return(
			<div className="title row align-items-center border-bottom ">
				<div className="logo col-3 text-hide">
					<img src={logo} className="logo_img" alt="logo" />
					<a href="/homeItem.html" className="logo">Sharing within Bristol</a>
					}
				</div>
				<div className="search col-4">
					<form className="form-inline">
						<input className="search_area form-control mr-sm-2" type="search" placeholder="search concerts" />
						<button className="search_button btn my-2 my-sm-0" type="submit" value="search">
							<i className="fas fa-search"></i>
						</button>
					</form>
				</div>
				<div className="login_out col-4">
					<Register />
					<Login />
				</div>
			</div>
		)
	}
}

export default Header;
