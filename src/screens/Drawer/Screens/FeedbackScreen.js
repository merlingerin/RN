import React from 'react';
import { Header } from 'react-native-elements';
import { Screen, View, Title } from '@shoutem/ui';

class FeedbackScreen extends React.Component {
	static navigationOptions = {
		title: 'Оставить отзыв',
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
						text: 'Оставить отзыв',
						style: { color: '#fff' },
					}}
				/>
				<View styleName="vertical h-center" style={{ paddingTop: 20 }}>
					<Title>Оставить отзыв</Title>
				</View>
			</Screen>
		);
	}
}

export default FeedbackScreen;
