import React from 'react';
import './concerts.css';

class Concerts extends React.Component {

	render() {
		return(
			<div className="row concert-info">
				<img src="..." className="col-4" alt="..."/>
				<div className="col-8 text-left">
					<h5>Title</h5>
					<p>Date</p>
					<p>description</p>
					<div className="text-right">
						<input className = "button_link" type="button" value="Info & Ticket"/>
					</div>
				</div>
			</div>
		)
	}

}
export default Concerts;
