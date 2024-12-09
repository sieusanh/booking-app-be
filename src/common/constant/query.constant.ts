
export type ISelect = string[];

export enum FILTER_OPERATOR {
    EQUALS = 'equals',
    IS = 'is',
    CONTAINS = 'contains'
}

export type FilterOperator 
    = FILTER_OPERATOR.EQUALS 
    | FILTER_OPERATOR.IS 
    | FILTER_OPERATOR.CONTAINS;

// export interface IFilter {
//     field: string;
//     operator: FilterOperator;
//     value: unknown;
//     [key: string]: unknown;
// }

interface IRepositoryFilter {
    field: string;
    operator: FilterOperator;
    value: unknown;
}

interface IPair {
    [key: string]: unknown;
}

// export type IFilter = IRepositoryFilter | IPair;
// export type IFilter = IRepositoryFilter;

// export interface ICriteria {
//     select: ISelect;
//     filters: IFilter[];
// }


// type QueryPairs<Entity extends BaseEntity> = {
//     [key in keyof Entity]: number | string | boolean | null;
// }

export enum SortDirection {
    ASC = 'asc',
    DESC = 'desc'
}
  
export interface ISort {
    column: string;
    direction?: SortDirection;
}

export interface IFilter {
    [field: string]: unknown;
};

export interface ICriteria {
    select?: ISelect;
    filters?: IFilter[];
    sort?: ISort;
    sorts?: ISort[];
    offset?: number;
    limit?: number;
}

