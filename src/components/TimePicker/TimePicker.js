import React, { Component } from 'react';
import DatePicker from 'react-native-datepicker';
import { Icon } from 'native-base';

export default class TimePicker extends Component {
	constructor(props) {
		super(props);
		this.state = { time: this.props.time };
	}

	render() {
		return (
			<DatePicker
				style={{ width: '100%', borderWidth: 0 }}
				date={this.props.time}
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
					placeholderText: {
						color: '#8700ca',
						fontFamily: 'MA-Regular',
						fontSize: 14,
					},
					dateText: {
						color: '#8700ca',
						fontFamily: 'MA-Regular',
						fontSize: 14,
					},
					dateInput: {
						marginLeft: 'auto',
						// marginRight: 25,
						borderWidth: 0,
					},
				}}
				onDateChange={time =>
					this.props.handleChange(time, this.props.idx)
				}
			/>
		);
	}
}
