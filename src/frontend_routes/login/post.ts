import Route from '../../core/route'

const administrators = [
	{
		name: 'sebmandal',
		imageUrl: '/img/sebmandal.png',
		password: '399596706402009100',
	},
	{
		name: 'LucasJoel1',
		imageUrl: '/img/DragonLord25.png',
		password: '616382822613123074',
	},
]

const script = async (req: any, res: any) => {
	administrators.forEach((administrator) => {
		if (
			administrator.name === req.body.name &&
			administrator.password === req.body.password
		) {
			req.session.authorized = true
			req.session.userName = administrator.name
			req.session.userImage = administrator.imageUrl
		}
	})

	return res.redirect('/dashboard')
}

export default class LoginPost extends Route {
	/**
	 * Configuring the necessary properties for the class to be executable()
	 *
	 * @param path - The routing path
	 * @param method - The routing method
	 * @param script - The route handler script
	 */
	constructor() {
		super('/login', 'post', script)
	}
}
