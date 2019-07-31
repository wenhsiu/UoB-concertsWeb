import React from 'react';
import './concerts.css';
import Likebutton from '../like/Likebutton';

class ConcertList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			filtered: [],
			keyword: '',
			date: []
		}
		this.filterByKeyword = this.filterByKeyword.bind(this);
		this.filterByDate = this.filterByDate.bind(this);
		this.getAllDates = this.getAllDates.bind(this);
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
		// this.filterByKeyword();
	}

	componentDidUpdate(prevProps) {
		// if(prevProps.keyword !== this.props.keyword) {
		// 	this.filterByKeyword();
		// }
		if(prevProps.date !== this.props.date) {
			this.filterByDate();
		}
	}

	filterByKeyword() {
		let currentList = [];
		let newList = [];

		// console.log(this.props.keyword);

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

	filterByDate() {
		let currentList = [];
		let newList = [];
		let start = this.props.date.from;
		let end = this.props.date.to;
		let targetDates = this.getAllDates(start, end);
		console.log(targetDates);

		if (start !== "" || end !== "") {
			currentList = this.props.concert;
			newList = currentList.filter(concert => {
				// const filter = targetDates;
				// for (const date of targetDates){
					// console.log(date);
					// return concert.date.includes(date);
				// }
				// return concert.date.includes();

				return targetDates.every(date => {
					return concert.date.includes(date);
				});
			});

		} else {
			newList = this.props.concert;
		}
		this.setState({
			filtered: newList
		});
	}

	getAllDates(start, end) {
		let dateArray = [];
		let current = start;

		while(current <= end) {
			dateArray.push(new Date(current).toISOString().split("T")[0].replace(/-/g, "/"));
			current.setDate(current.getDate() + 1);
		}

		return dateArray
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
