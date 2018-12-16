import moment from 'moment';

export const goals = {
	d001: {
		active: 0,
		defaultGoal: true,
		activityRepeat: {
			weekDays: [0, 1, 2, 3, 4, 5, 6],
			monthDays: {
				'2018-10-01': {
					id: 1,
					dayNumber: 1,
					dateString: '2018-10-01',
					time: ['6:30'],
					selected: true,
					selectedColor: 'rgba(135, 0, 202, .1)',
				},
			},
			id: 1,
			reminder: true,
			time: ['08:00'],
			title: 'каждый день',
		},
		deadline: moment()
			.add(1, 'month')
			.format(),
		goalCategory: {
			categoryId: 5,
			categoryTitle: 'Энергия / Отдых',
			color: '#F38181',
		},
		goalTitle: 'Сбросить лишний вес 3 кг',
		id: 'd001',
		image: require('../../assets/images/categorys/relax/relax1.jpg'),
		timestamp: new Date().getTime(),
		phisicalActivity: {},
	},
	d002: {
		active: 0,
		defaultGoal: true,
		activityRepeat: {
			weekDays: [3, 6],
			monthDays: {
				'2018-10-01': {
					id: 1,
					dayNumber: 1,
					dateString: '2018-10-01',
					time: ['6:30'],
					selected: true,
					selectedColor: 'rgba(135, 0, 202, .1)',
				},
			},
			id: 4,
			reminder: true,
			time: ['08:00'],
			title: 'каждую неделю',
		},
		deadline: moment()
			.add(1, 'month')
			.format(),
		goalCategory: {
			categoryId: 5,
			categoryTitle: 'Энергия / Отдых',
			color: '#F38181',
		},
		goalTitle: 'Принять участие в полумарафоне',
		id: 'd002',
		image: require('../../assets/images/categorys/relax/relax2.jpg'),
		timestamp: new Date().getTime(),
		phisicalActivity: {},
	},
	d003: {
		active: 0,
		defaultGoal: true,
		activityRepeat: {
			weekDays: [0, 1, 2, 3, 4, 5, 6],
			monthDays: {
				'2018-10-01': {
					id: 1,
					dayNumber: 1,
					dateString: '2018-10-01',
					time: ['6:30'],
					selected: true,
					selectedColor: 'rgba(135, 0, 202, .1)',
				},
			},
			id: 1,
			reminder: true,
			time: ['08:00'],
			title: 'каждый день',
		},
		deadline: moment()
			.add(1, 'month')
			.format(),
		goalCategory: {
			categoryId: 5,
			categoryTitle: 'Энергия / Отдых',
			color: '#F38181',
		},
		goalTitle: 'Сделать пробежку 10 км',
		id: 'd003',
		image: require('../../assets/images/categorys/relax/relax4.jpg'),
		timestamp: new Date().getTime(),
		phisicalActivity: {},
	},
	d004: {
		active: 0,
		defaultGoal: true,
		activityRepeat: {
			weekDays: [3, 6],
			monthDays: {
				'2018-10-01': {
					id: 1,
					dayNumber: 1,
					dateString: '2018-10-01',
					time: ['6:30'],
					selected: true,
					selectedColor: 'rgba(135, 0, 202, .1)',
				},
			},
			id: 4,
			reminder: true,
			time: ['08:00'],
			title: 'каждую неделю',
		},
		deadline: moment()
			.add(1, 'month')
			.format(),
		goalCategory: {
			categoryId: 5,
			categoryTitle: 'Энергия / Отдых',
			color: '#F38181',
		},
		goalTitle: 'Научиться играть в теннис',
		id: 'd004',
		image: require('../../assets/images/categorys/relax/relax3.jpg'),
		timestamp: new Date().getTime(),
		phisicalActivity: {},
	},
	d010: {
		active: 0,
		defaultGoal: true,
		activityRepeat: {
			weekDays: [],
			monthDays: {
				'2018-10-01': {
					id: 1,
					dayNumber: 1,
					dateString: '2018-10-01',
					time: ['6:30'],
					selected: true,
					selectedColor: 'rgba(135, 0, 202, .1)',
				},
			},
			id: 5,
			reminder: true,
			time: ['08:00'],
			title: 'каждый месяц',
		},
		deadline: moment()
			.add(1, 'month')
			.format(),
		goalCategory: {
			categoryId: 3,
			categoryTitle: 'Финансы',
			color: '#631447',
		},
		goalTitle: 'Купить дом',
		id: 'd010',
		image: require('../../assets/images/categorys/finance/finance2.jpg'),
		timestamp: new Date().getTime(),
		phisicalActivity: {},
	},
	d011: {
		active: 0,
		defaultGoal: true,
		activityRepeat: {
			weekDays: [],
			monthDays: {
				'2018-10-01': {
					id: 1,
					dayNumber: 1,
					dateString: '2018-10-01',
					time: ['6:30'],
					selected: true,
					selectedColor: 'rgba(135, 0, 202, .1)',
				},
			},
			id: 5,
			reminder: true,
			time: ['08:00'],
			title: 'каждый месяц',
		},
		deadline: moment()
			.add(1, 'month')
			.format(),
		goalCategory: {
			categoryId: 3,
			categoryTitle: 'Финансы',
			color: '#631447',
		},
		goalTitle: 'Отложить 50000 грн.',
		id: 'd011',
		image: require('../../assets/images/categorys/finance/finance1.jpg'),
		timestamp: new Date().getTime(),
		phisicalActivity: {},
	},
	d012: {
		active: 0,
		defaultGoal: true,
		activityRepeat: {
			weekDays: [],
			monthDays: {
				'2018-10-01': {
					id: 1,
					dayNumber: 1,
					dateString: '2018-10-01',
					time: ['6:30'],
					selected: true,
					selectedColor: 'rgba(135, 0, 202, .1)',
				},
			},
			id: 5,
			reminder: true,
			time: ['08:00'],
			title: 'каждый месяц',
		},
		deadline: moment()
			.add(1, 'month')
			.format(),
		goalCategory: {
			categoryId: 3,
			categoryTitle: 'Финансы',
			color: '#631447',
		},
		goalTitle: 'Оплатить досрочно кредит',
		id: 'd012',
		image: require('../../assets/images/categorys/finance/finance1.jpg'),
		timestamp: new Date().getTime(),
		phisicalActivity: {},
	},
	d020: {
		active: 0,
		defaultGoal: true,
		activityRepeat: {
			weekDays: [],
			monthDays: {
				'2018-10-01': {
					id: 1,
					dayNumber: 1,
					dateString: '2018-10-01',
					time: ['6:30'],
					selected: true,
					selectedColor: 'rgba(135, 0, 202, .1)',
				},
			},
			id: 5,
			reminder: true,
			time: ['08:00'],
			title: 'каждый месяц',
		},
		deadline: moment()
			.add(1, 'month')
			.format(),
		goalCategory: {
			categoryId: 1,
			categoryTitle: 'Карьера / Развитие',
			color: '#157447',
		},
		goalTitle: 'Создать собственный бизнес',
		id: 'd020',
		image: require('../../assets/images/categorys/carear/carear2.jpg'),
		timestamp: new Date().getTime(),
		phisicalActivity: {},
	},
	d021: {
		active: 0,
		defaultGoal: true,
		activityRepeat: {
			weekDays: [2, 4],
			monthDays: {
				'2018-10-01': {
					id: 1,
					dayNumber: 1,
					dateString: '2018-10-01',
					time: ['6:30'],
					selected: true,
					selectedColor: 'rgba(135, 0, 202, .1)',
				},
			},
			id: 4,
			reminder: true,
			time: ['08:00'],
			title: 'каждую неделю',
		},
		deadline: moment()
			.add(1, 'month')
			.format(),
		goalCategory: {
			categoryId: 1,
			categoryTitle: 'Карьера / Развитие',
			color: '#157447',
		},
		goalTitle: 'Выучить английский',
		id: 'd021',
		image: require('../../assets/images/categorys/carear/carear4.jpg'),
		timestamp: new Date().getTime(),
		phisicalActivity: {},
	},
	d022: {
		active: 0,
		defaultGoal: true,
		activityRepeat: {
			weekDays: [],
			monthDays: {
				'2018-10-01': {
					id: 1,
					dayNumber: 1,
					dateString: '2018-10-01',
					time: ['6:30'],
					selected: true,
					selectedColor: 'rgba(135, 0, 202, .1)',
				},
			},
			id: 4,
			reminder: true,
			time: ['08:00'],
			title: 'каждую неделю',
		},
		deadline: moment()
			.add(1, 'month')
			.format(),
		goalCategory: {
			categoryId: 1,
			categoryTitle: 'Карьера / Развитие',
			color: '#157447',
		},
		goalTitle: 'Устроиться на работу своей мечты',
		id: 'd022',
		image: require('../../assets/images/categorys/carear/carear1.jpg'),
		timestamp: new Date().getTime(),
		phisicalActivity: {},
	},
	d023: {
		active: 0,
		defaultGoal: true,
		activityRepeat: {
			weekDays: [1, 3, 5],
			monthDays: {
				'2018-10-01': {
					id: 1,
					dayNumber: 1,
					dateString: '2018-10-01',
					time: ['6:30'],
					selected: true,
					selectedColor: 'rgba(135, 0, 202, .1)',
				},
			},
			id: 4,
			reminder: true,
			time: ['08:00'],
			title: 'каждую неделю',
		},
		deadline: moment()
			.add(1, 'month')
			.format(),
		goalCategory: {
			categoryId: 1,
			categoryTitle: 'Карьера / Развитие',
			color: '#157447',
		},
		goalTitle: 'Получить второе высшее образование',
		id: 'd023',
		image: require('../../assets/images/categorys/carear/carear3.jpg'),
		timestamp: new Date().getTime(),
		phisicalActivity: {},
	},
	d030: {
		active: 0,
		defaultGoal: true,
		activityRepeat: {
			weekDays: [1, 3, 5],
			monthDays: {
				'2018-10-01': {
					id: 1,
					dayNumber: 1,
					dateString: '2018-10-01',
					time: ['6:30'],
					selected: true,
					selectedColor: 'rgba(135, 0, 202, .1)',
				},
			},
			id: 4,
			reminder: true,
			time: ['08:00'],
			title: 'каждую неделю',
		},
		deadline: moment()
			.add(1, 'month')
			.format(),
		goalCategory: {
			categoryId: 4,
			categoryTitle: 'Окружение / Друзья',
			color: '#EAFFD0',
		},
		goalTitle: 'Организовать музыкальную группу',
		id: 'd030',
		image: require('../../assets/images/categorys/friend/friend1.jpg'),
		timestamp: new Date().getTime(),
		phisicalActivity: {},
	},
	d031: {
		active: 0,
		defaultGoal: true,
		activityRepeat: {
			weekDays: [1, 3, 5],
			monthDays: {
				'2018-10-01': {
					id: 1,
					dayNumber: 1,
					dateString: '2018-10-01',
					time: ['6:30'],
					selected: true,
					selectedColor: 'rgba(135, 0, 202, .1)',
				},
			},
			id: 4,
			reminder: true,
			time: ['08:00'],
			title: 'каждую неделю',
		},
		deadline: moment()
			.add(1, 'month')
			.format(),
		goalCategory: {
			categoryId: 4,
			categoryTitle: 'Окружение / Друзья',
			color: '#EAFFD0',
		},
		goalTitle: 'Организовать совместное мероприятие для друзей',
		id: 'd031',
		image: require('../../assets/images/categorys/friend/friend2.jpg'),
		timestamp: new Date().getTime(),
		phisicalActivity: {},
	},
	d032: {
		active: 0,
		defaultGoal: true,
		activityRepeat: {
			weekDays: [1, 3, 5],
			monthDays: {
				'2018-10-01': {
					id: 1,
					dayNumber: 1,
					dateString: '2018-10-01',
					time: ['6:30'],
					selected: true,
					selectedColor: 'rgba(135, 0, 202, .1)',
				},
			},
			id: 4,
			reminder: true,
			time: ['08:00'],
			title: 'каждую неделю',
		},
		deadline: moment()
			.add(1, 'month')
			.format(),
		goalCategory: {
			categoryId: 4,
			categoryTitle: 'Окружение / Друзья',
			color: '#EAFFD0',
		},
		goalTitle: 'Организовать встречу выпускников',
		id: 'd032',
		image: require('../../assets/images/categorys/friend/friend3.jpg'),
		timestamp: new Date().getTime(),
		phisicalActivity: {},
	},
	d040: {
		active: 0,
		defaultGoal: true,
		activityRepeat: {
			weekDays: [1, 4],
			monthDays: {
				'2018-10-01': {
					id: 1,
					dayNumber: 1,
					dateString: '2018-10-01',
					time: ['6:30'],
					selected: true,
					selectedColor: 'rgba(135, 0, 202, .1)',
				},
			},
			id: 4,
			reminder: true,
			time: ['08:00'],
			title: 'каждую неделю',
		},
		deadline: moment()
			.add(1, 'month')
			.format(),
		goalCategory: {
			categoryId: 0,
			categoryTitle: 'Самореализация / Драйв',
			color: '#95E1D3',
		},
		goalTitle: 'Научиться управлять автомобилем',
		id: 'd040',
		image: require('../../assets/images/categorys/selfExpression/selfExpression1.jpg'),
		timestamp: new Date().getTime(),
		phisicalActivity: {},
	},
	d041: {
		active: 0,
		defaultGoal: true,
		activityRepeat: {
			weekDays: [2, 5],
			monthDays: {
				'2018-10-01': {
					id: 1,
					dayNumber: 1,
					dateString: '2018-10-01',
					time: ['6:30'],
					selected: true,
					selectedColor: 'rgba(135, 0, 202, .1)',
				},
			},
			id: 4,
			reminder: true,
			time: ['08:00'],
			title: 'каждую неделю',
		},
		deadline: moment()
			.add(1, 'month')
			.format(),
		goalCategory: {
			categoryId: 0,
			categoryTitle: 'Самореализация / Драйв',
			color: '#95E1D3',
		},
		goalTitle: 'Научиться играть на инструменте',
		id: 'd041',
		image: require('../../assets/images/categorys/selfExpression/selfExpression2.jpg'),
		timestamp: new Date().getTime(),
		phisicalActivity: {},
	},
	d042: {
		active: 0,
		defaultGoal: true,
		activityRepeat: {
			weekDays: [0],
			monthDays: {
				'2018-10-01': {
					id: 1,
					dayNumber: 1,
					dateString: '2018-10-01',
					time: ['6:30'],
					selected: true,
					selectedColor: 'rgba(135, 0, 202, .1)',
				},
			},
			id: 4,
			reminder: true,
			time: ['08:00'],
			title: 'каждую неделю',
		},
		deadline: moment()
			.add(1, 'month')
			.format(),
		goalCategory: {
			categoryId: 0,
			categoryTitle: 'Самореализация / Драйв',
			color: '#95E1D3',
		},
		goalTitle: 'Нарисовать картину акварельными красками',
		id: 'd042',
		image: require('../../assets/images/categorys/selfExpression/selfExpression3.jpg'),
		timestamp: new Date().getTime(),
		phisicalActivity: {},
	},
	d043: {
		active: 0,
		defaultGoal: true,
		activityRepeat: {
			weekDays: [0],
			monthDays: {
				'2018-10-01': {
					id: 1,
					dayNumber: 1,
					dateString: '2018-10-01',
					time: ['6:30'],
					selected: true,
					selectedColor: 'rgba(135, 0, 202, .1)',
				},
			},
			id: 4,
			reminder: true,
			time: ['08:00'],
			title: 'каждую неделю',
		},
		deadline: moment()
			.add(1, 'month')
			.format(),
		goalCategory: {
			categoryId: 0,
			categoryTitle: 'Самореализация / Драйв',
			color: '#95E1D3',
		},
		goalTitle: 'Посетить 10 стран Европы',
		id: 'd043',
		image: require('../../assets/images/categorys/selfExpression/selfExpression4.jpg'),
		timestamp: new Date().getTime(),
		phisicalActivity: {},
	},
	d050: {
		active: 0,
		defaultGoal: true,
		activityRepeat: {
			weekDays: [0],
			monthDays: {
				'2018-10-01': {
					id: 1,
					dayNumber: 1,
					dateString: '2018-10-01',
					time: ['6:30'],
					selected: true,
					selectedColor: 'rgba(135, 0, 202, .1)',
				},
			},
			id: 4,
			reminder: true,
			time: ['08:00'],
			title: 'каждую неделю',
		},
		deadline: moment()
			.add(1, 'month')
			.format(),
		goalCategory: {
			categoryId: 2,
			categoryTitle: 'Семья',
			color: '#FCE38A',
		},
		goalTitle: 'Поехать с семьей в Египет',
		id: 'd050',
		image: require('../../assets/images/categorys/family/family3.jpg'),
		timestamp: new Date().getTime(),
		phisicalActivity: {},
	},
	d051: {
		active: 0,
		defaultGoal: true,
		activityRepeat: {
			weekDays: [6],
			monthDays: {
				'2018-10-01': {
					id: 1,
					dayNumber: 1,
					dateString: '2018-10-01',
					time: ['6:30'],
					selected: true,
					selectedColor: 'rgba(135, 0, 202, .1)',
				},
			},
			id: 4,
			reminder: true,
			time: ['08:00'],
			title: 'каждую неделю',
		},
		deadline: moment()
			.add(1, 'month')
			.format(),
		goalCategory: {
			categoryId: 2,
			categoryTitle: 'Семья',
			color: '#FCE38A',
		},
		goalTitle: 'Нарисовать семейное дерево (узнавать историю своей семьи)',
		id: 'd051',
		image: require('../../assets/images/categorys/family/family1.png'),
		timestamp: new Date().getTime(),
		phisicalActivity: {},
	},
	d052: {
		active: 0,
		defaultGoal: true,
		activityRepeat: {
			weekDays: [6],
			monthDays: {
				'2018-10-01': {
					id: 1,
					dayNumber: 1,
					dateString: '2018-10-01',
					time: ['6:30'],
					selected: true,
					selectedColor: 'rgba(135, 0, 202, .1)',
				},
			},
			id: 4,
			reminder: true,
			time: ['08:00'],
			title: 'каждую неделю',
		},
		deadline: moment()
			.add(1, 'month')
			.format(),
		goalCategory: {
			categoryId: 2,
			categoryTitle: 'Семья',
			color: '#FCE38A',
		},
		goalTitle: 'Организовать посещение родителями Венской оперы',
		id: 'd052',
		image: require('../../assets/images/categorys/family/family2.jpg'),
		timestamp: new Date().getTime(),
		phisicalActivity: {},
	},
};
