/**
 * 本端无登录/鉴权，仅保留 withResult 包装器
 */
export declare function withResult<TArgs extends any[], TData>(
  fn: (...args: TArgs) => Promise<TData>
): (...args: TArgs) => Promise<TData>
