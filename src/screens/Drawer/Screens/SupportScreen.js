import React from 'react';
import Header from '../../../components/CustomHeader/CustomHeader';
import { Screen, View, Title } from '@shoutem/ui';

class SupportScreen extends React.Component {
	static navigationOptions = {
		title: 'Центр справки и поддержки',
		header: null,
	};

	render() {
		return (
			<Screen styleName="paper">
				<Header
					leftComponent={{
						icon: 'navigate-before',
						color: '#fff',
						underlayColor: 'transparent',
						onPress: () => this.props.navigation.goBack(),
					}}
					// centerComponent={{
					// 	text: 'Центр справки и поддержки',
					// 	style: { color: '#fff' },
					// }}
					label="Центр справки и поддержки"
				/>
				<View styleName="vertical h-center" style={{ paddingTop: 20 }}>
					<Title>Центр справки и поддержки</Title>
				</View>
			</Screen>
		);
	}
}

export default SupportScreen;
