import Route from '../../core/route'
import fs from 'fs'

const script = async (req: any, res: any) => {
	if (!req.session.authorized) return res.redirect('/')

	const blockData = JSON.parse(fs.readFileSync('./api/blocks.json', 'utf8'))
	const newObject = {
		name: req.body.name,
		minecraftName: req.body.minecraftName,
		legacyID: req.body.legacyID,
		introduced: req.body.introduced,
		imageUrl: `/textures/block/${req.body.minecraftName.slice(10)}.png`,
		naturalSpawns: {
			naturalSpawnInOverworldDimension: Boolean(req.body.overworld),
			naturalSpawnInNetherDimension: Boolean(req.body.nether),
			naturalSpawnInEndDimension: Boolean(req.body.end),
		},
		solidity: req.body.solidity.toLowerCase(),
		stats: {
			opacity: parseFloat(req.body.opacity),
			hardness: parseFloat(req.body.hardness),
			resistance: parseFloat(req.body.resistance),
			luminance: parseFloat(req.body.luminance),
			interactive: Boolean(req.body.interactive),
			slippery: Boolean(req.body.slippery),
			flammable: Boolean(req.body.flammable),
			catchesFireFromLava: Boolean(req.body.catchesFireFromLava),
			brokenByWater: Boolean(req.body.brokenByWater),
		},
		hitbox: {
			width: parseFloat(req.body.width),
			height: parseFloat(req.body.height),
			length: parseFloat(req.body.length),
		},
		drops: {
			defaultDrop: req.body.defaultDrop,
			silkTouchDrop: req.body.silkTouchDrop,
			dropAffectedByFortune: Boolean(req.body.affectedByFortune),
		},
		toolData: JSON.parse(req.body.tooldata),
		minimumExperienceOnBreak: parseFloat(req.body.minimumXP),
		maximumExperienceOnBreak: parseFloat(req.body.maximumXP),
		removed: Boolean(req.body.removed),
	}
	blockData.push(newObject)

	// writing the new object to the file
	fs.writeFileSync('./api/blocks.json', JSON.stringify(blockData, null, 4))

	// returning the person back to index
	return res.redirect('/')
}

export default class AddBlockPost extends Route {
	/**
	 * Configuring the necessary properties for the class to be executable()
	 *
	 * @param path - The routing path
	 * @param method - The routing method
	 * @param script - The route handler script
	 */
	constructor() {
		super('/dashboard/add_block', 'post', script)
	}
}
