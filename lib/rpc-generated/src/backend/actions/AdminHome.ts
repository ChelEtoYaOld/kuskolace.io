/* Auto-generated */
import { rpcCall } from '@/tools/rpc-client';
type Actions = typeof import('../../../../../src/backend/actions/AdminHome');

export const getAdminHomeDashboard = (...args: Parameters<Actions["getAdminHomeDashboard"]>) => 
  rpcCall<Awaited<ReturnType<Actions["getAdminHomeDashboard"]>>>("src.backend.actions.AdminHome.getAdminHomeDashboard", ...args);
export const togglePastrySpecial = (...args: Parameters<Actions["togglePastrySpecial"]>) => 
  rpcCall<Awaited<ReturnType<Actions["togglePastrySpecial"]>>>("src.backend.actions.AdminHome.togglePastrySpecial", ...args);
export const togglePastrySoldOut = (...args: Parameters<Actions["togglePastrySoldOut"]>) => 
  rpcCall<Awaited<ReturnType<Actions["togglePastrySoldOut"]>>>("src.backend.actions.AdminHome.togglePastrySoldOut", ...args);
export const createPastryItem = (...args: Parameters<Actions["createPastryItem"]>) => 
  rpcCall<Awaited<ReturnType<Actions["createPastryItem"]>>>("src.backend.actions.AdminHome.createPastryItem", ...args);
export const updatePastryItem = (...args: Parameters<Actions["updatePastryItem"]>) => 
  rpcCall<Awaited<ReturnType<Actions["updatePastryItem"]>>>("src.backend.actions.AdminHome.updatePastryItem", ...args);
export const deletePastryItem = (...args: Parameters<Actions["deletePastryItem"]>) => 
  rpcCall<Awaited<ReturnType<Actions["deletePastryItem"]>>>("src.backend.actions.AdminHome.deletePastryItem", ...args);
export const reorderPastryItems = (...args: Parameters<Actions["reorderPastryItems"]>) => 
  rpcCall<Awaited<ReturnType<Actions["reorderPastryItems"]>>>("src.backend.actions.AdminHome.reorderPastryItems", ...args);
export const toggleInstagramFeedMode = (...args: Parameters<Actions["toggleInstagramFeedMode"]>) => 
  rpcCall<Awaited<ReturnType<Actions["toggleInstagramFeedMode"]>>>("src.backend.actions.AdminHome.toggleInstagramFeedMode", ...args);
export const toggleInstagramAutoSync = (...args: Parameters<Actions["toggleInstagramAutoSync"]>) => 
  rpcCall<Awaited<ReturnType<Actions["toggleInstagramAutoSync"]>>>("src.backend.actions.AdminHome.toggleInstagramAutoSync", ...args);
export const manualSyncInstagram = (...args: Parameters<Actions["manualSyncInstagram"]>) => 
  rpcCall<Awaited<ReturnType<Actions["manualSyncInstagram"]>>>("src.backend.actions.AdminHome.manualSyncInstagram", ...args);
export const createInstagramPost = (...args: Parameters<Actions["createInstagramPost"]>) => 
  rpcCall<Awaited<ReturnType<Actions["createInstagramPost"]>>>("src.backend.actions.AdminHome.createInstagramPost", ...args);
export const deleteInstagramPost = (...args: Parameters<Actions["deleteInstagramPost"]>) => 
  rpcCall<Awaited<ReturnType<Actions["deleteInstagramPost"]>>>("src.backend.actions.AdminHome.deleteInstagramPost", ...args);
export const toggleCmsSection = (...args: Parameters<Actions["toggleCmsSection"]>) => 
  rpcCall<Awaited<ReturnType<Actions["toggleCmsSection"]>>>("src.backend.actions.AdminHome.toggleCmsSection", ...args);
export const updateCmsTexts = (...args: Parameters<Actions["updateCmsTexts"]>) => 
  rpcCall<Awaited<ReturnType<Actions["updateCmsTexts"]>>>("src.backend.actions.AdminHome.updateCmsTexts", ...args);
export const updateBusinessFacts = (...args: Parameters<Actions["updateBusinessFacts"]>) => 
  rpcCall<Awaited<ReturnType<Actions["updateBusinessFacts"]>>>("src.backend.actions.AdminHome.updateBusinessFacts", ...args);
export const toggleOpeningDayOpen = (...args: Parameters<Actions["toggleOpeningDayOpen"]>) => 
  rpcCall<Awaited<ReturnType<Actions["toggleOpeningDayOpen"]>>>("src.backend.actions.AdminHome.toggleOpeningDayOpen", ...args);
export const updateOpeningHourTimes = (...args: Parameters<Actions["updateOpeningHourTimes"]>) => 
  rpcCall<Awaited<ReturnType<Actions["updateOpeningHourTimes"]>>>("src.backend.actions.AdminHome.updateOpeningHourTimes", ...args);
