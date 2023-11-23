export interface IGetClassWiseAnalytics {
    data: Array<DataRecord>;
    type: string;
}

export type DataRecord = Record<string,any>;

export interface TableProps {
    type: string;
}