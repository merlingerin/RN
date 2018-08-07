export const authWithGoogle = async () => {
	try {
		const result = await Expo.Google.logInAsync(credential);

		if (result.type === 'success') {
			this.setState({
				isAuth: true,
				profile: result,
			});
			return result.accessToken;
		} else {
			return { cancelled: true };
		}
	} catch (e) {
		console.log('error ', e);

		return { error: true };
	}
};
