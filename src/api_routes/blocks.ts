import Route from "../core/route";
import fs from "fs";

// temporarily until we have actual JSON data
const BLOCKS = [
	{
		name: "Air",
		id: 0,
		data: 0,
	},
	{
		name: "Stone",
		id: 1,
		data: 0,
	},
	{
		name: "Grass",
		id: 2,
		data: 0,
	},
	{
		name: "Dirt",
		id: 3,
		data: 0,
	},
	{
		name: "Cobblestone",
		id: 4,
		data: 0,
	},
	{
		name: "Wooden Plank",
		id: 5,
		data: 0,
	},
	{
		name: "Sapling",
		id: 6,
		data: 0,
	},
	{
		name: "Bedrock",
		id: 7,
		data: 0,
	},
	{
		name: "Water",
		id: 8,
		data: 0,
	},
	{
		name: "Stationary Water",
		id: 9,
		data: 0,
	},
	{
		name: "Lava",
		id: 10,
		data: 0,
	},
	{
		name: "Stationary Lava",
		id: 11,
		data: 0,
	},
	{
		name: "Sand",
		id: 12,
		data: 0,
	},
	{
		name: "Gravel",
		id: 13,
		data: 0,
	},
	{
		name: "Gold Ore",
		id: 14,
		data: 0,
	},
];

const script = async (req: any, res: any) => {
	// const BLOCKS = await JSON.parse(fs.readFileSync("./api/blocks.json", "utf8"));

	const input = req.params.block;

	if (!isNaN(input)) {
		/**
		 * checking if a block exists with the provided ID
		 */
		const inputNumber: number = parseInt(input);
		const block: object | undefined = BLOCKS.find((b) => b.id === inputNumber);
		if (block) return res.send(block);
	} else {
		/**
		 * checking if a block exists with the provided name
		 */
		const result = BLOCKS.find(
			(b) => b.name.toLowerCase() === input.toLowerCase()
		);
		if (result) return res.send(result);
	}

	/**
	 * if nothing was found or no query was provided, return everything
	 */
	return res.send(BLOCKS);
};

export default class API extends Route {
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
