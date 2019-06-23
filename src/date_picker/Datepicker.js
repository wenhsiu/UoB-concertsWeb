import React from 'react';
// import DatePicker from "react-datepicker";
import DateRangePicker from 'react-daterange-picker'
import 'react-daterange-picker/dist/css/react-calendar.css'
// import * as moment from "moment";

class Datepicker extends React.Component {
	state = {
		dates: null
	}

	onSelect = dates => this.setState({dates})

	render() {
		return(
			<div>
				<DateRangePicker
					onSelect={this.onSelect}
					value={this.state.dates}
				/>
			</div>
		)
	}
}

export default Datepicker;