import React, { Component } from 'react';
import _ from 'lodash';
import { Calendar } from 'react-native-calendars';

class MonthCalendar extends Component {
	render() {
		return (
			<Calendar
				// // Initially visible month. Default = Date()
				current={'2018-10-01'}
				markedDates={this.props.markedDays || {}}
				onDayPress={day => {
					this.props.toggleMonthDays({
						id: day.day,
						dayNumber: day.day,
						dateString: day.dateString,
						time: ['6:30'],
						selected: true,
						selectedColor: 'rgba(135, 0, 202, .1)',
					});
				}}
				disableMonthChange={true}
				// Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
				monthFormat={'yyyy MM'}
				// Hide month navigation arrows. Default = false
				hideArrows={true}
				// Do not show days of other months in month page. Default = false
				hideExtraDays={true}
				// If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
				firstDay={1}
				// Hide day names. Default = false
				hideDayNames={true}
				style={{
					// margin: 'auto',
					marginLeft: 'auto',
					marginRight: 'auto',
				}}
				theme={{
					monthTextColor: 'transparent',
					// calendarBackground: 'rgba(207, 217, 237, .3)',
					textSectionTitleColor: 'transparent',
					selectedDayBackgroundColor: 'rgba(135, 0, 202, .1)',
					dayTextColor: '#000',
					selectedDayTextColor: '#8700ca',
				}}
			/>
		);
	}
}

export default MonthCalendar;
