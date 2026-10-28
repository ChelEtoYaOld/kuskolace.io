/* Auto-generated */
import { rpcCall } from '@/tools/rpc-client';
type Actions = typeof import('../../../../../src/backend/actions/AdminBusinessFacts');

export const getAdminBusinessFacts = (...args: Parameters<Actions["getAdminBusinessFacts"]>) => 
  rpcCall<Awaited<ReturnType<Actions["getAdminBusinessFacts"]>>>("src.backend.actions.AdminBusinessFacts.getAdminBusinessFacts", ...args);
export const saveBusinessFactsAndHours = (...args: Parameters<Actions["saveBusinessFactsAndHours"]>) => 
  rpcCall<Awaited<ReturnType<Actions["saveBusinessFactsAndHours"]>>>("src.backend.actions.AdminBusinessFacts.saveBusinessFactsAndHours", ...args);
