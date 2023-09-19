import { IProjectStatusUpdate } from "./project-status-update.interface";

export interface IWeeklyUpdate {
    kudos: string,
    dateOfUpdate: Date
    projectUpdates: IProjectStatusUpdate[],
    previousWeeklyUpdate?: IWeeklyUpdate
    nextWeeklyUpdate?: IWeeklyUpdate
}