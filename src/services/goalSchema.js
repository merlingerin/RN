const users = {
	[userId]: {
		profile: {
			avatar: 'string',
			email: 'string',
			name: 'string',
		},
		goals: {
			[id]: {
				activityRepeat: {
					days: [0, 1, 2, 3, 4, 5, 6],
					id: 1,
					remider: true,
					time: {
						[timeId]: 'string',
					},
					title: 'string',
				},
				deadline: new Date(),
				goalCategory: {
					categoryId: 2,
					categoryTitle: 'Финансы',
					color: '#F38181',
				},
				goalTitle: 'Заработать 1 000$',
				id: 'string',
				image: 'string',
				timestamp: new Date(),
			},
		},
	},
};
