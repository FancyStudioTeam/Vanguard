import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import type { HydratedDocument } from 'mongoose';

@Schema()
export class Session {
	@Prop({
		required: true,
	})
	declare accessToken: string;

	@Prop({
		required: true,
	})
	declare refreshToken: string;

	@Prop({
		required: true,
	})
	declare sessionId: string;

	@Prop({
		required: true,
	})
	declare userId: string;
}

export const SessionSchema = SchemaFactory.createForClass(Session);

export type CreateSessionOptions = Readonly<{
	accessToken: string;
	refreshToken: string;
	sessionId: string;
	userId: string;
}>;

export type SessionDocument = HydratedDocument<Session>;
