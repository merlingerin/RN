import React from 'react';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';

const DeadlinePicker = ({ date, onDateChange }) => (
	<DatePicker
		style={{
			width: 150,
			borderRadius: 5,
			borderWidth: 0,
			borderColor: '#000',
		}}
		showIcon={false}
		date={moment(date).format('DD-MM-YYYY')}
		mode="date"
		placeholder="select date"
		format="DD-MM-YYYY"
		minDate={moment().format('DD-MM-YYYY')}
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
