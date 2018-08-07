import React from 'react';
import { Header } from 'react-native-elements';
import { Screen, View, Title, Subtitle, Text } from '@shoutem/ui';
import { ScrollView } from 'react-native';

class FAQScreen extends React.Component {
	static navigationOptions = {
		title: 'FAQ',
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
						text: 'Ответы на часто задаваемые вопросы',
						style: { color: '#fff' },
					}}
				/>
				<ScrollView>
					<View style={{ paddingTop: 20, paddingHorizontal: 15 }}>
						<Title styleName="vertical h-center">
							Ответы на часто задаваемые вопросы
						</Title>
						<Subtitle>1. Как я могу поставить свою цель?</Subtitle>
						<Text>
							Выполните тап (однократное непродолжительное
							нажатие) по картинке выбранной категории на
							начальном экране. В новом окне выполните тап по
							кнопке Добавить цель, откроется экран
							добавления/редактирования цели. Заполните все
							необходимые поля цели: - название цели, - срок
							достижения цели, - частота активности по цели, -
							время напоминания, - выберите изображения цели из
							библиотеки приложения или из галереи устройства.
							Важно выбрать изображение, которое мотивировало бы
							вас на выполнение именно этой цели. Сохраните вашу
							цель.{' '}
						</Text>
						<Subtitle>2. Что такое шаблоны целей?</Subtitle>
						<Text>
							{' '}
							Шаблоны целей упрощают процесс постановки целей. Они
							созданы на основе наиболее распространенные целей
							пользователей. Шаблоны содержат название цели,
							категорию цели, частоту активностей по цели и
							картинку цели. Для того, чтобы выбранный вами шаблон
							превратился в вашу цель, необходимо установить свой
							срок достижения цели и время для напоминаний про
							активности. По желанию вы можете изменить картинку
							цели.{' '}
						</Text>
						<Subtitle>
							3. Как я могу поставить цель на основе шаблона
						</Subtitle>
						<Text>
							{' '}
							Чтобы добавить цель на основе шаблона, нужно
							выполнить тап (однократное непродолжительное
							нажатие) по картинке выбранной категории на
							начальном экране. Откроется список шаблонных целей в
							выбранной категории. Выберите любую из шаблонных
							целей и откройте ее. В шаблоне уже заполнены такие
							поля: - название цели, - частота активности по цели,
							- изображения цели. Вы можете отредактировать эти
							поля на свое усмотрение, установить срок достижения
							цели, напоминания и сохранить цель.
						</Text>
						<Subtitle>
							{' '}
							4. Как я могу поставить (изменить) напоминания для
							цели
						</Subtitle>
						<Text>
							{' '}
							Для каждой цели можно настроить частоту и время
							получения напоминаний про активность по цели в окне
							редактирования цели Откройте вкладку Мои на табе
							Цели. Найдите свою цель и откройте ее. Просмотрите
							всю информацию по цели. Перейдите в окно
							редактирования цели. Перейдите в раздел Активность.
							Отредактируйте поле Повторять активность Установите
							Время напоминания для активностей. Сохраните цель.
						</Text>
						<Subtitle>
							5. Как я могу посмотреть все свои активные цели
						</Subtitle>
						<Text>
							Для того, чтобы увидеть свои цели, необходимо на
							табе Цели открыть вкладку Мои цели. Здесь находятся
							все цели пользователя, разбитые на категории. На
							вкладке Архивные находятся цели, которые
							пользователь уже достиг.
						</Text>
						<Subtitle>6. Что такое активность по цели</Subtitle>
						<Text>
							Активность по цели – это действия пользователя,
							которые направлены на достижение цели. Активности
							могут быть как запланированными, так и случайными,
							т.е. пользователь может совершить действие по цели в
							любое удобное ему время, и отметить эту активность.
						</Text>
						<Subtitle>
							7. Как я могу отметить активность (действие) по цели
						</Subtitle>
						<Text>
							Совершенные активности можно отметить любым удобным
							способом:
							<Text>
								{'\n'}
								1) При получении напоминания пользователь может
								сразу отметить активность (по текущему времени)
								или отложить напоминание на заранее настроенный
								период отсрочки .
							</Text>
							<Text>
								{'\n'}
								2) С главного экрана приложения пользователь
								может отметить активность по выбранной цели. Для
								этого нужно выполнить клик по значку на картинке
								цели.
							</Text>
							<Text>
								{'\n'}
								3) В самой карточке цели пользователь может
								отметить активность, кликнув по кнопке
								добавления активности.{' '}
							</Text>
							<Text>
								{'\n'}
								При записи активности любым из представленных
								здесь способов, запись о ней добавляется в
								журнал активностей При клике на изображение цели
								на карте целей пользователь переходит на
								карточку цели, где он может получить всю
								информацию по данной цели, история активностей,
								а также перейти в режим редактирования 8. Как я
								могу посмотреть историю своих активностей по
								цели Для того, чтобы посмотреть историю своих
								активностей по заданной цели, нужно перейти в
								карточку цели. В разделе Журнал активностей
								можно найти весь список активностей по выбранной
								цели. В случае необходимости активность можно
								отредактировать – изменить дату и время
								выполнения активности, или удалить ошибочно
								поставленную активность.
							</Text>
						</Text>
					</View>
				</ScrollView>
			</Screen>
		);
	}
}

export default FAQScreen;
