import React from 'react';
import { Button, Text, Icon } from 'native-base';

const ButtonAddActivity = ({ handleClick, buttonText, withIcons, ...rest }) => (
	<Button
		style={{
			marginHorizontal: 20,
			marginVertical: 10,
			// width: '100%',
			marginBottom: 10,
			backgroundColor: '#8700ca',
			shadowColor: '#8700ca',
			shadowRadius: 15,
		}}
		iconLeft
		{...rest}
		block
		onPress={handleClick}
	>
		{withIcons && <Icon name="ios-add" />}
		<Text
			style={{
				color: '#fff',
				fontFamily: 'M-Regular',
				fontSize: 12,
			}}
		>
			{buttonText}
		</Text>
	</Button>
);

export default ButtonAddActivity;
