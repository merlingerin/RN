import React from 'react';
import { Header } from 'react-native-elements';
import Styles from '../../styles/styles';

export default props => {
	return (
		<Header
			{...props}
			centerComponent={{
				text: props.label,
				style: Styles.header.centerComponent,
			}}
			backgroundColor={'#8700ca'}
		/>
	);
};
