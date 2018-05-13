import React, { Component } from 'react';
import { StyleSheet, Platform } from 'react-native';
// import {  } from 'react-native-elements';
import { Button, Segment, Text } from 'native-base';

const styles = {
	container: {
		inline: {
			display: 'flex',
			flex: 1,
			flexDirection: 'row',
			justifyContent: 'space-between',
		},
	},
};

const weekDays = [
	{
		id: '0',
		title: 'Пт',
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

export default class WeekDaysSegment extends Component {
	state = {
		notification: true,
		goalTitle: 'Чиканить мяч 20 минут',
		pickedWeekDays: [1, 5],
	};

	toggleWeekButton = id => {
		let { pickedWeekDays } = this.state;
		console.log(_.some(this.state.pickedWeekDays, item => id === item));
		if (_.some(this.state.pickedWeekDays, item => id === item)) {
			this.setState({
				pickedWeekDays: _.filter(
					this.state.pickedWeekDays,
					item => item !== id,
				),
			});
		} else {
			this.setState({
				pickedWeekDays: [...this.state.pickedWeekDays, id],
			});
		}
	};

	render() {
		return (
			<Segment
				style={{
					...styles.container.inline,
					backgroundColor: '#fff',
				}}
			>
				{Platform.OS === 'ios'
					? weekDays.map(day => (
							<Button
								key={day.id}
								onPress={() => this.toggleWeekButton(+day.id)}
								active={
									_.some(
										this.state.pickedWeekDays,
										item => +day.id === item,
									)
										? true
										: false
								}
								style={{
									// borderWidth: 1,
									// borderColor: '#000',
									paddingLeft: 0,
									paddingRight: 0,
								}}
								first
								last
							>
								<Text
									style={{
										paddingLeft: 8,
										paddingRight: 8,
									}}
								>
									{day.title}
								</Text>
							</Button>
					  ))
					: weekDays.map(day => (
							<Button
								key={day.id}
								onPress={() => this.toggleWeekButton(+day.id)}
								style={{
									borderWidth: 1,
									borderColor: '#000',
									paddingLeft: 0,
									paddingRight: 0,
									backgroundColor: _.some(
										this.state.pickedWeekDays,
										item => +day.id === item,
									)
										? '#4051b3'
										: 'transparent',
								}}
								first
								last
							>
								<Text
									style={{
										paddingLeft: 8,
										paddingRight: 8,
										color: _.some(
											this.state.pickedWeekDays,
											item => +day.id === item,
										)
											? '#fff'
											: '#4051b3',
									}}
								>
									{day.title}
								</Text>
							</Button>
					  ))}
			</Segment>
		);
	}
}
