import React from 'react';
import { Icon } from 'react-native-elements';
import { withNavigation } from 'react-navigation';

const DrawerToggle = props => {
	// _handlePress = () => navigation.toggleDrawer();

	_handlePress = () => console.log('props', props);

	return <Icon name={'menu'} color={'#fff'} onPress={_handlePress} />;
};

export default DrawerToggle;
