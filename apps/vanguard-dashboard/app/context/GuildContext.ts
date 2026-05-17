import type { APIGuild } from '@vanguard/api-types/interfaces';

import { createContext } from 'react-router';

export const GuildContext = createContext<APIGuild>();
