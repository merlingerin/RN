import React, { Component } from 'react';
import { Picker } from 'native-base';
import _ from 'lodash';
import { Icon, Header } from 'react-native-elements';

/** Style*/
import Styles from '../../styles/styles';

const categorys = [
	{
		label: 'Самореализация / Драйв',
		key: 0,
	},
	{
		label: 'Карьера / Развитие',
		key: 1,
	},
	{
		label: 'Семья',
		key: 2,
	},
	{
		label: 'Финансы',
		key: 3,
	},
	{
		label: 'Окружение / Друзья',
		key: 4,
	},
	{
		label: 'Энергия / Отдых',
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
					renderHeader={backAction => (
						<Header
							leftComponent={{
								icon: 'navigate-before',
								color: '#fff',
								underlayColor: 'transparent',
								onPress: backAction,
							}}
							centerComponent={{
								text: 'Категория цели',
								style: Styles.header.centerComponent,
							}}
							backgroundColor={'#8700ca'}
						/>
					)}
					mode="dropdown"
					style={{
						width: 200,
						borderWidth: 0,
						borderColor: '#000',
						color: '#8700ca',
					}}
					itemTextStyle={{
						fontFamily: 'MA-Regular',
						fontSize: 16,
						color: '#8700ca',
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
					renderHeader={backAction => (
						<Header
							leftComponent={{
								icon: 'navigate-before',
								color: '#fff',
								underlayColor: 'transparent',
								onPress: backAction,
							}}
							centerComponent={{
								text: 'Повторять',
								style: Styles.header.centerComponent,
							}}
							backgroundColor={'#8700ca'}
						/>
					)}
					mode="dropdown"
					style={{
						width: 200,
						// marginLeft: 'auto',
						borderWidth: 0,
						borderColor: '#000',
						color: '#8700ca',
					}}
					textStyle={{
						fontFamily: 'MA-Regular',
						fontSize: 16,
					}}
					// itemStyle={{
					// 	backgroundColor: 'rgba(135, 0, 202, .1)',
					// }}
					itemTextStyle={{
						fontFamily: 'MA-Regular',
						fontSize: 16,
						color: '#8700ca',
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
