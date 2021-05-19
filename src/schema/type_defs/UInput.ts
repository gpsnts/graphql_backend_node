import { GraphQLObjectType, GraphQLString } from "graphql";

export const UserReturnType = new GraphQLObjectType({
	name: "UserReturn",
	fields: () => ({
		name: 		{ type: GraphQLString },
		username: { type: GraphQLString },
		password: { type: GraphQLString }
	})
});