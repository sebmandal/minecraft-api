import Route from "../../core/route";

const script = async (req: any, res: any) => {
	res.render("login", {
		session: req.session,
	});
};

export default class LoginGet extends Route {
	/**
	 * Configuring the necessary properties for the class to be executable()
	 *
	 * @param path - The routing path
	 * @param method - The routing method
	 * @param script - The route handler script
	 */
	constructor() {
		super("/login", "get", script);
	}
}
