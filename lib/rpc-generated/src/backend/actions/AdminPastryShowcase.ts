/* Auto-generated */
import { rpcCall } from '@/tools/rpc-client';
type Actions = typeof import('../../../../../src/backend/actions/AdminPastryShowcase');

export const getPastryItems = (...args: Parameters<Actions["getPastryItems"]>) => 
  rpcCall<Awaited<ReturnType<Actions["getPastryItems"]>>>("src.backend.actions.AdminPastryShowcase.getPastryItems", ...args);
export const createPastryItem = (...args: Parameters<Actions["createPastryItem"]>) => 
  rpcCall<Awaited<ReturnType<Actions["createPastryItem"]>>>("src.backend.actions.AdminPastryShowcase.createPastryItem", ...args);
export const updatePastryItem = (...args: Parameters<Actions["updatePastryItem"]>) => 
  rpcCall<Awaited<ReturnType<Actions["updatePastryItem"]>>>("src.backend.actions.AdminPastryShowcase.updatePastryItem", ...args);
export const togglePastrySoldOut = (...args: Parameters<Actions["togglePastrySoldOut"]>) => 
  rpcCall<Awaited<ReturnType<Actions["togglePastrySoldOut"]>>>("src.backend.actions.AdminPastryShowcase.togglePastrySoldOut", ...args);
export const togglePastryTodaySpecial = (...args: Parameters<Actions["togglePastryTodaySpecial"]>) => 
  rpcCall<Awaited<ReturnType<Actions["togglePastryTodaySpecial"]>>>("src.backend.actions.AdminPastryShowcase.togglePastryTodaySpecial", ...args);
export const movePastryOrder = (...args: Parameters<Actions["movePastryOrder"]>) => 
  rpcCall<Awaited<ReturnType<Actions["movePastryOrder"]>>>("src.backend.actions.AdminPastryShowcase.movePastryOrder", ...args);
export const deletePastryItem = (...args: Parameters<Actions["deletePastryItem"]>) => 
  rpcCall<Awaited<ReturnType<Actions["deletePastryItem"]>>>("src.backend.actions.AdminPastryShowcase.deletePastryItem", ...args);
