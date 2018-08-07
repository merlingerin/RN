import _ from 'lodash';

const reminder = [
	{
		label: 'Не повторять',
		key: 0,
	},
	{
		label: 'Каждый день',
		key: 1,
	},
	{
		label: 'По четным',
		key: 2,
	},
	{
		label: 'По нечетным',
		key: 3,
	},
	{
		label: 'Каждую неделю',
		key: 4,
	},
	{
		label: 'Каждый месяц',
		key: 5,
	},
];

export const activityRepeatTypeParser = id => {
	return {
		id: reminder[id].key,
		title: reminder[id].label.toLowerCase(),
	};
};

const weekDays = [
	{
		id: '0',
		title: 'Пн',
	},
	{
		id: '1',
		title: 'Вт',
	},
	{
		id: '2',
		title: 'Ср',
	},
	{
		id: '3',
		title: 'Чт',
	},
	{
		id: '4',
		title: 'Пт',
	},
	{
		id: '5',
		title: 'Сб',
	},
	{
		id: '6',
		title: 'Вс',
	},
];

export const activityRepeatDaysParser = id => {
	return weekDays[id];
};
