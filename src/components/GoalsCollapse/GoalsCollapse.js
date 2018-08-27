import React from 'react';
import _ from 'lodash';
import { FlatList } from 'react-native';
import { Card, CardItem } from 'native-base';
import {
	Title,
	Text,
	Tile,
	TouchableOpacity,
	Image,
	Row,
	Subtitle,
	View,
	ImageBackground,
} from '@shoutem/ui';
import { Icon } from 'react-native-elements';
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
				onPress={() => {
					if (goal.defaultGoal) {
						return this.props.navigation.navigate('GoalForm', {
							goal: goal,
						});
					}
					return this.props.navigation.navigate('ActivityScreen', {
						goal: goal,
					});
				}}
			>
				<Tile
					styleName="small clear"
					style={{
						shadowColor: 'rgb(135, 0, 202)',
						shadowOpacity: 0.3,
						shadowRadius: 20,
						shadowOffset: { width: 0, height: 5 },
					}}
				>
					<Image
						styleName="small"
						style={{
							alignSelf: 'center',
							borderRadius: 7,
							// overflow: 'hidden',
							shadowColor: 'rgb(135, 0, 202)',
							shadowOpacity: 0.2,
							shadowRadius: 20,
							shadowOffset: { width: 5, height: 5 },
						}}
						source={{
							uri:
								goal.image.indexOf('http') > -1
									? goal.image
									: `data:image/jpeg;base64,${goal.image}`,
						}}
					/>
					<View styleName="content">
						<Subtitle
							style={{
								textAlign: 'center',
								fontFamily: 'M-Regular',
								fontSize: 12,
							}}
							numberOfLines={3}
						>
							{goal.goalTitle && goal.goalTitle.toUpperCase()}
						</Subtitle>
					</View>
				</Tile>
			</TouchableOpacity>
		);

		const renderRow = (category, active = false) => {
			const categoryGoals = _.filter(this.props.goals, goal => {
				return +goal.goalCategory.categoryId === +category.categoryId;
			});

			return (
				<Row
					key={category.categoryId}
					style={{
						paddingTop: 0,
						paddingBottom: 0,
						paddingLeft: 0,
						shadowColor: '#8700c1',
						shadowRadius: 10,
						borderRadius: 9,
					}}
				>
					<ImageBackground
						style={{
							width: 90,
							height: 75,
							marginRight: 5,
						}}
						source={category.image.file}
					>
						<Tile styleName="clear fill-parent">
							<Image
								styleName="small h-center v-center"
								source={category.icon}
							/>
						</Tile>
					</ImageBackground>
					<Subtitle
						style={{
							alignSelf: 'center',
							flex: 1,
							fontFamily: 'MA-Regular',
						}}
						styleName="top"
					>
						{category.categoryTitle}
					</Subtitle>
					<Text
						style={{
							justifyContent: 'flex-end',
							flex: 0,
							paddingRight: 15,
							fontFamily: 'M-Regular',
						}}
					>
						{categoryGoals && _.values(categoryGoals).length}
					</Text>
					<Icon
						name={
							active
								? 'ios-arrow-dropdown-circle'
								: 'ios-arrow-dropup-circle'
						}
						type="ionicon"
						color={'#e2e8f3'}
					/>
				</Row>
			);
		};

		return (
			<React.Fragment>
				{_.map(this.props.categorys, item => (
					<Card
						key={item.categoryId}
						style={{
							shadowColor: '#8700c1',
							shadowRadius: 5,
							borderRadius: 7,
							borderColor: 'transparent',
							overflow: 'hidden',
						}}
					>
						<CardItem
							button
							style={{
								paddingRight: 0,
								paddingLeft: 0,
								paddingTop: 0,
								paddingBottom: 0,
							}}
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
							<CardItem
								style={{
									paddingLeft: 0,
									paddingTop: 0,
									paddingRight: 0,
									paddingBottom: 0,
								}}
							>
								<FlatList
									style={{
										paddingRight: 5,
										paddingLeft: 5,
										paddingTop: 25,
										paddingBottom: 25,
										backgroundColor: 'rgb(247, 250, 255)',
									}}
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
