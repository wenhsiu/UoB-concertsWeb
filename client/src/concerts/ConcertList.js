import React from 'react';
import './concerts.css';
import Likebutton from '../like/Likebutton';

class ConcertList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			filtered: [],
			keyword: ''
		}
		this.filtData = this.filtData.bind(this);
	}

	componentDidMount() {
		this.setState({
			filtered: this.props.concert
		});
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			filtered: nextProps.concert
		});
		// this.filtData();
	}

	componentDidUpdate(prevProps) {
		if(prevProps.keyword !== this.props.keyword) {
			this.filtData();
		}
	}

	filtData() {
		let currentList = [];
		let newList = [];

		if (this.props.keyword !== "") {
			currentList = this.props.concert;
			newList = currentList.filter(concert => {
				const lower = concert.title.toLowerCase();
				const filter = this.props.keyword.toLowerCase();
				// const filter = this.props.keyword;
				// return concert.title.includes(filter);
				return lower.includes(filter);
			});

		} else {
			newList = this.props.concert;
		}
		this.setState({
			filtered: newList
		});
	}

	render() {
		return(
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
			// </div>
		)
	}

}
export default ConcertList;
