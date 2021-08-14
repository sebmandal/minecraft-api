import Route from "../../core/route";

const script = async (req: any, res: any) => {
	return res.render("developer/dashboard", {
		session: req.session,
	});
};

export default class DashboardGet extends Route {
	/**
	 * Configuring the necessary properties for the class to be executable()
	 *
	 * @param path - The routing path
	 * @param method - The routing method
	 * @param script - The route handler script
	 */
	constructor() {
		super("/dashboard", "get", script);
	}
}
