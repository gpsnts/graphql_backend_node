import express from "express";
import { graphqlHTTP } from "express-graphql";
import cors from "cors";

import { setDatabaseConfigs } from "./database_config";
import { schema } from "./schema";

// console.log("path", __dirname + "/.env");
require("dotenv").config();

console.log("env", process.env);

const main = async () => {
	await setDatabaseConfigs();
	
	const APP = express();

	APP.use(cors());
	APP.use(express.json());
	
	APP.use("/graphql", graphqlHTTP({
		schema,
		graphiql: true
	}));

	APP.listen(8080, () => console.log(`Running on ${process.env.PORT}`));
};

main().catch(err => console.log(`ERROR --- ${err}`));