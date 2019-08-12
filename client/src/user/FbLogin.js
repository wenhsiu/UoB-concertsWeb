import React from 'react';
import axios from 'axios';

import './user.css';

class FbLogin extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoggedIn: null,
			userId: "",
			name: ""
		};

		this.checkLoginState = this.checkLoginState.bind(this);
		this.statusChangeCallback = this.statusChangeCallback.bind(this);
		this.fetchDataFacebook = this.fetchDataFacebook.bind(this);
		this.linkToDb = this.linkToDb.bind(this);
		this.getCookie = this.getCookie.bind(this);
		this.deleteCookie = this.deleteCookie.bind(this);
	}

	componentDidMount(){
		// Load the required SDK asynchronously for facebook, google and linkedin
		(function(d, s, id) {
			var js, fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) return;
			js = d.createElement(s); js.id = id;
			js.src = "//connect.facebook.net/en_US/sdk.js";
			fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));

		window.fbAsyncInit = function() {
			window.FB.init({
				appId: '365680734117064',
				autoLogAppEvents: true,
				// cookie: true,  // enable cookies to allow the server to access the session
				xfbml: true,  // parse social plugins on this page
				version: 'v4.0'
			});
		};
	}

	facebookLogin(e) {
		window.FB.login((res) => {
			this.statusChangeCallback(res);
		});
		
	}

	facebookLogout(e) {
		e.preventDefault();
		window.FB.logout();
		this.setState({
			isLoggedIn: false,
			userId: "",
			name: "",
		});
		this.deleteCookie();
	}
	
	checkLoginState() {
		window.FB.getLoginStatus((res) => {
			console.log("----------->")
			console.log(res)
			this.statusChangeCallback(res);
		});
	}
	
	statusChangeCallback(res) {
		console.log('statusChangeCallback');
		console.log(res);
		if (res.status === 'connected') {
			// Logged into your app and Facebook.
			this.fetchDataFacebook();
		} else if (res.status === 'not_authorized') {
			console.log('Import error', 'Authorize app to import data', 'error')
		} else {
			console.log('Import error', 'Error occured while importing data', 'error')
		}
	}
	
	fetchDataFacebook() {
		let self = this;
		window.FB.api('/me', (res) => {
			console.log('fetchDataFacebook');
			console.log(res);
			self.setState({
				isLoggedIn: true,
				userId: res.id,
				name: res.name,
			}, () => self.linkToDb());
		});
	}

	linkToDb() {
		console.log('test!!');
		axios.post('/UserLogin', this.state).then((res) => {
			console.log(res);
			console.log(res.status);
			if(res.status === 200) {
				//add username into cookie
				let d = new Date();
				d.setTime(d.getTime() + (24*60*60*1000));
				let expire = "expires=" + d.toUTCString();
				document.cookie = "username=" + res.data + ";" + expire + "path=/;";
				window.location.href="/";
			}
		}).catch((err) => { 
			console.log(err);
		});
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
		window.location.href="/";
	}

	render() {
		let fbContent;

		if(this.getCookie("username") !== "") {
			fbContent = (<span><span> welcome!</span> <input className = "button_link" type="button" value="Logout" onClick={(e) => {this.facebookLogout(e)}} /></span>)
		} else {
			fbContent = (<input className = "button_link" type="button" value="Fb Login"onClick={(e) => {this.facebookLogin(e)}} />)
		}
		return(<span> {fbContent} </span>)
	}
}

export default FbLogin;