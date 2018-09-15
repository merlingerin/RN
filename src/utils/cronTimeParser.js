import _ from 'lodash';

export // CRON
// ============================================================
// ============================================================
const cronTimeParser = activityRepeat => {
	if (!activityRepeat || _.isEmpty(activityRepeat)) return null;

	let cronConfigModel = {
		minutes: '*',
		hours: '*',
		dayOfMonth: '*',
		month: '*',
		weekDays: '*',
	};

	const getTimes = times => {
		if (!times || _.isEmpty(times)) return ['* *'];

		// const cronMinutes = _.map(times, item => {
		// 	const minutes = parseInt(item.split(':')[1]);
		// 	return minutes;
		// });

		// const cronHours = _.map(times, item => {
		// 	const hours = parseInt(item.split(':')[0]);
		// 	return hours;
		// });

		// const checkOnUniq = arr => {
		// 	return _.uniq(arr);
		// };

		// checkOnlength = (cronMinutes = [], cronHours = []) => {

		// 	const longestArr = cronMinutes.length > cronHours.length ? minutes : hours

		// 	return _.map(longestArr, (item))
		// }

		var parsedArr = times.map(item => {
			return item.split(':')[1] + ' ' + item.split(':')[0];
		});
		return parsedArr;
	};

	const getDayOfMonth = days => {
		if (!days || _.isEmpty(days))
			return {
				dayOfMonth: '*',
			};

		const dayOfMonth = _.map(days, day => day.dayNumber);
		return dayOfMonth.join(',');
	};

	const getDaysOfWeek = weekDays => {
		if (!weekDays || _.isEmpty(weekDays))
			return {
				weekDays: '*',
			};

		const weekDaysSchema = [1, 2, 3, 4, 5, 6, 0];

		const dayOfWeeks = _.map(weekDays, value => weekDaysSchema[value]);
		return dayOfWeeks.join(',');
	};

	const cronScheduleConstructor = (times = '* *', dayOfmonth = '*', month = '*', dayOfweek = '*') => {
		return `${times} ${dayOfmonth} ${month} ${dayOfweek}`;
	};

	//Non repeat
	if (activityRepeat.id === 0) {
		return null;
	}

	//Every Day
	if (activityRepeat.id === 1) {
		const times = getTimes(activityRepeat.time);
		return _.map(times, item => cronScheduleConstructor(item));
	}

	//Every even days
	if (activityRepeat.id === 2) {
		const times = getTimes(activityRepeat.time);
		return _.map(times, item => cronScheduleConstructor(item, '2-30/2', undefined, undefined));
	}

	//Every odd days
	if (activityRepeat.id === 3) {
		const times = getTimes(activityRepeat.time);
		return _.map(times, item => cronScheduleConstructor(item, '1-31/2', undefined, undefined));
	}

	// Every week
	if (activityRepeat.id === 4) {
		const times = getTimes(activityRepeat.time);
		const daysOfWeek = getDaysOfWeek(activityRepeat.weekDays);

		return _.map(times, item => cronScheduleConstructor(item, undefined, undefined, daysOfWeek));
	}

	// Every Month
	if (activityRepeat.id === 5) {
		const times = getTimes(activityRepeat.time);
		const dayOfMonth = getDayOfMonth(activityRepeat.monthDays);
		return _.map(times, item => cronScheduleConstructor(item, dayOfMonth, undefined, undefined));
	}
};
