import moment from 'moment';

export const goals = {
	d001: {
		active: 0,
		defaultGoal: true,
		activityRepeat: {
			weekDays: [0, 1, 2, 3, 4, 5, 6],
			monthDays: {
				'2018-07-01': {
					id: 1,
					dayNumber: 1,
					dateString: '2018-07-01',
					time: ['6:30'],
					selected: true,
					selectedColor: 'blue',
				},
			},
			id: 1,
			reminder: false,
			time: ['8:00'],
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
		image: 'http://edinstvennaya.ua/pictures/article/12267_max.jpg',
		timestamp: new Date().getTime(),
		phisicalActivity: {},
	},
	d002: {
		active: 0,
		defaultGoal: true,
		activityRepeat: {
			weekDays: [3, 6],
			monthDays: {
				'2018-07-01': {
					id: 1,
					dayNumber: 1,
					dateString: '2018-07-01',
					time: ['6:30'],
					selected: true,
					selectedColor: 'blue',
				},
			},
			id: 4,
			reminder: true,
			time: ['8:00'],
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
		image:
			'https://www.yogabodylanguage.com/wp-content/uploads/2014/07/%D0%BC%D0%B0%D1%80%D0%B0%D1%84%D0%BE%D0%BD.jpg',
		timestamp: new Date().getTime(),
		phisicalActivity: {},
	},
	d003: {
		active: 0,
		defaultGoal: true,
		activityRepeat: {
			weekDays: [0, 1, 2, 3, 4, 5, 6],
			monthDays: {
				'2018-07-01': {
					id: 1,
					dayNumber: 1,
					dateString: '2018-07-01',
					time: ['6:30'],
					selected: true,
					selectedColor: 'blue',
				},
			},
			id: 1,
			reminder: false,
			time: ['8:00'],
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
		image:
			'http://sport-cool.ru/wp-content/uploads/2014/07/1352198399_beg1.jpg',
		timestamp: new Date().getTime(),
		phisicalActivity: {},
	},
	d004: {
		active: 0,
		defaultGoal: true,
		activityRepeat: {
			weekDays: [3, 6],
			monthDays: {
				'2018-07-01': {
					id: 1,
					dayNumber: 1,
					dateString: '2018-07-01',
					time: ['6:30'],
					selected: true,
					selectedColor: 'blue',
				},
			},
			id: 4,
			reminder: true,
			time: ['8:00'],
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
		image:
			'http://files.vm.ru/photo/vecherka/2012/06/doc65epcceu5iwt4zpfhrd_800_480.jpg',
		timestamp: new Date().getTime(),
		phisicalActivity: {},
	},
	d010: {
		active: 0,
		defaultGoal: true,
		activityRepeat: {
			weekDays: [],
			monthDays: {
				'2018-07-01': {
					id: 1,
					dayNumber: 1,
					dateString: '2018-07-01',
					time: ['6:30'],
					selected: true,
					selectedColor: 'blue',
				},
			},
			id: 5,
			reminder: true,
			time: ['8:00'],
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
		image:
			'https://kvartal.ua/wp-content/uploads/2012/03/kupit-dom-v-kharkove-300x225.jpg',
		timestamp: new Date().getTime(),
		phisicalActivity: {},
	},
	d011: {
		active: 0,
		defaultGoal: true,
		activityRepeat: {
			weekDays: [],
			monthDays: {
				'2018-07-01': {
					id: 1,
					dayNumber: 1,
					dateString: '2018-07-01',
					time: ['6:30'],
					selected: true,
					selectedColor: 'blue',
				},
			},
			id: 5,
			reminder: true,
			time: ['8:00'],
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
		image:
			'https://cryptodaily.co.uk/wp-content/uploads/2018/03/dollars-fan-row-300x225.jpg',
		timestamp: new Date().getTime(),
		phisicalActivity: {},
	},
	d011: {
		active: 0,
		defaultGoal: true,
		activityRepeat: {
			weekDays: [],
			monthDays: {
				'2018-07-01': {
					id: 1,
					dayNumber: 1,
					dateString: '2018-07-01',
					time: ['6:30'],
					selected: true,
					selectedColor: 'blue',
				},
			},
			id: 5,
			reminder: true,
			time: ['8:00'],
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
		image:
			'https://cryptodaily.co.uk/wp-content/uploads/2018/03/dollars-fan-row-300x225.jpg',
		timestamp: new Date().getTime(),
		phisicalActivity: {},
	},
	d012: {
		active: 0,
		defaultGoal: true,
		activityRepeat: {
			weekDays: [],
			monthDays: {
				'2018-07-01': {
					id: 1,
					dayNumber: 1,
					dateString: '2018-07-01',
					time: ['6:30'],
					selected: true,
					selectedColor: 'blue',
				},
			},
			id: 5,
			reminder: true,
			time: ['8:00'],
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
		image:
			'http://1sberbank.ru/wp-content/uploads/2016/02/oplata-kredita-1-e1468259419136.jpg',
		timestamp: new Date().getTime(),
		phisicalActivity: {},
	},
	d020: {
		active: 0,
		defaultGoal: true,
		activityRepeat: {
			weekDays: [],
			monthDays: {
				'2018-07-01': {
					id: 1,
					dayNumber: 1,
					dateString: '2018-07-01',
					time: ['6:30'],
					selected: true,
					selectedColor: 'blue',
				},
			},
			id: 5,
			reminder: false,
			time: ['8:00'],
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
		image:
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo_2ycjg57SZcGnwNBU0XT1UppeNh3wQYZn_bcALz86y9h_8uk',
		timestamp: new Date().getTime(),
		phisicalActivity: {},
	},
	d021: {
		active: 0,
		defaultGoal: true,
		activityRepeat: {
			weekDays: [2, 4],
			monthDays: {
				'2018-07-01': {
					id: 1,
					dayNumber: 1,
					dateString: '2018-07-01',
					time: ['6:30'],
					selected: true,
					selectedColor: 'blue',
				},
			},
			id: 4,
			reminder: true,
			time: ['8:00'],
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
		image:
			'http://школа-развития-шаги.рф/uploadedFiles/catalogimages/icons/350x350_cropped/373b7930-53e3-11e6-b080-51f126e668e5.jpg',
		timestamp: new Date().getTime(),
		phisicalActivity: {},
	},
	d022: {
		active: 0,
		defaultGoal: true,
		activityRepeat: {
			weekDays: [],
			monthDays: {
				'2018-07-01': {
					id: 1,
					dayNumber: 1,
					dateString: '2018-07-01',
					time: ['6:30'],
					selected: true,
					selectedColor: 'blue',
				},
			},
			id: 4,
			reminder: false,
			time: ['8:00'],
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
		image: 'http://poedinoktv.net/wp-content/uploads/2015/08/job.jpg',
		timestamp: new Date().getTime(),
		phisicalActivity: {},
	},
	d023: {
		active: 0,
		defaultGoal: true,
		activityRepeat: {
			weekDays: [1, 3, 5],
			monthDays: {
				'2018-07-01': {
					id: 1,
					dayNumber: 1,
					dateString: '2018-07-01',
					time: ['6:30'],
					selected: true,
					selectedColor: 'blue',
				},
			},
			id: 4,
			reminder: true,
			time: ['8:00'],
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
		image:
			'http://donntu.org/sites/default/files/other/vtoroe-vysshee-obrazovanie.jpg',
		timestamp: new Date().getTime(),
		phisicalActivity: {},
	},
	d030: {
		active: 0,
		defaultGoal: true,
		activityRepeat: {
			weekDays: [1, 3, 5],
			monthDays: {
				'2018-07-01': {
					id: 1,
					dayNumber: 1,
					dateString: '2018-07-01',
					time: ['6:30'],
					selected: true,
					selectedColor: 'blue',
				},
			},
			id: 4,
			reminder: false,
			time: ['8:00'],
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
		image: 'https://99px.ru/sstorage/53/2013/06/tmb_71957_4687.jpg',
		timestamp: new Date().getTime(),
		phisicalActivity: {},
	},
	d031: {
		active: 0,
		defaultGoal: true,
		activityRepeat: {
			weekDays: [1, 3, 5],
			monthDays: {
				'2018-07-01': {
					id: 1,
					dayNumber: 1,
					dateString: '2018-07-01',
					time: ['6:30'],
					selected: true,
					selectedColor: 'blue',
				},
			},
			id: 4,
			reminder: false,
			time: ['8:00'],
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
		image: 'https://francevent.com/wp-content/uploads/2016/11/amis4.jpg',
		timestamp: new Date().getTime(),
		phisicalActivity: {},
	},
	d032: {
		active: 0,
		defaultGoal: true,
		activityRepeat: {
			weekDays: [1, 3, 5],
			monthDays: {
				'2018-07-01': {
					id: 1,
					dayNumber: 1,
					dateString: '2018-07-01',
					time: ['6:30'],
					selected: true,
					selectedColor: 'blue',
				},
			},
			id: 4,
			reminder: false,
			time: ['8:00'],
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
		image: 'http://gorodlip.ru/media/imgs/vupusk.jpg',
		timestamp: new Date().getTime(),
		phisicalActivity: {},
	},
	d040: {
		active: 0,
		defaultGoal: true,
		activityRepeat: {
			weekDays: [1, 4],
			monthDays: {
				'2018-07-01': {
					id: 1,
					dayNumber: 1,
					dateString: '2018-07-01',
					time: ['6:30'],
					selected: true,
					selectedColor: 'blue',
				},
			},
			id: 4,
			reminder: true,
			time: ['8:00'],
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
		image:
			'http://photo.in.ck.ua/event/583c/1818/eef8/8833/dd00/4c82/nabir-grup-na-vodiyski-kursy-v-cherkaskiy.8.jpeg?1480333336',
		timestamp: new Date().getTime(),
		phisicalActivity: {},
	},
	d041: {
		active: 0,
		defaultGoal: true,
		activityRepeat: {
			weekDays: [2, 5],
			monthDays: {
				'2018-07-01': {
					id: 1,
					dayNumber: 1,
					dateString: '2018-07-01',
					time: ['6:30'],
					selected: true,
					selectedColor: 'blue',
				},
			},
			id: 4,
			reminder: true,
			time: ['8:00'],
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
		image: 'https://23.img.avito.st/640x480/4173609623.jpg',
		timestamp: new Date().getTime(),
		phisicalActivity: {},
	},
	d042: {
		active: 0,
		defaultGoal: true,
		activityRepeat: {
			weekDays: [0],
			monthDays: {
				'2018-07-01': {
					id: 1,
					dayNumber: 1,
					dateString: '2018-07-01',
					time: ['6:30'],
					selected: true,
					selectedColor: 'blue',
				},
			},
			id: 4,
			reminder: true,
			time: ['8:00'],
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
		image: 'http://new-original-style.com.ua/pages/article/landscape/5.JPG',
		timestamp: new Date().getTime(),
		phisicalActivity: {},
	},
	d043: {
		active: 0,
		defaultGoal: true,
		activityRepeat: {
			weekDays: [0],
			monthDays: {
				'2018-07-01': {
					id: 1,
					dayNumber: 1,
					dateString: '2018-07-01',
					time: ['6:30'],
					selected: true,
					selectedColor: 'blue',
				},
			},
			id: 4,
			reminder: false,
			time: ['8:00'],
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
		image:
			'http://vseprootpusk.ru/wordpress/wp-content/uploads/2011/09/europa_avto_tur.jpg',
		timestamp: new Date().getTime(),
		phisicalActivity: {},
	},
	d050: {
		active: 0,
		defaultGoal: true,
		activityRepeat: {
			weekDays: [0],
			monthDays: {
				'2018-07-01': {
					id: 1,
					dayNumber: 1,
					dateString: '2018-07-01',
					time: ['6:30'],
					selected: true,
					selectedColor: 'blue',
				},
			},
			id: 4,
			reminder: false,
			time: ['8:00'],
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
		image:
			'https://www.tourprom.ru/site_media/images/upload/2017/6/22/newsphoto/plyazhik.jpg',
		timestamp: new Date().getTime(),
		phisicalActivity: {},
	},
	d051: {
		active: 0,
		defaultGoal: true,
		activityRepeat: {
			weekDays: [6],
			monthDays: {
				'2018-07-01': {
					id: 1,
					dayNumber: 1,
					dateString: '2018-07-01',
					time: ['6:30'],
					selected: true,
					selectedColor: 'blue',
				},
			},
			id: 4,
			reminder: true,
			time: ['8:00'],
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
		image: 'https://i.ytimg.com/vi/WTS8QqZ1Iu8/hqdefault.jpg',
		timestamp: new Date().getTime(),
		phisicalActivity: {},
	},
	d052: {
		active: 0,
		defaultGoal: true,
		activityRepeat: {
			weekDays: [6],
			monthDays: {
				'2018-07-01': {
					id: 1,
					dayNumber: 1,
					dateString: '2018-07-01',
					time: ['6:30'],
					selected: true,
					selectedColor: 'blue',
				},
			},
			id: 4,
			reminder: false,
			time: ['8:00'],
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
		image:
			'https://upload.wikimedia.org/wikipedia/commons/5/58/Wiener_Staatsoper.jpg',
		timestamp: new Date().getTime(),
		phisicalActivity: {},
	},
};
