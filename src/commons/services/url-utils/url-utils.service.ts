import { Injectable } from '@nestjs/common';
import { Pagination } from 'src/commons/types/pagination';

@Injectable()
export class UrlUtilsService {
  constructor() {}

  async GetCriteriaAndPagination<T>(query: T & Pagination): Promise<{
    criteria: T;
    pagination: Pagination;
  }> {
    const { limit, page, ...criteria } = query;
    return {
      criteria: criteria as T,
      pagination: {
        limit: limit || 10,
        page: page || 0,
      },
    };
  }
}
