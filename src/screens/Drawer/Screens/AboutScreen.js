import React from 'react';
import { Button, Linking } from 'react-native';
import { Header } from 'react-native-elements';
import { Screen, View, Title } from '@shoutem/ui';

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
					centerComponent={{
						text: 'Информация о приложении',
						style: { color: '#fff' },
					}}
				/>
				<View styleName="vertical h-center" style={{ paddingTop: 20 }}>
					<Title>Информация о приложении</Title>
					<Title>
						e-mail:{' '}
						<Button
							onPress={() =>
								Linking.openURL('mailto:mobile4profi@gmail.com')
							}
							title="mobile4profi@gmail.com"
						/>
					</Title>
				</View>
			</Screen>
		);
	}
}

export default AboutScreen;
