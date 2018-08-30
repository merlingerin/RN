import { RRule, RRuleSet, rrulestr } from 'rrule';
import _ from 'lodash';

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
	const weekDaysSchema = [
		RRule.MO,
		RRule.TU,
		RRule.WE,
		RRule.TH,
		RRule.FR,
		RRule.SA,
		RRule.SU,
	];
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
