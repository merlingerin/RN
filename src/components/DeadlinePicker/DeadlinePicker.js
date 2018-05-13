import React from 'react';
import DatePicker from 'react-native-datepicker';

const DeadlinePicker = ({ date, onDateChange }) => (
	<DatePicker
		style={{
			width: 150,
			borderRadius: 5,
			borderWidth: 0,
			borderColor: '#000',
		}}
		showIcon={false}
		date={date}
		mode="date"
		placeholder="select date"
		format="YYYY-MM-DD"
		minDate="2018-04-01"
		confirmBtnText="Confirm"
		cancelBtnText="Cancel"
		customStyles={{
			dateInput: {
				borderWidth: 0,
				borderColor: 'transparent',
			},
		}}
		onDateChange={onDateChange}
	/>
);

export default DeadlinePicker;
