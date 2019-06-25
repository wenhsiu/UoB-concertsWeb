import React from 'react';
import './sidebar.css';
import Datepicker from './Datepicker';


class Sidebar extends React.Component {
	render() {
		return(
			<nav className="sidebar-nav">
				<Datepicker />
			</nav>
		)
	}
}

export default Sidebar;