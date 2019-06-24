import React from 'react';
import { Calendar } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

class Datepicker extends React.Component {
	state = {
		dates: null
	}

	handleSelect(date){
        console.log(date); // native Date object
    }

	onSelect = dates => this.setState({dates})

	render() {
		return(
			<Calendar
                date={new Date()}
                onChange={this.handleSelect}
            />
		)
	}
}

export default Datepicker;