import type { APIGuild } from '@vanguard/api-contracts/interfaces';

import { createContext } from 'react-router';

export const GuildContext = createContext<APIGuild>();
