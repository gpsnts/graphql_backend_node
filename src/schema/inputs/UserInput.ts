import { GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from "graphql";

export const UserInputType = new GraphQLInputObjectType({
	name: "UserInput",
	fields: {
		name: 			{ type: GraphQLNonNull(GraphQLString) },
		username: 	{ type: GraphQLNonNull(GraphQLString) },
		password: 	{ type: GraphQLNonNull(GraphQLString) },
		behaviour: 	{ type: GraphQLString }
	}
});