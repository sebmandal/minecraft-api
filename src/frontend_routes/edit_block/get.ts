import Route from "../../core/route";
import fs from "fs";

const script = async (req: any, res: any) => {
	if (!req.session.authorized) return res.redirect("/");

	const blocks = JSON.parse(fs.readFileSync("./api/blocks.json", "utf8"));

	const block = blocks.find(
		(block: any) => block.minecraftName.slice(10) === req.params.block,
	);

	return res.render("developer/edit_block", {
		session: req.session,
		block: block,
	});
};

export default class EditBlockGet extends Route {
	/**
	 * Configuring the necessary properties for the class to be executable()
	 *
	 * @param path - The routing path
	 * @param method - The routing method
	 * @param script - The route handler script
	 */
	constructor() {
		super("/dashboard/edit_block/:block", "get", script);
	}
}
