import React from 'react';
import './concerts.css';
import Likebutton from '../like/Likebutton';

class ConcertList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			filtered: [],
		}
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
		this.setState({
			filtered: this.props.concert
		});
		console.log(this.props.concert);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			filtered: nextProps.concert
		});
	}

	handleChange(e) {
        // Variable to hold the original version of the list
    	let currentList = [];
        // Variable to hold the filtered list before putting into state
    	let newList = [];

        // If the search bar isn't empty
    	if (e.target.value !== "") {
            // Assign the original list to currentList
			currentList = this.props.concert;

            // Use .filter() to determine which items should be displayed
            // based on the search terms
			newList = currentList.filter(concert => {
				const filter = e.target.value;
                // check to see if the current list item includes the search term
                // If it does, it will be added to newList. Using lowercase eliminates
                // issues with capitalization in search terms and search content
				return concert.title.includes(filter);
			});

		} else {
            // If the search bar is empty, set newList to original task list
			newList = this.props.concert;
		}
        // Set the filtered state based on what our rules added to newList
		this.setState({
			filtered: newList
		});
	}

	render() {
		return(
			<div>
			<input className="search_area form-control mr-sm-2" type="search" placeholder="search concerts" onChange={this.handleChange}/>
			<div>{this.state.filtered.map((element) => {
				return(
					<div className="row concert-info" key = {element.id}>
						<img src={"concerts_images/" + element.img} className="concert_img col-5" alt={element.title}/>
						<div className="col-7 text-left">
							<h5>{element.title}</h5>
							<p>Date: {element.date}</p>
							<p>{element.description}</p>
							<div className="text-right">
								<Likebutton id={element.id} />
								<input className="concert_link" type="button" value="Info & Ticket" onClick={() => this.props.navigate(element.url)}/>
							</div>
						</div>
					</div>
				)
			})}</div>
			</div>
		)
	}

}
export default ConcertList;
