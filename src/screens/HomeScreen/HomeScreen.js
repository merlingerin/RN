import React from 'react';
import { Platform } from 'react-native';
import { Header } from 'react-native-elements';
import {
	TouchableOpacity,
	NavigationBar,
	ImageBackground,
	Title,
	Screen,
	Subtitle,
	Divider,
	ListView,
	GridRow,
	Card,
	Image,
	View,
	Caption,
	Button,
	Text,
	Icon,
} from '@shoutem/ui';
import AuthModal from '../../components/AuthModal/AuthModal';
import GoalsCard from '../../components/GoalsCard/GoalsCard';

export default class HomeScreen extends React.Component {
	static navigationOptions = {
		title: 'Карта',
		header: null,
	};

	constructor(props) {
		super(props);
		this.renderRow = this.renderRow.bind(this);
		this.state = {
			isModalVisible: false,
			restaurants: [
				{
					name: 'Карьера',
					image: {
						url:
							'https://geekbrains-uploads.s3.amazonaws.com/events/og_images/000/000/296/original/%D0%9A%D0%B0%D1%80%D1%8C%D0%B5%D1%80%D0%B0_%D0%B2%D0%B5%D0%B1-%D1%80%D0%B0%D0%B7%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D1%87%D0%B8%D0%BA%D0%B0_%D1%81_%D0%BD%D1%83%D0%BB%D1%8F_%D0%B4%D0%BE_%D1%82%D0%BE%D0%BF-%D0%B7%D0%B0%D1%80%D0%BF%D0%BB%D0%B0%D1%82%D1%8B.png',
					},
				},
				{
					name: 'Финансы',
					image: {
						url:
							'http://infoeuro.com.ua/wp-content/uploads/2016/10/3e4adb4dae96457de7f8df38312343c9.jpg',
					},
				},
				{
					name: 'Спорт',
					image: {
						url:
							'https://enjoyenglish-blog.com/wp-content/uploads/2014/06/%D0%BE-%D1%81%D0%BF%D0%BE%D1%80%D1%82%D0%B5-%D0%BD%D0%B0-%D0%B0%D0%BD%D0%B3%D0%BB%D0%B8%D0%B9%D1%81%D0%BA%D0%BE%D0%BC-1.jpg',
					},
				},
				{
					name: 'Семья',
					image: {
						url:
							'http://www.mirvboge.ru/wp-content/uploads/2017/05/mirvboge.ru_%D1%81%D0%B5%D0%BC%D1%8C%D1%8F.jpg',
					},
				},
				{
					name: 'Самовыражение',
					image: {
						url: 'http://www.fonstola.ru/large/201606/235913.jpg',
					},
				},
				{
					name: 'Окружение',
					image: {
						url:
							'https://insdrcdn.com/media/articles/d/2c/ace1ce2cd__430x224__q85_049957603500.jpg',
					},
				},
			],
		};
	}

	renderRow(rowData, sectionId, index) {
		const cellViews = rowData.map((restaurant, id) => {
			return (
				<TouchableOpacity
					onPress={this._navTo}
					key={id}
					styleName="flexible"
				>
					<Card styleName="flexible">
						<Image
							styleName="medium-wide"
							source={{ uri: restaurant.image.url }}
						/>
						<View styleName="content">
							<Subtitle styleName="h-center" numberOfLines={4}>
								{restaurant.name}
							</Subtitle>
						</View>
						<View styleName="horizontal v-center">
							<Button styleName="secondary">
								<Icon name="plus-button" />
								<Text>Поставить цель</Text>
							</Button>
						</View>
					</Card>
				</TouchableOpacity>
			);
		});

		return <GridRow columns={2}>{cellViews}</GridRow>;
	}

	_toggleModal = () => {
		console.log('STATE', this.state.isModalVisible);
		this.setState({ isModalVisible: !this.state.isModalVisible });
	};

	_turnOffModal = () => {
		this.setState({ isModalVisible: false });
	};

	_navTo = () => this.props.navigation.navigate('GoalsScreen');

	render() {
		const restaurants = this.state.restaurants;
		let isFirstArticle = true;
		const groupedData = GridRow.groupByRows(restaurants, 2, () => {
			return 1;
		});
		return (
			<Screen>
				<Header
					leftComponent={{ icon: 'menu', color: '#fff' }}
					centerComponent={{
						text: 'Goals',
						style: { color: '#fff' },
					}}
					rightComponent={{ icon: 'home', color: '#fff' }}
				/>
				<View
					style={{
						position: 'absolute',
						top: '42%',
						width: 150,
						height: 150,
						backgroundColor: 'transparent',
						alignItems: 'center',
						justifyContent: 'center',
						alignSelf: 'center',
						zIndex: 10,
					}}
				>
					<TouchableOpacity
						onPress={this._toggleModal}
						style={{
							borderWidth: 1,
							borderColor: 'rgba(0,0,0,0.2)',
							alignItems: 'center',
							justifyContent: 'center',
							margin: 'auto',
							width: 150,
							height: 150,
							backgroundColor: '#fff',
							borderRadius: 100,
							zIndex: 10,
						}}
					>
						<Icon style={{ fontSize: 35 }} name="user-profile" />
						<Text>Авторизироватся</Text>
					</TouchableOpacity>
				</View>

				<ListView data={groupedData} renderRow={this.renderRow} />
				<AuthModal
					isVisible={this.state.isModalVisible}
					turnOffModal={this._turnOffModal}
				/>
			</Screen>
		);
	}
}
