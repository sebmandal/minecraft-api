// API routes
import blockNoInput from "../api_routes/blocks_no_input";
import blockWithInput from "../api_routes/blocks_input";

// index
import indexGet from "../frontend_routes/index/get";

// blocks
import blockGet from "../frontend_routes/block/get";
import blockPost from "../frontend_routes/block/post";

export default {
	// API
	blockNoInput,
	blockWithInput,

	// RENDER
	indexGet,

	blockGet,
	blockPost,
};
