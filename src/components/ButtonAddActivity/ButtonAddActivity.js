import React from 'react';
import { Button, Text, Icon } from 'native-base';

const ButtonAddActivity = ({ handleClick, buttonText, withIcons, ...rest }) => (
	<Button
		style={{
			marginHorizontal: 20,
			marginVertical: 10,
		}}
		iconLeft
		{...rest}
		block
		onPress={handleClick}
	>
		{withIcons && <Icon name="ios-add-circle-outline" />}
		<Text style={{ color: '#fff' }}>{buttonText}</Text>
	</Button>
);

export default ButtonAddActivity;
