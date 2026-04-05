import { type Collection, type Document, MongoClient } from 'mongodb';
import {
	MONGO_DB_COLLECTION_NAME,
	MONGO_DB_CONNECTION_URL,
	MONGO_DB_DATABASE_NAME,
} from '#lib/Constants/MongoDB.ts';
import { NODE_ENV } from '#lib/Constants/Shared.ts';

export const client =
	global.mongoClient ?? new MongoClient(MONGO_DB_CONNECTION_URL);

if (NODE_ENV === 'development') {
	global.mongoClient = client;
}

const clientPromise: Promise<MongoClient> = client.connect();

export async function getCollection<CollectionDefinition extends Document>(
	collectionName: string,
): Promise<Collection<CollectionDefinition>> {
	const client = await clientPromise;
	const db = client.db(MONGO_DB_DATABASE_NAME);
	const collection = db.collection<CollectionDefinition>(collectionName);

	return collection;
}

export const SessionsCollection = await getCollection<SessionDocument>(
	MONGO_DB_COLLECTION_NAME,
);

export interface SessionDocument {
	credentials: SessionDocumentCredentials;
	sessionId: string;
}

export interface SessionDocumentCredentials {
	accessToken: string;
	refreshToken: string;
}

declare global {
	var mongoClient: MongoClient | null;
}
