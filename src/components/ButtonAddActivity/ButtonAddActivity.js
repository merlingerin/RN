import React from 'react';
import { Button, Text, Icon, Spinner } from 'native-base';

class ButtonAddActivity extends React.Component {
	state = {
		isLoading: false,
	};
	_handlePress = () => {
		this.setState({ isLoading: true });
		setTimeout(() => {
			this.props.handleClick();
			this.setState({ isLoading: false });
		}, 0);
	};
	render() {
		const { handleClick, buttonText, withIcons, ...rest } = this.props;

		return (
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
				disabled={this.state.isLoading}
				{...rest}
				block
				onPress={this.state.isLoading ? null : this._handlePress}
			>
				{this.state.isLoading ? (
					<Spinner />
				) : (
					<React.Fragment>
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
					</React.Fragment>
				)}
			</Button>
		);
	}
}

export default ButtonAddActivity;
