import React from 'react';
import { Item, Input, Icon } from 'native-base';

const GoalTitleInput = ({ value, onChangeText }) => (
	<Item
		style={{
			maxWidth: '80%',
			borderBottomColor: 'transparent',
		}}
		error={!value.length}
	>
		<Input
			style={{
				color: 'rgba(135, 0, 202, 1)',
				fontSize: 16,
				lineHeight: 16,
				textAlign: 'right',
				paddingRight: 17,
				fontFamily: 'MA-Regular',
			}}
			returnKeyType={'done'}
			placeholderTextColor="rgba(135, 0, 202, 1)"
			placeholderStyle={{ fontFamily: 'MA-Regular', fontSize: 16 }}
			value={value}
			onChangeText={onChangeText}
			placeholder={!value.length ? 'Новая цель' : ''}
			maxLength={40}
		/>
		{/*!value.length && <Icon name="close-circle" />*/}
	</Item>
);

export default GoalTitleInput;
