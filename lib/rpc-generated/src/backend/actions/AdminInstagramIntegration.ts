/* Auto-generated */
import { rpcCall } from '@/tools/rpc-client';
type Actions = typeof import('../../../../../src/backend/actions/AdminInstagramIntegration');

export const getInstagramIntegrationData = (...args: Parameters<Actions["getInstagramIntegrationData"]>) => 
  rpcCall<Awaited<ReturnType<Actions["getInstagramIntegrationData"]>>>("src.backend.actions.AdminInstagramIntegration.getInstagramIntegrationData", ...args);
export const updateInstagramConfig = (...args: Parameters<Actions["updateInstagramConfig"]>) => 
  rpcCall<Awaited<ReturnType<Actions["updateInstagramConfig"]>>>("src.backend.actions.AdminInstagramIntegration.updateInstagramConfig", ...args);
export const triggerInstagramSync = (...args: Parameters<Actions["triggerInstagramSync"]>) => 
  rpcCall<Awaited<ReturnType<Actions["triggerInstagramSync"]>>>("src.backend.actions.AdminInstagramIntegration.triggerInstagramSync", ...args);
export const upsertInstagramPost = (...args: Parameters<Actions["upsertInstagramPost"]>) => 
  rpcCall<Awaited<ReturnType<Actions["upsertInstagramPost"]>>>("src.backend.actions.AdminInstagramIntegration.upsertInstagramPost", ...args);
export const toggleFeaturedPost = (...args: Parameters<Actions["toggleFeaturedPost"]>) => 
  rpcCall<Awaited<ReturnType<Actions["toggleFeaturedPost"]>>>("src.backend.actions.AdminInstagramIntegration.toggleFeaturedPost", ...args);
export const deleteInstagramPost = (...args: Parameters<Actions["deleteInstagramPost"]>) => 
  rpcCall<Awaited<ReturnType<Actions["deleteInstagramPost"]>>>("src.backend.actions.AdminInstagramIntegration.deleteInstagramPost", ...args);
