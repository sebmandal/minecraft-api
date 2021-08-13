import Route from "../../core/route";

const script = async (req: any, res: any) => {
	res.render("index", { session: req.session });
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
