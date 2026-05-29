export interface PaginationParams {
  page: number;
  pageSize: number;
  from: number;
  to: number;
}

export function getPaginationParams(searchParams: URLSearchParams): PaginationParams {
  const rawPage = Number(searchParams.get('page') ?? '1');
  const rawPageSize = Number(searchParams.get('pageSize') ?? '25');

  const page = Number.isFinite(rawPage) && rawPage > 0 ? Math.floor(rawPage) : 1;
  const pageSize = Number.isFinite(rawPageSize) && rawPageSize > 0 ? Math.min(Math.floor(rawPageSize), 100) : 25;
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  return { page, pageSize, from, to };
}

export function paginationMeta(page: number, pageSize: number, total?: number | null) {
  const totalPages = total ? Math.ceil(total / pageSize) : null;
  return {
    page,
    pageSize,
    total: total ?? null,
    totalPages
  };
}
