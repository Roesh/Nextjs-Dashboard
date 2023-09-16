import { IMetricStatus } from "./metric-status.interface";

/** Combines multiple tables if needed. Can use Nosql to keep data duplicated */
export interface IProjectStatusUpdate {
    projectId: string,
    projectName: string,

    agileMetricStatus: IMetricStatus,
    staffingMetricStatus: IMetricStatus,
    modernizationMetricStatus: IMetricStatus,
    escalationMetricStatus: IMetricStatus,
    overallStatus: IMetricStatus,
    
    dateOfLastMetricStatusUpdate: Date
}
