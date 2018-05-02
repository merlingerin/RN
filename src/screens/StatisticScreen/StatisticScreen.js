import React from 'react';
import { NavigationBar, ImageBackground, Title } from '@shoutem/ui';

export default class StatisticScreen extends React.Component {
	static navigationOptions = {
		title: 'Статис',
		header: null,
	};

	render() {
		return (
			<ImageBackground
				source={{
					uri:
						'https://shoutem.github.io/img/ui-toolkit/examples/image-3.png',
				}}
				style={{ width: 375, height: 70 }}
			>
				<NavigationBar
					styleName="clear"
					centerComponent={<Title>TITLE</Title>}
				/>
			</ImageBackground>
		);
	}
}
