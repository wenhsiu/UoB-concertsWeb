import React from 'react';
import { NavLink } from 'react-router-dom';
import './header.css';
import './header-small.css';
import logo from './logo.svg';
import Login from '../user/Login';
import Likelistbutton from './Likelistbutton';
import Register from '../user/Register';


class Header extends React.Component {

	render() {
		return(
			<div className="title row align-items-center border-bottom ">
				<div className="logo col-3 text-hide">
					<NavLink to="/">
						<img src={logo} className="logo_img" alt="logo" />
					</NavLink>
				</div>
				<div className="search col-4">
					<form className="form-inline">
						<input className="search_area form-control mr-sm-2" type="search" data-bind="textInput: filter, valueUpdate: 'afterkeydown'" placeholder="search concerts" />
						<button className="search_button btn my-2 my-sm-0" type="submit" value="search">
							<i className="fas fa-search"></i>
						</button>
					</form>
				</div>
				<div className="login_out col-4">
					<Register />
					<Login />
					<Likelistbutton />
				</div>
			</div>
		)
	}
}

export default Header;
