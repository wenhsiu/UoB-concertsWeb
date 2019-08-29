import React from 'react';
import { NavLink } from 'react-router-dom';
import './header.css';
import './header-small.css';
import logo from './logo.svg';
import FbLogin from '../user/FbLogin';
import Likelistbutton from './Likelistbutton';


class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			keyword: '',
			isLoggedIn: null
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	handleChange(e) {
		// if (e.target.value !== "") { 
			this.setState({ keyword: e.target.value });
			this.props.keyword(e.target.value);
		// }
	}
// not work
	handleClick(e) {
		 // e.preventDefault();
		// this.setState({ keyword: e.target.value }, () => console.log(this.state.keyword));
		console.log(this.state.keyword);
		this.props.keyword(this.state.keyword);

	}

	reload(e) {
		e.preventDefault();
		window.location.reload()
	}

	handleIsLoggedIn(value) {
		this.setState({isLoggedIn: value});
	}

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
						<input className="search_area form-control mr-sm-2" type="search" data-bind="textInput: filter, valueUpdate: 'afterkeydown'" placeholder="search concerts" onChange={(e) => this.handleChange(e)}/>
						{/*按鈕會重新整理 網址會變成 localhost:3000/?#/ -> what the hell?? */}
						{<button className="search_button btn my-2 my-sm-0" type="submit" value="search" onClick={this.handleClick}>
							<i className="fas fa-search"></i>
						</button>}
					</form>
				</div>
				<div className="login_out col-4">
					<FbLogin />
					<Likelistbutton />
				</div>
			</div>
		)
	}
}

export default Header;
