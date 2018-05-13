import React from 'react';
import { Item, Input } from 'native-base';
import { renderChildElements } from '@shoutem/ui';

const GoalTitleInput = ({ value, onChange }) => (
	<Item
		floatingLabel
		style={{
			borderBottomColor: '#000',
		}}
	>
		<Input style={{ color: '#000' }} value={value} onChange={onChange} />
	</Item>
);

export default GoalTitleInput;
