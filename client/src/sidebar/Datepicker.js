import React from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import './datepicker.css';

// problem not solve
class Datepicker extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			from: null,
			to: null,
			enteredTo: null			
		}
		
		this.handleDayClick = this.handleDayClick.bind(this);
		this.handleDayMouseEnter = this.handleDayMouseEnter.bind(this);
		this.handleResetClick = this.handleResetClick.bind(this);
		console.log("constructor: " + this.state);
	}

	isSelectingFirstDay(from, to, day) {
		const isBeforeFirstDay = from && DateUtils.isDayBefore(day, from);
		const isRangeSelected = from && to;
		console.log("from: "+ from);
		console.log("to: "+ to);
		console.log("before: "+ isBeforeFirstDay);
		console.log("range: " + isRangeSelected);
		return !from || isBeforeFirstDay || isRangeSelected;
	}
	
	handleDayClick(day) {
		const { from, to } = this.state;
		if (from && to && day >= from && day <= to) {
			this.setState({
				from: null,
				to: null,
				enteredTo: null
			});
			// return;
		}
		if (this.isSelectingFirstDay(from, to, day)) {
			this.setState({
				from: day,
				// to: null,
				// enteredTo: null,
			}, () => {
				console.log(this.state);
				console.log("first day: " + this.state);});
		} else {
			this.setState({
				to: day,
				enteredTo: day,
			}, () => {
				this.props.date(this.state);
				// console.log(this.state.from);
				// console.log(this.state.to);
				// console.log(this.state.enteredTo);
				console.log(this.state);
				console.log("end date: " + this.state);
			});
			
		}
	}

	handleDayMouseEnter(day) {
		const { from, to } = this.state;
		if (!this.isSelectingFirstDay(from, to, day)) {
			this.setState({
				enteredTo: day,
			});
		}
	}

	handleResetClick() {
		this.setState({
			from: null,
			to: null,
			enteredTo: null
		}, () => { this.props.date(this.state);});
	}

	render(){
		const today = new Date();
		const { from, to, enteredTo } = this.state;
		const modifiers = { start: from, end: enteredTo };
		// const disabledDays = { before: this.state.from };
		const selectedDays = [from, { from, to: enteredTo }];
		
		return (
			<div>
				<DayPicker
					className="Range"
					numberOfMonths={1}
					fromMonth={from}
					selectedDays={selectedDays}
					disabledDays={ {before: today }}
					modifiers={modifiers}
					onDayClick={this.handleDayClick}
					// onDayMouseEnter={this.handleDayMouseEnter}
				/>
				<div>
					{!from && !to && 'Please select the date you are looking for.'}
					{from && !to && 'Please select the date you are looking for.'}
					{from && to &&
					`Selected from ${from.toLocaleDateString()} to
					${to.toLocaleDateString()}`}{' '}
					{from && to && (
						<button className="link" onClick={this.handleResetClick}>Reset</button>
					)}
				</div>
			</div>
		)
	}
}

export default Datepicker;