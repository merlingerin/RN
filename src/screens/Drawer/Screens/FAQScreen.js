import React from 'react';
import { Screen, View, Title, Subtitle, Text } from '@shoutem/ui';
import { ScrollView } from 'react-native';
import Header from '../../../components/CustomHeader/CustomHeader';
import Styles from '../../../styles/styles';

class FAQScreen extends React.Component {
	static navigationOptions = {
		title: 'Справка',
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
					// 	text: 'Ответы на часто задаваемые вопросы',
					// 	style: { color: '#fff' },
					// }}
					label="Справка"
				/>
				<ScrollView style={{ backgroundColor: '#edf3ff', paddingBottom: 150 }}>
					<View style={{ paddingTop: 20, paddingHorizontal: 15, paddingBottom: 70 }}>
						<Title
							style={{
								...Styles.defaultTitlePrime,
								fontSize: 22,
								color: '#000',
								paddingBottom: 20,
							}}
							styleName="vertical h-center"
						>
							{`Ответы на часто задаваемые вопросы`.toUpperCase()}
						</Title>
						<View styleName="horizontal v-center h-start" style={{ marginBottom: 5, marginTop: 15 }}>
							<View styleName="horizontal v-center h-center" style={{ marginRight: 7, width: 20, height: 20, borderRadius: 10, backgroundColor: '#8700ca' }}>
								<Subtitle style={{ color: '#fff', fontSize: 12 }}>01</Subtitle>
							</View>
							<Subtitle style={Styles.defaultTitlePrime}>{`Как начать работать с приложением?`.toUpperCase()}</Subtitle>
						</View>
						<Text style={Styles.defaultTextPrime}>
							Чтобы начать работать с приложением, необходимо авторизоваться в системе. Это вам позволит создавать и сохранять ваши цели и активности по ним на различных девайсах вашего
							аккаунта. Выполните тап по кнопке – аватарке, расположенной в правом верхнем углу начального экрана. Либо же выберите любую интересующую вас категорию на начальном экране.
							Откроется экран входа в систему. Авторизуйтесь любым удобным для вас способом: {'\n'}
							1) Войдите с помощью своего Google аккаунта.
							{'\n'}
							2) Зарегистрируйтесь путем введения адреса электронной почты и пароля. После авторизации в приложении вы можете установить цели.{' '}
						</Text>

						<View styleName="horizontal v-center h-start" style={{ marginBottom: 5, marginTop: 15 }}>
							<View styleName="horizontal v-center h-center" style={{ marginRight: 7, width: 20, height: 20, borderRadius: 10, backgroundColor: '#8700ca' }}>
								<Subtitle style={{ color: '#fff', fontSize: 12 }}>02</Subtitle>
							</View>
							<Subtitle style={Styles.defaultTitlePrime}>{`Как я могу поставить свою цель?`.toUpperCase()}</Subtitle>
						</View>
						<Text style={Styles.defaultTextPrime}>
							Выполните тап (однократное непродолжительное нажатие) по картинке выбранной категории на начальном экране. В новом окне выполните тап по кнопке Добавить цель, откроется
							экран добавления/редактирования цели. Заполните все необходимые поля цели: - название цели, - срок достижения цели, - частота активности по цели, - время напоминания, -
							выберите изображения цели из библиотеки приложения или из галереи устройства. Важно выбрать изображение, которое мотивировало бы вас на выполнение именно этой цели.
							Сохраните вашу цель.{' '}
						</Text>
						<View styleName="horizontal v-center h-start" style={{ marginBottom: 5, marginTop: 15 }}>
							<View styleName="horizontal v-center h-center" style={{ marginRight: 7, width: 20, height: 20, borderRadius: 10, backgroundColor: '#8700ca' }}>
								<Subtitle style={{ color: '#fff', fontSize: 12 }}>03</Subtitle>
							</View>
							<Subtitle style={Styles.defaultTitlePrime}>{`Что такое шаблоны целей?`.toUpperCase()}</Subtitle>
						</View>
						<Text style={Styles.defaultTextPrime}>
							{' '}
							Шаблоны целей упрощают процесс постановки целей. Они созданы на основе наиболее распространенные целей пользователей. Шаблоны содержат название цели, категорию цели,
							частоту активностей по цели и картинку цели. Для того, чтобы выбранный вами шаблон превратился в вашу цель, необходимо установить свой срок достижения цели и время для
							напоминаний про активности. По желанию вы можете изменить картинку цели.{' '}
						</Text>
						<View styleName="horizontal v-center h-start" style={{ marginBottom: 5, marginTop: 15 }}>
							<View styleName="horizontal v-center h-center" style={{ marginRight: 7, width: 20, height: 20, borderRadius: 10, backgroundColor: '#8700ca' }}>
								<Subtitle style={{ color: '#fff', fontSize: 12 }}>04</Subtitle>
							</View>
							<Subtitle style={Styles.defaultTitlePrime}>{`Как я могу поставить цель на основе шаблона`.toUpperCase()}</Subtitle>
						</View>
						<Text style={Styles.defaultTextPrime}>
							{' '}
							Чтобы добавить цель на основе шаблона, нужно выполнить тап (однократное непродолжительное нажатие) по картинке выбранной категории на начальном экране. Откроется список
							шаблонных целей в выбранной категории. Выберите любую из шаблонных целей и откройте ее. В шаблоне уже заполнены такие поля: - название цели, - частота активности по цели, -
							изображения цели. Вы можете отредактировать эти поля на свое усмотрение, установить срок достижения цели, напоминания и сохранить цель.
						</Text>
						<View styleName="horizontal v-center h-start" style={{ marginBottom: 5, marginTop: 15 }}>
							<View styleName="horizontal v-center h-center" style={{ marginRight: 7, width: 20, height: 20, borderRadius: 10, backgroundColor: '#8700ca' }}>
								<Subtitle style={{ color: '#fff', fontSize: 12 }}>05</Subtitle>
							</View>
							<Subtitle style={Styles.defaultTitlePrime}>{`Как я могу поставить (изменить) напоминания для цели`.toUpperCase()}</Subtitle>
						</View>
						<Text style={Styles.defaultTextPrime}>
							{' '}
							Для каждой цели можно настроить частоту и время получения напоминаний про активность по цели в окне редактирования цели Откройте вкладку Мои на табе Цели. Найдите свою цель
							и откройте ее. Просмотрите всю информацию по цели. Перейдите в окно редактирования цели. Перейдите в раздел Активность. Отредактируйте поле Повторять активность Установите
							Время напоминания для активностей. Сохраните цель.
						</Text>
						<View styleName="horizontal v-center h-start" style={{ marginBottom: 5, marginTop: 15 }}>
							<View styleName="horizontal v-center h-center" style={{ marginRight: 7, width: 20, height: 20, borderRadius: 10, backgroundColor: '#8700ca' }}>
								<Subtitle style={{ color: '#fff', fontSize: 12 }}>06</Subtitle>
							</View>
							<Subtitle style={Styles.defaultTitlePrime}>{`Как я могу посмотреть все свои активные цели`.toUpperCase()}</Subtitle>
						</View>
						<Text style={Styles.defaultTextPrime}>
							Для того, чтобы увидеть свои цели, необходимо на табе Цели открыть вкладку Мои цели. Здесь находятся все цели пользователя, разбитые на категории. На вкладке Архивные
							находятся цели, которые пользователь уже достиг.
						</Text>
						<View styleName="horizontal v-center h-start" style={{ marginBottom: 5, marginTop: 15 }}>
							<View styleName="horizontal v-center h-center" style={{ marginRight: 7, width: 20, height: 20, borderRadius: 10, backgroundColor: '#8700ca' }}>
								<Subtitle style={{ color: '#fff', fontSize: 12 }}>07</Subtitle>
							</View>
							<Subtitle style={Styles.defaultTitlePrime}>{`Что такое активность по цели`.toUpperCase()}</Subtitle>
						</View>
						<Text style={Styles.defaultTextPrime}>
							Активность по цели – это действия пользователя, которые направлены на достижение цели. Активности могут быть как запланированными, так и случайными, т.е. пользователь может
							совершить действие по цели в любое удобное ему время, и отметить эту активность.
						</Text>
						<View styleName="horizontal v-center h-start" style={{ marginBottom: 5, marginTop: 15 }}>
							<View styleName="horizontal v-center h-center" style={{ marginRight: 7, width: 20, height: 20, borderRadius: 10, backgroundColor: '#8700ca' }}>
								<Subtitle style={{ color: '#fff', fontSize: 12 }}>08</Subtitle>
							</View>
							<Subtitle style={Styles.defaultTitlePrime}>{`Как я могу отметить активность (действие) по цели`.toUpperCase()}</Subtitle>
						</View>
						<Text style={Styles.defaultTextPrime}>
							Совершенные активности можно отметить любым удобным способом:
							<Text style={Styles.defaultTextPrime}>
								{'\n'}
								1) При получении напоминания пользователь может сразу отметить активность (по текущему времени) или отложить напоминание на заранее настроенный период отсрочки .
							</Text>
							<Text style={Styles.defaultTextPrime}>
								{'\n'}
								2) С главного экрана приложения пользователь может отметить активность по выбранной цели. Для этого нужно выполнить клик по значку на картинке цели.
							</Text>
							<Text style={Styles.defaultTextPrime}>
								{'\n'}
								3) В самой карточке цели пользователь может отметить активность, кликнув по кнопке добавления активности.{' '}
							</Text>
							<Text style={Styles.defaultTextPrime}>
								{'\n'}
								При записи активности любым из представленных здесь способов, запись о ней добавляется в журнал активностей При клике на изображение цели на карте целей пользователь
								переходит на карточку цели, где он может получить всю информацию по данной цели, история активностей, а также перейти в режим редактирования
							</Text>
						</Text>
						<View styleName="horizontal v-center h-start" style={{ marginBottom: 5, marginTop: 15 }}>
							<View styleName="horizontal v-center h-center" style={{ marginRight: 7, width: 20, height: 20, borderRadius: 10, backgroundColor: '#8700ca' }}>
								<Subtitle style={{ color: '#fff', fontSize: 12 }}>09</Subtitle>
							</View>
							<Subtitle style={Styles.defaultTitlePrime}>{`Как я могу посмотреть историю своих активностей по цели`.toUpperCase()}</Subtitle>
						</View>
						<Text style={Styles.defaultTextPrime}>
							Для того, чтобы посмотреть историю своих активностей по заданной цели, нужно перейти в карточку цели. В разделе Журнал активностей можно найти весь список активностей по
							выбранной цели. В случае необходимости активность можно отредактировать – изменить дату и время выполнения активности, или удалить ошибочно поставленную активность.
						</Text>
					</View>
				</ScrollView>
			</Screen>
		);
	}
}

export default FAQScreen;
