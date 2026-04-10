import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import type { HydratedDocument, Types } from 'mongoose';
import { type CreateUserOptions, User } from './User.js';

@Schema()
export class Session {
	@Prop({
		required: true,
		type: String,
	})
	declare accessToken: string;

	@Prop({
		required: true,
		type: String,
	})
	declare refreshToken: string;

	@Prop({
		required: true,
		type: String,
	})
	declare sessionId: string;

	@Prop(User)
	declare user: User;

	@Prop({
		required: true,
		type: String,
	})
	declare userId: string;
}

export const SessionSchema = SchemaFactory.createForClass(Session);

export type CreateSessionOptions = Readonly<
	Omit<
		{
			[Key in keyof Session]: Session[Key];
		},
		'user'
	> & {
		user: CreateUserOptions;
	}
>;

export type SessionDocument = HydratedDocument<Session, SessionDocumentOverride>;
export type SessionDocumentOverride = {
	user: Types.Subdocument<Types.ObjectId> & User;
};
