import Route from "../../core/route";
import fs from "fs";

const script = async (req: any, res: any) => {
	const BLOCKS = await JSON.parse(
		fs.readFileSync("./api/blocks.json", "utf8"),
	);

	if (req.query.block) {
		/**
		 * checking if a block has an ID equal to the provided input
		 */
		const inputNumber: number = parseInt(req.query.block);
		const block: object | undefined = BLOCKS.find(
			(b: any) => b.id === inputNumber,
		);
		if (block)
			return res.render("block", {
				block: block,
				blocks: JSON.parse(
					fs.readFileSync("./api/blocks.json", "utf8"),
				),
			});

		/**
		 * checking if a block has a name equal to the provided input
		 */
		const result: object | undefined = BLOCKS.find(
			(b: any) =>
				b.name.toLowerCase() === req.query.block ||
				b.legacyID === req.query.block ||
				b.minecraftName.slice(10) === req.query.block,
		);
		if (result)
			return res.render("block", {
				block: result,
				blocks: JSON.parse(
					fs.readFileSync("./api/blocks.json", "utf8"),
				),
			});
	}

	return res.redirect("/blocks");
};

export default class BlockWithQueryGet extends Route {
	/**
	 * Configuring the necessary properties for the class to be executable()
	 *
	 * @param path - The routing path
	 * @param method - The routing method
	 * @param script - The route handler script
	 */
	constructor() {
		super("/block", "get", script);
	}
}
