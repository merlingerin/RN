import React, { Component } from 'react';
import DatePicker from 'react-native-datepicker';
import { Icon } from 'native-base';

export default class TimePicker extends Component {
	constructor(props) {
		super(props);
		this.state = { time: this.props.time };
	}

	render() {
		console.log('time', this.state.time);
		return (
			<DatePicker
				style={{ width: 200, borderWidth: 0 }}
				date={this.state.time}
				mode="time"
				placeholder="select date"
				confirmBtnText="Confirm"
				cancelBtnText="Cancel"
				showIcon={false}
				customStyles={{
					dateIcon: {
						position: 'absolute',
						left: 0,
						top: 4,
						marginLeft: 0,
					},
					dateInput: {
						marginLeft: 36,
						borderWidth: 0,
					},
					// ... You can check the source to find the other keys.
				}}
				onDateChange={time => {
					this.setState({ time: time });
				}}
			/>
		);
	}
}
