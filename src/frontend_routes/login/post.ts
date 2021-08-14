import Route from "../../core/route";

const script = async (req: any, res: any) => {
	if (req.body.password === "616382822613123074") {
		req.session.authorized = true;
	}

	return res.redirect("/");
};

export default class LoginPost extends Route {
	/**
	 * Configuring the necessary properties for the class to be executable()
	 *
	 * @param path - The routing path
	 * @param method - The routing method
	 * @param script - The route handler script
	 */
	constructor() {
		super("/login", "post", script);
	}
}
