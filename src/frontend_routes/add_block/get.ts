import Route from '../../core/route'
import fs from 'fs'

const script = async (req: any, res: any) => {
	if (req.session.authorized) {
		return res.render('developer/add_block', {
			session: req.session,
			blocks: JSON.parse(fs.readFileSync('./api/blocks.json', 'utf8')),
		})
	} else {
		return res.redirect('/login')
	}
}

export default class AddBlockGet extends Route {
	/**
	 * Configuring the necessary properties for the class to be executable()
	 *
	 * @param path - The routing path
	 * @param method - The routing method
	 * @param script - The route handler script
	 */
	constructor() {
		super('/dashboard/add_block', 'get', script)
	}
}
