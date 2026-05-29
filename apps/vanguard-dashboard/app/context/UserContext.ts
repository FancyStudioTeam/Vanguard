import type { DiscordUser } from '@vanguard/api-contracts/interfaces';

import { createContext } from 'react-router';

export const UserContext = createContext<DiscordUser>();
