import React from 'react';
import { Item, Input, Icon } from 'native-base';

const GoalTitleInput = ({ value, onChangeText }) => (
	<Item
		style={{
			borderBottomColor: '#000',
		}}
		error={!value.length}
	>
		<Input
			style={{ color: '#000' }}
			value={value}
			onChangeText={onChangeText}
			placeholder={!value.length ? 'Новая цель' : ''}
		/>
		{/*!value.length && <Icon name="close-circle" />*/}
	</Item>
);

export default GoalTitleInput;
