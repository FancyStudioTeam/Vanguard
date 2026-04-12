import { createContext } from 'react-router';
import type { User } from '#server/lib/Types/API.ts';

export const userContext = createContext<User>();
