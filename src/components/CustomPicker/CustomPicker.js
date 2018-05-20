import React, { Component } from 'react';
import { Picker } from 'native-base';
import _ from 'lodash';
import { Icon } from 'react-native-elements';

const categorys = [
	{
		label: 'Спорт, Здоровье',
		key: 0,
	},
	{
		label: 'Финансы',
		key: 1,
	},
	{
		label: 'Карьера, развитие',
		key: 2,
	},
	{
		label: 'Окружение',
		key: 3,
	},
	{
		label: 'Самовыражение',
		key: 4,
	},
	{
		label: 'Семья',
		key: 5,
	},
];

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

const CustomPicker = ({ selected, onValueChange, type }) => {
	switch (type) {
		case 'categorys':
			return (
				<Picker
					mode="dropdown"
					iosHeader="Категория цели"
					iosIcon={<Icon name="keyboard-arrow-down" />}
					style={{
						width: undefined,
						borderWidth: 0,
						borderColor: '#000',
					}}
					selectedValue={selected}
					onValueChange={onValueChange}
				>
					{_.map(categorys, category => (
						<Picker.Item
							key={category.key}
							label={category.label}
							value={category.key}
						/>
					))}
				</Picker>
			);
		case 'reminder':
			return (
				<Picker
					mode="dropdown"
					iosHeader="Повторять активность"
					iosIcon={<Icon name="keyboard-arrow-down" />}
					style={{
						width: undefined,
						borderWidth: 0,
						borderColor: '#000',
					}}
					selectedValue={selected}
					onValueChange={onValueChange}
				>
					{_.map(reminder, rem => (
						<Picker.Item
							key={rem.key}
							label={rem.label}
							value={rem.key}
						/>
					))}
				</Picker>
			);
	}
};

export default CustomPicker;
