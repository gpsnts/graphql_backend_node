import express from "express";
import { graphqlHTTP } from "express-graphql";
import cors from "cors";

import { setDatabaseConfigs } from "./database_config";
import { schema } from "./schema";

require("dotenv").config();

const main = async () => {
	await setDatabaseConfigs();
	
	const APP = express();

	APP.use(cors());
	APP.use(express.json());
	
	APP.use("/graphql", graphqlHTTP({
		schema,
		graphiql: true
	}));

	APP.listen(process.env.PORT || 8080, () => console.log(`Running on ${process.env.PORT ? process.env.PORT : 8080}`));
};

main().catch(err => console.log(`ERROR --- ${err}`));
