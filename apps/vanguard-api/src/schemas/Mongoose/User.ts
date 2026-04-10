import { Prop, Schema, SchemaFactory, Virtual } from '@nestjs/mongoose';

@Schema()
export class User {
	@Prop({
		default: null,
		required: true,
		type: String,
	})
	declare avatar: string | null;

	@Prop({
		default: null,
		required: true,
		type: String,
	})
	declare globalName: string | null;

	@Prop({
		required: true,
		type: String,
	})
	declare id: string;

	@Virtual({
		get: function (this: User) {
			const { globalName, username } = this;

			return globalName ?? username;
		},
	})
	declare name: string;

	@Prop({
		required: true,
		type: String,
	})
	declare username: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

export type CreateUserOptions = Readonly<
	Omit<
		{
			[Key in keyof User]: User[Key];
		},
		'name'
	>
>;
