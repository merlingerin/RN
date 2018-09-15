import { RRule, RRuleSet, rrulestr } from 'rrule';
import _ from 'lodash';

// CRON
// ============================================================
// ============================================================
export const cronTimeParser = activityRepeat => {
	if (!activityRepeat || _.isEmpty(activityRepeat)) return null;

	let cronConfigModel = {
		seconds: '*',
		minutes: '*',
		hours: '*',
		dayOfMonth: '*',
		month: '*',
		weekDays: '*',
	};

	const getTimes = times => {
		if (!times || _.isEmpty(times))
			return {
				seconds: '*',
				minutes: '*',
				hours: '*',
			};

		const cronMinutes = _.map(times, item => {
			const minutes = parseInt(item.split(':')[1]);
			return minutes;
		});

		const cronHours = _.map(times, item => {
			const hours = parseInt(item.split(':')[0]);
			return hours;
		});

		return {
			seconds: '0',
			minutes: cronMinutes ? cronMinutes.join(',') : '0',
			hours: cronHours ? cronHours.join(',') : '0',
		};
	};

	const getDayOfMonth = days => {
		if (!days || _.isEmpty(days))
			return {
				dayOfMonth: '*',
			};

		const dayOfMonth = _.map(days, day => day.dayNumber);
		return { dayOfMonth: dayOfMonth.join(',') };
	};

	const getDaysOfWeek = weekDays => {
		if (!weekDays || _.isEmpty(weekDays))
			return {
				weekDays: '*',
			};

		const dayOfWeeks = _.map(weekDays, value => value);
		return { weekDays: dayOfWeeks.join(',') };
	};

	//Every Day
	if (activityRepeat.id === 1) {
		const times = getTimes(activityRepeat.time);

		return (cronConfig = {
			...cronConfigModel,
			...times,
		});
	}

	// Every week
	if (activityRepeat.id === 4) {
		const times = getTimes(activityRepeat.time);
		const daysOfWeek = getDaysOfWeek(activityRepeat.weekDays);
		return (cronConfig = {
			...cronConfigModel,
			...times,
			...daysOfWeek,
		});
	}

	// Every Month
	if (activityRepeat.id === 5) {
		const times = getTimes(activityRepeat.time);
		const dayOfMonth = getDayOfMonth(activityRepeat.monthDays);
		return (cronConfig = {
			...cronConfigModel,
			...times,
			...dayOfMonth,
		});
	}
};

// RRULE
// ============================================================
// ============================================================
const freqParser = freqID => {
	switch (freqID) {
		case 0:
			return null;
		case 1:
			return 'DAILY';
		case 2:
			return 'DAILY';
		case 3:
			return 'DAILY';
		case 4:
			return 'WEEKLY';
		case 5:
			return 'MONTHLY';
		default:
			return null;
	}
};

export const byweekdayParser = weekDaysID => {
	// const weekDaysSchema = [
	// 	RRule.MO,
	// 	RRule.TU,
	// 	RRule.WE,
	// 	RRule.TH,
	// 	RRule.FR,
	// 	RRule.SA,
	// 	RRule.SU,
	// ];
	const weekDaysSchema = [1, 2, 3, 4, 5, 6, 0];
	if (!weekDaysID || _.isEmpty(weekDaysID)) return RRule.MO;
	let weekDays = _.map(weekDaysID, day => {
		return weekDaysSchema[day];
	});

	return weekDays;
};

export const bysecondsParser = times => {
	if (!times || _.isEmpty(times)) return [-21540];

	const getTime = (hours = 8, minutes = 0) => {
		return hours * 3600 + minutes * 60 - 46749;
	};

	return _.map(times, item => {
		let hours = parseInt(item.split(':')[0]);
		let minutes = parseInt(item.split(':')[1]);
		return getTime(hours, minutes);
	});
};

export const bymonthdayParser = days => {
	if (!days || _.isEmpty(days)) return [1];

	return _.map(days, day => day.dayNumber);
};

const recurrenceCreator = goal => {
	const { activityRepeat, createdDate, deadline } = goal;
	/**
	// DEFAULT OBJECT CREATOR
			let activityObject = {
				freq: freqParser(activityRepeat.id),
				dtstart: new Date(createdDate),
				until: new Date(deadline),
				byweekday: byweekdayParser(activityRepeat.weekDays),
				byseconds: bysecondsParser(activityRepeat.time),
				bymonthday: bymonthdayParser(activityRepeat.monthDays),
			};
	// ============================================================
	*/
	if (!activityRepeat) return undefined;
	let rruleConfig = null;

	if (activityRepeat.id === 1) {
		rruleConfig = {
			freq: RRule[freqParser(activityRepeat.id)],
			dtstart: new Date(createdDate),
			until: new Date(deadline),
			bysecond: bysecondsParser(activityRepeat.time),
		};
	}

	if (activityRepeat.id === 4) {
		rruleConfig = {
			freq: RRule[freqParser(activityRepeat.id)],
			dtstart: new Date(createdDate),
			until: new Date(deadline),
			byweekday: byweekdayParser(activityRepeat.weekDays),
			bysecond: bysecondsParser(activityRepeat.time),
		};
	}
	if (activityRepeat.id === 5) {
		rruleConfig = {
			freq: RRule[freqParser(activityRepeat.id)],
			dtstart: new Date(createdDate),
			until: new Date(deadline),
			bymonthday: bymonthdayParser(activityRepeat.monthDays),
			bysecond: bysecondsParser(activityRepeat.time),
		};
	}
	if (!rruleConfig) {
		return null;
	}

	let rruleSet = new RRule(rruleConfig);
	return rruleSet.toString();
};

export default recurrenceCreator;
