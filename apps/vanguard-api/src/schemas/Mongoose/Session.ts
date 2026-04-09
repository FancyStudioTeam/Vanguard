import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import type { HydratedDocument } from 'mongoose';

@Schema()
export class Session {
	@Prop({
		required: true,
	})
	declare userId: string;
}

export const SessionSchema = SchemaFactory.createForClass(Session);

export type SessionDocument = HydratedDocument<Session>;
