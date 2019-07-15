import React from 'react';
import { NavLink } from 'react-router-dom';

class Likelistbutton extends React.Component {
	constructor(props) {
		super(props);

		this.getCookie = this.getCookie.bind(this);
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
			return(
				<NavLink to="/likelist">
					<button className="like_list_button" type="button">
						<i className="fas fa-heart "></i>
					</button>
				</NavLink>
			)
		} else {
			return(
				<button className="like_list_button d-none d-print-block" type="button">
					<i className="fas fa-heart "></i>
				</button>	
			)
		}
	}
}

export default Likelistbutton;
