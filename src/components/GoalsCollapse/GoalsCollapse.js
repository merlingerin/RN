import React from 'react';
import _ from 'lodash';
import { FlatList, Text } from 'react-native';
import {
	Header,
	Container,
	// Title,
	Content,
	Tabs,
	Left,
	Right,
	Body,
	// Text,
	Card,
	Button,
	H1,
	CardItem,
} from 'native-base';
import {
	ImageBackground,
	Title,
	Tile,
	TouchableOpacity,
	Image,
	Row,
	Subtitle,
	ListView,
	View,
	Icon,
} from '@shoutem/ui';
import { List, ListItem } from 'react-native-elements';
import { WebBrowser } from 'expo';
import Collapsible from 'react-native-collapsible';

export default class GoalsCollapse extends React.Component {
	state = {
		activeIndex: _.isNumber(this.props.activeCategoryID)
			? this.props.activeCategoryID
			: null,
	};

	componentWillReceiveProps(nextProps) {
		if (+nextProps.activeCategoryID !== +this.state.activeIndex) {
			this.setState({
				activeIndex: nextProps.activeCategoryID,
			});
		}
	}

	_handleClick = idx => {
		if (this.state.activeIndex === idx) {
			this.setState({ activeIndex: null });
		} else {
			this.setState({ activeIndex: idx });
		}
	};

	render() {
		const CollapseItem = ({ goal }) => (
			<TouchableOpacity
				style={{ marginLeft: 5, marginRight: 5 }}
				onPress={() =>
					this.props.navigation.navigate('ActivityScreen', {
						goal: goal,
					})
				}
			>
				<Tile styleName="small">
					<Image styleName="medium" source={{ uri: goal.image }} />
					<View styleName="content">
						<Subtitle
							style={{ textAlign: 'center' }}
							numberOfLines={3}
						>
							{goal.goalTitle}
						</Subtitle>
					</View>
				</Tile>
			</TouchableOpacity>
		);

		const renderRow = (category, active = false) => (
			<Row
				key={category.categoryId}
				style={{ paddingTop: 0, paddingBottom: 0, paddingLeft: 5 }}
			>
				<Image
					styleName="small rounded-corners"
					source={category.image.file}
				/>
				<Title style={{ alignSelf: 'center' }} styleName="top">
					{category.categoryTitle}
				</Title>
				<Icon
					styleName="disclosure"
					name={active ? 'down-arrow' : 'up-arrow'}
				/>
			</Row>
		);

		return (
			<React.Fragment>
				{_.map(this.props.categorys, item => (
					<Card key={item.categoryId}>
						<CardItem
							button
							onPress={() =>
								this.props.isAuth
									? this._handleClick(item.categoryId)
									: false
							}
						>
							{renderRow(
								item,
								this.state.activeIndex !== item.categoryId,
							)}
						</CardItem>
						<Collapsible
							collapsed={
								this.state.activeIndex !== item.categoryId
							}
						>
							<CardItem>
								<FlatList
									data={_.filter(
										this.props.goals,
										goal =>
											+goal.goalCategory.categoryId ===
											+item.categoryId,
									)}
									keyExtractor={(item, idx) => item.id}
									renderItem={({ item }) => (
										<CollapseItem goal={item} />
									)}
									horizontal
								/>
							</CardItem>
						</Collapsible>
					</Card>
				))}
			</React.Fragment>
		);
	}
}
