import React from 'react';
import { Header } from 'react-native-elements';
import Styles from '../../styles/styles';
import * as Animatable from 'react-native-animatable';
import { Avatar } from 'react-native-elements';
const slicer = text => {
	if (!text) {
		return '';
	}
	let slicedText = text.slice(0, 20);
	if (slicedText.length > 19) {
		return `${slicedText}...`;
	}
	return slicedText;
};

export default props => {
	return (
		<Header
			{...props}
			centerComponent={{
				text: slicer(props.label),
				style: Styles.header.centerComponent,
			}}
			backgroundColor={'#8700ca'}
			innerContainerStyles={{ zIndex: 999, backgroundColor: '#8700ca', justifyContent: 'space-between', alignItems: 'center' }}
			outerContainerStyles={{
				backgroundColor: '#8700ca',
				borderBottomColor: '#8700ca',
				borderBottomWidth: 0,
				zIndex: 999,
				paddingTop: 15,
				paddingBottom: 0,
				paddingVertical: 0,
			}}
		/>
	);
};
