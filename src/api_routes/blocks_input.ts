import Route from "../core/route";
import Express from "express";
import fs from "fs";

const script = async (req: Express.Request, res: Express.Response) => {
	res.setHeader("Content-Type", "application/json");

	const BLOCKS = await JSON.parse(fs.readFileSync("./api/blocks.json", "utf8"));
	const input = req.params.block;

	/**
	 * checking if a block has an ID equal to the provided input
	 */
	const inputNumber: number = parseInt(input);
	const block: object | undefined = BLOCKS.find(
		(b: any) => b.id === inputNumber
	);
	if (block) return res.send(block);

	/**
	 * checking if a block has a name equal to the provided input
	 */
	const result: object | undefined = BLOCKS.find(
		(b: any) =>
			b.name.toLowerCase() === input ||
			b.legacyID === input ||
			b.minecraftName.slice(10) === input
	);
	if (result) return res.send(result);

	/**
	 * if nothing was found or no query was provided, return everything
	 */
	return res.json(BLOCKS);
};

export default class BlockAPIWithInput extends Route {
	/**
	 * Configuring the necessary properties for the class to be executable()
	 *
	 * @param path - The routing path
	 * @param method - The routing method
	 * @param script - The route handler script
	 */
	constructor() {
		super("/api/blocks/:block", "get", script);
	}
}
