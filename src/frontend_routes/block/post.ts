import Route from "../../core/route";
import fs from "fs";

const script = async (req: any, res: any) => {
	const blockData = JSON.parse(fs.readFileSync("./api/blocks.json", "utf8"));
	const newObject = {
		name: req.body.name,
		minecraftName: req.body.minecraftName,
		imageUrl: `https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.17.1/assets/minecraft/textures/block/${req.body.name
			.replace(" ", "_")
			.toLowerCase()}.png`,
		naturalSpawns: {
			naturalSpawnInOverworldDimension: req.body.overworld,
			naturalSpawnInNetherDimension: req.body.nether,
			naturalSpawnInEndDimension: req.body.end,
		},
		solidity: req.body.solidity.toLowerCase(),
		stats: {
			opacity: parseFloat(req.body.opacity),
			hardness: parseFloat(req.body.hardness),
			resistance: parseFloat(req.body.resistance),
			luminance: parseFloat(req.body.luminance),
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
		toolData: JSON.parse(req.body.tooldata),
		minimumExperienceOnBreak: parseFloat(req.body.minimumXP),
		maximumExperienceOnBreak: parseFloat(req.body.maximumXP),
		removed: Boolean(req.body.removed),
	};
	blockData.push(newObject);
	// writing the new object to the file
	fs.writeFileSync("./api/blocks.json", JSON.stringify(blockData, null, 4));

	// returning the person back to index
	return res.redirect("/");
};

export default class BlockPost extends Route {
	/**
	 * Configuring the necessary properties for the class to be executable()
	 *
	 * @param path - The routing path
	 * @param method - The routing method
	 * @param script - The route handler script
	 */
	constructor() {
		super("/block", "post", script);
	}
}
