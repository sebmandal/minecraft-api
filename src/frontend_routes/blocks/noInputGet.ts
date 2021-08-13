import Route from "../../core/route";
import fs from "fs";

const script = async (req: any, res: any) => {
	const BLOCKS = await JSON.parse(fs.readFileSync("./api/blocks.json", "utf8"));

	return res.render("blocks", { blocks: BLOCKS });
};

export default class BlocksGet extends Route {
	/**
	 * Configuring the necessary properties for the class to be executable()
	 *
	 * @param path - The routing path
	 * @param method - The routing method
	 * @param script - The route handler script
	 */
	constructor() {
		super("/blocks", "get", script);
	}
}
