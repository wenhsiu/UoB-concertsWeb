import React from 'react';
import './sidebar.css';
import Datepicker from './Datepicker';


class Sidebar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			date: []
		}
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(value) {
		this.setState({ date: value});
		this.props.date(value);
		// }
	}

	render() {
		return(
			<nav className="sidebar-nav">
				<Datepicker date={this.handleChange} />
			</nav>
		)
	}
}

export default Sidebar;