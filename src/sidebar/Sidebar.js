import React from 'react';
import './sidebar.css';
import Sidebar from './Sidebar';


class Sidebar extends React.Component {
	render() {
		return(
			<nav class="sidebar-nav">
				<ul class="nav">
					<li class="nav-title">Nav Title</li>
					<li class="nav-item">
						<a class="nav-link" href="#">
							<i class="nav-icon cui-speedometer"></i> Nav item
						</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="#">
							<i class="nav-icon cui-speedometer"></i> With badge
							<span class="badge badge-primary">NEW</span>
						</a>
					</li>
				</ul>
				
			</nav>
		)
	}
}

export default Sidebar;