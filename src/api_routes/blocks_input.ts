import Route from '../core/route'
import Express from 'express'
import fs from 'fs'

const script = async (req: Express.Request, res: Express.Response) => {
	// check apiKeys.json for the key and if it doesn't exist return 403
	const apiKeys = JSON.parse(fs.readFileSync('./api/apiKeys.json', 'utf8'))
	// make a list of the keys in the apiKeys.json file
	var keys = []
	for (var i = 0; i < apiKeys.length; i++) {
		keys.push(apiKeys[i].key)
	}
	// see if a key was provided in the request
	const key = req.query.key as string | undefined
	// if no key was provided return 403
	if (!key) {
		res.status(403).send('No key provided')
		return
	}
	// if the key provided is not in the list of keys return 403
	if (!keys.includes(key)) {
		res.status(403).send('Invalid key')
		return
	}
	res.setHeader('Content-Type', 'application/json')
	for (var i = 0; i < apiKeys.length; i++) {
		if (apiKeys[i].key === key) {
			if(apiKeys[i].usesLeft == 0) {
				res.status(403).send('Key has no uses left')
				return
			}
			// remove one from uses from the key in the apiKeys.json file
			if(apiKeys[i].admin == false) {
				var data = fs.readFileSync('./api/apiKeys.json', 'utf8')
				var json = JSON.parse(data);
				json[i].usesLeft -= 1
				fs.writeFileSync('./api/apiKeys.json', JSON.stringify(json, null, 4)) 
			}
		}
	}

	const BLOCKS = await JSON.parse(
		fs.readFileSync('./api/blocks.json', 'utf8')
	)
	const input = req.params.block.toLowerCase()

	/**
	 * checking if a block has an ID equal to the provided input
	 */
	const inputNumber: number = parseInt(input)
	const block: object | undefined = BLOCKS.find(
		(b: any) => b.id === inputNumber
	)
	if (block) return res.send(block)

	/**
	 * checking if a block has a name equal to the provided input
	 */
	const result: object | undefined = BLOCKS.find(
		(b: any) =>
			b.name.toLowerCase() === input ||
			b.legacyID === input ||
			b.minecraftName.slice(10) === input
	)
	if (result) return res.send(result)

	/**
	 * if nothing was found or no query was provided, return everything
	 */
	return res.json(BLOCKS)
}

export default class BlockAPIWithInput extends Route {
	/**
	 * Configuring the necessary properties for the class to be executable()
	 *
	 * @param path - The routing path
	 * @param method - The routing method
	 * @param script - The route handler script
	 */
	constructor() {
		super('/api/blocks/:block', 'get', script)
	}
}
