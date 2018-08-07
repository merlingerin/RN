import React, { Component } from 'react';
import { StyleSheet, Platform } from 'react-native';
import _ from 'lodash';
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

export default class WeekDaysSegment extends Component {
	state = {
		pickedWeekDays: [1, 5],
	};

	toggleWeekButton = id => {
		let { pickedWeekDays } = this.state;
		if (_.some(pickedWeekDays, item => id === item)) {
			this.setState({
				pickedWeekDays: _.filter(pickedWeekDays, item => item !== id),
			});
		} else {
			this.setState({
				pickedWeekDays: [...pickedWeekDays, id],
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
					? _.map(weekDays, day => (
							<Button
								key={day.id}
								onPress={() =>
									this.props.toggleWeekButton(+day.id)
								}
								active={
									_.some(
										this.props.pickedWeekDays,
										item => +day.id === item,
									)
										? true
										: false
								}
								style={{
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
					: _.map(weekDays, day => (
							<Button
								key={day.id}
								onPress={() =>
									this.props.toggleWeekButton(+day.id)
								}
								style={{
									borderWidth: 1,
									borderColor: '#000',
									paddingLeft: 0,
									paddingRight: 0,
									backgroundColor: _.some(
										this.props.pickedWeekDays,
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
											this.props.pickedWeekDays,
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
