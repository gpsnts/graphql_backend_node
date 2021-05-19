import { GraphQLID, GraphQLInt, GraphQLList } from "graphql";

import { UserReturnType, UserType } from "../type_defs/User";
import { Users } from "../../entities/Users";

export const GET_USER = {
	type: UserReturnType,
	args: {
		id: { type: GraphQLID }
	},

	async resolve(parent: any, args: any) {
		const { id } = args
		if (!id) throw new Error("Invalid ID");

		const found_user: Users | undefined = await Users.findOne({ id });
		if (!found_user) throw new Error("User not found.");
		
		return {
			name: 		found_user.name,
			username: found_user.username,
			password: found_user.password
		};
	}
};

export const GET_ALL_USERS = {
	type: GraphQLList(UserType),
	
	async resolve(): Promise<Users[]> {
		return await Users.find();
	}
};

export const GET_ALL_USERS_PAGINATION = {
	type: GraphQLList(UserType),
	args: {
		first: 	{ type: GraphQLInt },
		offset: { type: GraphQLInt }
	},
	
	async resolve(parent: any, args: any): Promise<Users[]> {
		const [result, _] = await Users.findAndCount(
			{
				take: args.first || 5,
				skip: args.offset || 5
			}
		);

		return result;
	}
};