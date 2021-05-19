import {GraphQLObjectType, GraphQLEnumType, GraphQLScalarType, GraphQLString, GraphQLInt } from "graphql";

export const StatusEnumType = new GraphQLEnumType({
	name: "StatusEnum",
	values: {
		OK: 	 { value: "OK" },
		ERROR: { value: "ERROR" } 
	}
});

export const StatusType = new GraphQLObjectType({
	name: "Status",
	fields: () => ({
		status: { type: StatusEnumType },
	})
});

export const StatusCountType = new GraphQLObjectType({
	name: "StatusCount",
	fields: () => ({
		status: { type: StatusEnumType	},
		count:  { type: GraphQLInt  	 	}
	})
});