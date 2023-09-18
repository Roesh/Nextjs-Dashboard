import { MRT_SortingFn } from "mantine-react-table";
import {
  IProjectStatusUpdate,
  ISubMetricsLiteral,
} from "../interfaces/project-status-update.interface";
import { IMetricStatus } from "../interfaces/metric-status.interface";
import { metricToSortLevelMap } from "../constants";

export const healthSortingFunction: MRT_SortingFn<IProjectStatusUpdate> = (
  rowA,
  rowB,
  columnId
) => {
  const valueA = rowA.original[columnId as ISubMetricsLiteral];
  const valueB = rowB.original[columnId as ISubMetricsLiteral];

  return metricToSortLevelMap[valueA] - metricToSortLevelMap[valueB];
};
