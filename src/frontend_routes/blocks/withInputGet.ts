import Route from "../../core/route";
import fs from "fs";

const script = async (req: any, res: any) => {
	const BLOCKS = await JSON.parse(
		fs.readFileSync("./api/blocks.json", "utf8"),
	);
	const input = req.params.block.toLowerCase();

	/**
	 * checking if a block has an ID equal to the provided input
	 */
	const inputNumber: number = parseInt(input);
	const block: object | undefined = BLOCKS.find(
		(b: any) => b.id === inputNumber,
	);
	if (block)
		return res.render("block", {
			session: req.session,
			block: block,
			blocks: JSON.parse(fs.readFileSync("./api/blocks.json", "utf8")),
		});

	/**
	 * checking if a block has a name equal to the provided input
	 */
	const result: object | undefined = BLOCKS.find(
		(b: any) =>
			b.name.toLowerCase() === input ||
			b.legacyID === input ||
			b.minecraftName.slice(10) === input,
	);
	if (result)
		return res.render("block", {
			session: req.session,
			block: result,
			blocks: JSON.parse(fs.readFileSync("./api/blocks.json", "utf8")),
		});

	return res.redirect("/blocks");
};

export default class BlocksWithInputGet extends Route {
	/**
	 * Configuring the necessary properties for the class to be executable()
	 *
	 * @param path - The routing path
	 * @param method - The routing method
	 * @param script - The route handler script
	 */
	constructor() {
		super("/blocks/:block", "get", script);
	}
}
