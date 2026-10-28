/**
 * Kus Koláče — Backend Route Parameters & Navigation Tools
 *
 * Tento soubor definuje centralizovanou správu navigačních tras, parametrů
 * a přechodů pro administrační část webu pekárny Kus Koláče.
 */

import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export interface ParamMeta {
  source_table: string;
  source_column: string;
  description: string;
}

export function buildUrl(path: string, params: Record<string, string>): string {
  const sp = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v) sp.set(k, v);
  });
  const query = sp.toString();
  return query ? `${path}?${query}` : path;
}

// ================================================================
// B01 Přihlášení do administrace — 无入参
// ================================================================
export const AdminLogin = {
  id: 'B01',
  path: '/adminlogin',
  paramsMeta: {} as Record<string, ParamMeta>,
  getParams: (_sp: URLSearchParams) => ({}),
  navigateTo: (router: AppRouterInstance) => router.push(AdminLogin.path),
};

// ================================================================
// B02 Registrace správce — 无入参
// ================================================================
export const AdminRegister = {
  id: 'B02',
  path: '/adminregister',
  paramsMeta: {} as Record<string, ParamMeta>,
  getParams: (_sp: URLSearchParams) => ({}),
  navigateTo: (router: AppRouterInstance) => router.push(AdminRegister.path),
};

// ================================================================
// B03 Přehled a diagnostika systému — 无入参
// ================================================================
export const AdminHome = {
  id: 'B03',
  path: '/adminhome',
  paramsMeta: {} as Record<string, ParamMeta>,
  getParams: (_sp: URLSearchParams) => ({}),
  navigateTo: (router: AppRouterInstance) => router.push(AdminHome.path),
};

// ================================================================
// B04 Správa vitríny pečiva — 无入参
// ================================================================
export const AdminPastryShowcase = {
  id: 'B04',
  path: '/adminpastryshowcase',
  paramsMeta: {} as Record<string, ParamMeta>,
  getParams: (_sp: URLSearchParams) => ({}),
  navigateTo: (router: AppRouterInstance) => router.push(AdminPastryShowcase.path),
};

// ================================================================
// B06 Provozní údaje a otevírací doba — 无入参
// ================================================================
export const AdminBusinessFacts = {
  id: 'B06',
  path: '/adminbusinessfacts',
  paramsMeta: {} as Record<string, ParamMeta>,
  getParams: (_sp: URLSearchParams) => ({}),
  navigateTo: (router: AppRouterInstance) => router.push(AdminBusinessFacts.path),
};

// ================================================================
// B07 Správa sekcí a textů webu — 无入参
// ================================================================
export const AdminCmsSections = {
  id: 'B07',
  path: '/admincmssections',
  paramsMeta: {} as Record<string, ParamMeta>,
  getParams: (_sp: URLSearchParams) => ({}),
  navigateTo: (router: AppRouterInstance) => router.push(AdminCmsSections.path),
};

// ================================================================
// B08 Správa Instagram integrace — 无入参
// ================================================================
export const AdminInstagramIntegration = {
  id: 'B08',
  path: '/admininstagramintegration',
  paramsMeta: {} as Record<string, ParamMeta>,
  getParams: (_sp: URLSearchParams) => ({}),
  navigateTo: (router: AppRouterInstance) => router.push(AdminInstagramIntegration.path),
};

// ================================================================
// end
// ================================================================

export const BackendRoutes = {
  AdminLogin,
  AdminRegister,
  AdminHome,
  AdminPastryShowcase,
  AdminBusinessFacts,
  AdminCmsSections,
  AdminInstagramIntegration,
} as const;

export const NAVIGATION_MAP: Record<string, string[]> = {
  B01: ['B02', 'B03'],
  B02: ['B01'],
  B03: [],
  B04: [],
  B06: [],
  B07: [],
  B08: [],
};

export const PAGE_ID_MAP: Record<string, string> = {
  B01: 'AdminLogin',
  B02: 'AdminRegister',
  B03: 'AdminHome',
  B04: 'AdminPastryShowcase',
  B06: 'AdminBusinessFacts',
  B07: 'AdminCmsSections',
  B08: 'AdminInstagramIntegration',
};

/**
 * 传入页面 ID 或名称，从本文件源码中提取：当前页面 + 其所有跳转目标的 export const 代码块。
 * 支持 ID（F10）或名称（PaperCompose / papercompose），大小写不敏感。
 */
export function getRouteContextText(
  pageIdOrName: string,
  fileContent: string
): string {
  let pageId = pageIdOrName
  let currentName = PAGE_ID_MAP[pageId]

  if (!currentName) {
    const lowerInput = pageIdOrName.toLowerCase()
    const entry = Object.entries(PAGE_ID_MAP).find(
      ([, name]) => name.toLowerCase() === lowerInput
    )
    if (entry) {
      pageId = entry[0]
      currentName = entry[1]
    }
  }

  if (!currentName) return `// 错误：未找到页面 ${pageIdOrName}`

  const targetIds = NAVIGATION_MAP[pageId] || []
  const targetNames = targetIds.map((id) => PAGE_ID_MAP[id]).filter(Boolean)

  const lines = fileContent.split('\n')
  const blocks: Record<string, string> = {}
  let currentBlock: string[] = []
  let currentBlockName = ''

  for (const line of lines) {
    if (line.startsWith('// ====')) {
      if (currentBlockName && currentBlock.length > 0) {
        blocks[currentBlockName] = currentBlock.join('\n').trim()
      }
      currentBlock = [line]
      currentBlockName = ''
      continue
    }
    const exportMatch = line.match(/^export const (\w+)\s*=/)
    if (exportMatch && !currentBlockName) {
      currentBlockName = exportMatch[1]
    }
    currentBlock.push(line)
  }
  if (currentBlockName && currentBlock.length > 0) {
    blocks[currentBlockName] = currentBlock.join('\n').trim()
  }

  function getBlock(name: string): string {
    return blocks[name] || `// 未找到 ${name} 的定义`
  }

  const parts: string[] = []
  parts.push('// ★★★ 当前页面 ★★★')
  parts.push(getBlock(currentName))
  if (targetNames.length > 0) {
    parts.push('// ★★★ 跳转目标页面（当前页面会 navigateTo 以下页面）★★★')
    for (const name of targetNames) {
      parts.push(getBlock(name))
    }
  }
  return parts.join('\n\n')
}
