import Route from '../../core/route'
import fs from 'fs'

const script = async (req: any, res: any) => {
	// Get the blocks
	const BLOCKS = await JSON.parse(
		fs.readFileSync('./api/blocks.json', 'utf8')
	)

	if (!req.query.page || isNaN(req.query.page)) {
		// If no page is given, return the first page
		return res.redirect('/blocks?page=0')
	} else if (req.query.page > Math.floor(BLOCKS.length / 20)) {
		// If page is higher than the number of pages, redirect to first page
		return res.redirect('/blocks?page=0')
	} else if (req.query.page < 0) {
		// If a page below 0 is requested, redirect to the last page
		return res.redirect('/blocks?page=' + Math.floor(BLOCKS.length / 20))
	}

	// If everything is ok, return the requested page
	let pageNumber = parseInt(req.query.page)
	const pageSize = 20
	const start = pageNumber * pageSize
	const end = start + pageSize
	const blocks = BLOCKS.slice(start, end)
	return res.render('blocks', {
		session: req.session,
		blocks: blocks,
		pageNumber: pageNumber,
	})
}

export default class BlocksGet extends Route {
	/**
	 * Configuring the necessary properties for the class to be executable()
	 *
	 * @param path   The routing path
	 * @param method The routing method
	 * @param script The route handler script
	 */
	constructor() {
		super('/blocks', 'get', script)
	}
}
