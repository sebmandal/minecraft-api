import Route from "../../core/route";
import fs from "fs";

const script = async (req: any, res: any) => {
	return res.render("index", {
		session: req.session,
		blocks: JSON.parse(fs.readFileSync("./api/blocks.json", "utf8")),
	});
};

export default class IndexGet extends Route {
	/**
	 * Configuring the necessary properties for the class to be executable()
	 *
	 * @param path - The routing path
	 * @param method - The routing method
	 * @param script - The route handler script
	 */
	constructor() {
		super("/", "get", script);
	}
}
