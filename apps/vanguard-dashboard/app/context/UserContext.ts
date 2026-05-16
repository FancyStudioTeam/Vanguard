import type { APIUser } from '@vanguard/api-types/interfaces';

import { createContext } from 'react-router';

export const userContext = createContext<APIUser>();
