import Route from '../../core/route'

const script = async (req: any, res: any) => {
	req.session.authorized = false
	return res.redirect('/')
}

export default class LogoutGet extends Route {
	/**
	 * Configuring the necessary properties for the class to be executable()
	 *
	 * @param path - The routing path
	 * @param method - The routing method
	 * @param script - The route handler script
	 */
	constructor() {
		super('/logout', 'get', script)
	}
}
