import {
    PageNumberCounters,
    PageNumberPagination,
} from 'prisma-extension-pagination/dist/types';

export class PaginationMeta {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;

    constructor(
        data: PageNumberPagination & PageNumberCounters,
        perPage: number,
    ) {
        this.current_page = data.currentPage;
        this.last_page = data.pageCount == 0 ? 1 : data.pageCount;
        this.per_page = perPage;
        this.total = data.totalCount;
    }
}

export interface IPaginationRequest {
    page?: number;
    limit?: number;
}
