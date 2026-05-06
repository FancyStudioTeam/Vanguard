import { createContext } from 'react-router';

import type { Guild } from '#server/lib/Types/API.ts';

export const guildContext = createContext<Guild>();
