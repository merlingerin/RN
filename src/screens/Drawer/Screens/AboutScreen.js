import React from 'react';
import { Button, Linking } from 'react-native';
import { Screen, View, Title } from '@shoutem/ui';
import Header from '../../../components/CustomHeader/CustomHeader';

class AboutScreen extends React.Component {
	static navigationOptions = {
		title: 'Информация',
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
					// 	text: 'Информация о приложении',
					// 	style: { color: '#fff' },
					// }}
					label="Информация о приложении"
				/>
				<View styleName="vertical h-center" style={{ paddingTop: 20 }}>
					<Title>Информация о приложении</Title>
					<Title>e-mail: </Title>
					<Button
						style={{ backgroundColor: '#8300ca', fontFamily: 'M-Regular', borderWidth: 0 }}
						onPress={() => Linking.openURL('mailto:mobile4profi@gmail.com')}
						title="mobile4profi@gmail.com"
					/>
				</View>
			</Screen>
		);
	}
}

export default AboutScreen;
