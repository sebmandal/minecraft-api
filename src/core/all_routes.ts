// API routes
import blockNoInput from "../api_routes/blocks_no_input";
import blockWithInput from "../api_routes/blocks_input";

// index
import indexGet from "../frontend_routes/index/get";

// add block
import addBlockGet from "../frontend_routes/add_block/get";
import addBlockPost from "../frontend_routes/add_block/post";

// block
import withInputBlockGet from "../frontend_routes/blocks/withInputGet"; // if a page path is given, it will be used as the block id/name
import withQueryGet from "../frontend_routes/blocks/withQueryGet"; // if a query is given, it will be used as the block id/name
import noInputBlockGet from "../frontend_routes/blocks/noInputGet"; // if nothing is provided, it sends the entire blockbase

// login/out
import loginGet from "../frontend_routes/login/get";
import loginPost from "../frontend_routes/login/post";
import logoutGet from "../frontend_routes/logout/get";

export default {
	// API
	blockNoInput,
	blockWithInput,

	// RENDER
	indexGet,

	// ADD BLOCK
	addBlockGet,
	addBlockPost,

	// BLOCKS
	withInputBlockGet,
	withQueryGet,
	noInputBlockGet,

	// LOGIN/OUT
	loginGet,
	loginPost,
	logoutGet,
};
