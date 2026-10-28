/* Auto-generated */
import { rpcCall } from '@/tools/rpc-client';
type Actions = typeof import('../../../../../src/backend/actions/AdminCmsSections');

export const getCmsConfig = (...args: Parameters<Actions["getCmsConfig"]>) => 
  rpcCall<Awaited<ReturnType<Actions["getCmsConfig"]>>>("src.backend.actions.AdminCmsSections.getCmsConfig", ...args);
export const updateCmsConfig = (...args: Parameters<Actions["updateCmsConfig"]>) => 
  rpcCall<Awaited<ReturnType<Actions["updateCmsConfig"]>>>("src.backend.actions.AdminCmsSections.updateCmsConfig", ...args);
