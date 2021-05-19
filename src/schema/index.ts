import { GraphQLObjectType, GraphQLSchema } from "graphql";

// Queries
import { GET_ALL_USERS, GET_USER } from "./queries/User";

// Mutations
import { CREATE_USER_INPUT, CREATE_USER, DELETE_USER, UPDATE_USER } from "./mutations/User";

const RQuery = new GraphQLObjectType({
	name: "RQuery",
	fields: {
		getAllUsers: GET_ALL_USERS,
		getUser:		 GET_USER
	}
});

const RMutation = new GraphQLObjectType({
	name: "RMutation",
	fields: {
		createUserInput:	CREATE_USER_INPUT,
		createUser: 			CREATE_USER,
		deleteUser:				DELETE_USER,
		updateUser:				UPDATE_USER
	}
});

export const schema = new GraphQLSchema({
	query: 		RQuery,
	mutation: RMutation 
});