import { createConnection } from "typeorm";

import { Users } from "./entities/Users";

const setDatabaseConfigs = async () => {
	await createConnection({
		type: "postgres",
		host: process.env.POSTGRES_HOST,
		database: process.env.POSTGRES_DATABASE,
		username: process.env.POSTGRES_USER,
		password: process.env.POSTGRES_PASSWORD,
		logging: true,
		synchronize: false,
		entities: [ Users ]
	});
};

export { setDatabaseConfigs }