import Route from "../core/route";
import Express from "express";
import fs from "fs";

const script = async (req: Express.Request, res: Express.Response) => {
	res.setHeader("Content-Type", "application/json");

	const BLOCKS = await JSON.parse(fs.readFileSync("./api/blocks.json", "utf8"));
	const input = req.params.block;

	return res.json(BLOCKS);
};

export default class BlockAPINoInput extends Route {
	/**
	 * Configuring the necessary properties for the class to be executable()
	 *
	 * @param path - The routing path
	 * @param method - The routing method
	 * @param script - The route handler script
	 */
	constructor() {
		super("/api/blocks", "get", script);
	}
}
