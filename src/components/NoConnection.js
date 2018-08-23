import React from 'react';
import { View, Overlay, Heading } from '@shoutem/ui';
import * as Animatable from 'react-native-animatable';

export default class NoConnection extends React.Component {
	state = {
		loading: '',
	};

	componentDidMount() {
		this.renderLoading();
	}

	renderLoading = () => {
		setInterval(() => {
			if (this.state.loading.length > 2) {
				return this.setState({
					loading: '',
				});
			}
			return this.setState(prevState => ({
				loading: prevState.loading + '.',
			}));
		}, 500);
	};

	render() {
		return (
			<View
				styleName="fill-parent"
				style={{
					zIndex: 9999,
				}}
			>
				<Animatable.View
					style={{ flex: 1 }}
					animation="zoomIn"
					easing="ease-out"
				>
					<Overlay styleName="fill-parent">
						<Heading>No connection {this.state.loading}</Heading>
					</Overlay>
				</Animatable.View>
			</View>
		);
	}
}
