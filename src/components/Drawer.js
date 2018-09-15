import React, { Component } from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';
import { View, Title } from '@shoutem/ui';
import { NavigationActions } from 'react-navigation';

class SideMenu extends Component {
	render() {
		return (
			<View style={{ paddingTop: 100 }}>
				<ScrollView>
					<View>
						<TouchableOpacity onPress={() => this.props.navigation.navigate('AboutScreen')}>
							<Text>AboutScreen</Text>
						</TouchableOpacity>
					</View>
					<View>
						<TouchableOpacity>
							<Text>Section 1</Text>
						</TouchableOpacity>
					</View>
					<View>
						<TouchableOpacity>
							<Text>Section 1</Text>
						</TouchableOpacity>
					</View>
					<View>
						<TouchableOpacity>
							<Text>Section 1</Text>
						</TouchableOpacity>
					</View>
					<View>
						<TouchableOpacity>
							<Text>Section 1</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>
			</View>
		);
	}
}

export default SideMenu;
