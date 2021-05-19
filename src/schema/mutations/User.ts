import { GraphQLID, GraphQLNonNull, GraphQLString } from "graphql";

import { UserReturnType, UserType } from "../type_defs/User"
import { Users } from "../../entities/Users";
import { StatusCountType, StatusEnumType } from "../type_defs/Status";
import { DeleteResult, UpdateResult } from "typeorm";
import { UserInputType } from "../inputs/UserInput";

export const CREATE_USER_INPUT = {
	type: UserType,
	args: {
		user: { type: UserInputType }
	},

	async resolve(parent: any, args: any) {
		await Users.insert({ ...args.user });
		return args.user;
	}
};

export const CREATE_USER = {
	type: UserReturnType,
	args: {
		name: 			{ type: GraphQLNonNull(GraphQLString) },
		username: 	{ type: GraphQLNonNull(GraphQLString) },
		password: 	{ type: GraphQLNonNull(GraphQLString) },
		behaviour: 	{ type: GraphQLString }
	},

	async resolve(parent: any, args: any) {
		await Users.insert({ ...args });
		return { ...args };
	}
};

export const DELETE_USER = {
	type: StatusCountType,
	args: {
		id:	{ type: GraphQLID }
	},

	async resolve(parent: any, args: any) {
		const ID = args.id;
		const deleted: DeleteResult = await Users.delete(ID);
		
		return {
			status: StatusEnumType.getValue("OK")?.value,
			count: Number(deleted.affected)
		};
	}
}

export const UPDATE_USER = {
	type: StatusCountType,
	args: {
		id: 					{ type: GraphQLID 		},
		new_name: 		{ type: GraphQLString },
		new_username: { type: GraphQLString }
	},

	async resolve(parent: any, args: any) {
		const { id, new_name, new_username } = args;
		const found_user: Users | undefined = await Users.findOne({ id });

		if (!found_user) throw new Error("User not found");	

		try {
			const updated_user: UpdateResult = await Users.update(
				id,
				{
					name: new_name ? new_name : found_user.name,
					username: new_username ? new_username : found_user.username
				}
			);
			
			return {
				status: StatusEnumType.getValue("OK")?.value,
				count: Number(updated_user.affected)
			};
		} catch (error) {
			return {
				status: StatusEnumType.getValue("ERROR")?.value,
				count: 0
			};
		}
	}
}