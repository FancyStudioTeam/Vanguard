import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import type { HydratedDocument } from 'mongoose';

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

	@Prop({
		required: true,
		type: String,
	})
	declare userId: string;
}

export const SessionSchema = SchemaFactory.createForClass(Session);

export type CreateSessionOptions = Readonly<{
	[Key in keyof Session]: Session[Key];
}>;

export type SessionDocument = HydratedDocument<Session>;
