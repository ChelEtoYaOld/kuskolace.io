/* Auto-generated */
import { rpcCall } from '@/tools/rpc-client';
type Actions = typeof import('../../../../../src/frontend/actions/Home');

export const getHomePageData = (...args: Parameters<Actions["getHomePageData"]>) => 
  rpcCall<Awaited<ReturnType<Actions["getHomePageData"]>>>("src.frontend.actions.Home.getHomePageData", ...args);
