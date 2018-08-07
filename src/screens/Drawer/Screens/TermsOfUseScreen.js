import React from 'react';
import { Header } from 'react-native-elements';
import { Screen, View, Title, Subtitle, Text } from '@shoutem/ui';
import { ScrollView } from 'react-native';

class TermsOfUseScreen extends React.Component {
	static navigationOptions = {
		title: 'Пользовательское соглашение',
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
						text: 'Пользовательское соглашение',
						style: { color: '#fff' },
					}}
				/>
				<ScrollView>
					<View style={{ paddingTop: 20, paddingHorizontal: 15 }}>
						<Title styleName="vertical h-center">
							{' '}
							Политика конфиденциальности ProfiGoals
						</Title>
						<Subtitle>
							{'\n'}1) Эта политика конфиденциальности
							предназначена для обеспечения прозрачности
							использования приложения ProfiGoals для устройств
							Android.
						</Subtitle>
						<Text>
							{'\n'}Компания 4Profi разработала приложение
							«ProfiGoals» в качестве коммерческого приложения.
							Приложение помогает пользователям ставить цели и
							добиватться их.
						</Text>
						<Subtitle>
							{' '}
							{'\n'}2) Этот сервис предоставляется 4Profi и
							предназначен для использования как есть.
						</Subtitle>
						<Subtitle>
							{' '}
							{'\n'}3) Информация, которую мы собираем
						</Subtitle>
						<Text>
							{'\n'}При регистрации в ProfiGoals мы запрашиваем
							такую информацию, как ваше имя и адрес электронной
							почты. Вы также можете указать ваш пол, но эта
							информация не является обязательной.
						</Text>
						<Text>
							{'\n'}Приложение имеет доступ к вашим фотографиям, и
							вы можете использовать свои личные фотографии внутри
							приложения. Вся ваша личная информация используются
							только внутри компании и не передаются третьим
							лицам.
						</Text>
						<Subtitle>
							{'\n'}4) Как мы используем информацию
						</Subtitle>
						<Text>
							{'\n'}Личная информация. Мы можем использовать вашу
							личную информацию:
						</Text>
						<Text>
							{'\n'}• для создания индивидуального профиля и
							предоставления персональных услуг.
						</Text>
						<Text>
							{'\n'}• отвечать на ваши запросы, выполнять ваши
							запросы, предоставлять услуги или полные транзакции,
							которые вы запросили
						</Text>
						<Text>
							{'\n'}• предложить использовать или использовать
							некоторые функции в приложении
						</Text>
						<Subtitle>
							{'\n'}5) Все права на ваши данные принадлежат вам.
						</Subtitle>
						<Text>
							{'\n'}Мы никогда не раскроем ваши личные данные
							третьим лицам без вашего предварительного согласия и
							никогда не продадим ваши данные третьим лицам.
							Обработка данных происходит в Соединенных Штатах. Мы
							обмениваемся данными со сторонними подрядчиками,
							услуги которых необходимы для предоставления
							сервиса. Все они соответствуют постановлениям GDPR и
							используют необходимые меры предосторожности, если
							находятся за пределами ЕС.
						</Text>

						<Subtitle> {'\n'}6) Рекламные серверы</Subtitle>
						<Text>
							{'\n'}Мы не сотрудничаем и не имеем никаких
							отношений с компаниями, предоставляющими рекламные
							серверы.
						</Text>
						<Subtitle> {'\n'}7) Безопасность</Subtitle>
						<Text>
							{'\n'}Все данные и информация, переданные через
							Сервис, шифруются с помощью SSL- протокола.
						</Text>
						<Subtitle> {'\n'}8) Изменения</Subtitle>
						<Text>
							{'\n'}Если наша информационная политика изменится в
							будущем, мы уведомим вас об этом, разместив
							изменения на нашем веб-сайте. В новых целях будут
							использованы только данные, полученные после
							изменения политики. Если вас волнует, как
							используется ваша информация, периодически
							проверяйте наш веб-сайт.
						</Text>
					</View>
				</ScrollView>
			</Screen>
		);
	}
}

export default TermsOfUseScreen;
