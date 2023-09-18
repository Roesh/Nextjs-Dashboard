"use client";
import { Box, Button, Table } from "@mantine/core";
import { IProjectStatusUpdate } from "../interfaces/project-status-update.interface";
import { colorToHexCodeMap, testProjectUpdatesArray } from "../constants";
import { useMemo } from "react";
import {
  MRT_Cell,
  MRT_ColumnDef,
  MRT_Row,
  MantineReactTable,
  useMantineReactTable,
} from "mantine-react-table";
import { IMetricStatusLiteral } from "../interfaces/metric-status.interface";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { IconDownload } from "@tabler/icons-react";
import { healthSortingFunction } from "../utils/health-sorting-function";

const elements = testProjectUpdatesArray;

const healthColumnOptions: Partial<MRT_ColumnDef<IProjectStatusUpdate>> = {
  maxSize: 50,
  enableColumnActions: false,
  enableColumnDragging: false,
  filterVariant: "multi-select",
  mantineFilterMultiSelectProps: { data: ["Green", "Yellow", "Red"] },
  sortingFn: healthSortingFunction,
  Cell: ({ cell }: { cell: MRT_Cell<IProjectStatusUpdate> }) => {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
          fill={colorToHexCodeMap[cell.getValue<string>() as IMetricStatusLiteral]}
        >
          <circle cx="8" cy="8" r="8" />
        </svg>
      </div>
    );
  },
};

export default function ProjectMetricsTable() {
  const data = useMemo(() => elements, []);

  const columns = useMemo<MRT_ColumnDef<IProjectStatusUpdate>[]>(
    () => [
      {
        accessorKey: "projectId",
        header: "Id",
      },
      {
        accessorKey: "projectName",
        header: "Project",
        filterVariant: "autocomplete",
      },
      {
        ...healthColumnOptions,
        Cell: ({ cell }: { cell: MRT_Cell<IProjectStatusUpdate> }) => {
          return (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
                fill={
                  colorToHexCodeMap[cell.getValue<string>() as IMetricStatusLiteral]
                }
              >
                <circle cx="8" cy="8" r="8" />
              </svg>
            </div>
          );
        },
        accessorKey: "overallStatus",
        header: "Health",
      },
      {
        ...healthColumnOptions,
        accessorKey: "agileMetricStatus",
        header: "Agile",
      },
      {
        ...healthColumnOptions,
        accessorKey: "staffingMetricStatus",
        header: "Staff",
      },
      {
        ...healthColumnOptions,
        accessorKey: "modernizationMetricStatus",
        header: "Tech",
      },
      {
        ...healthColumnOptions,
        accessorKey: "escalationMetricStatus",
        header: "Risk",
      },
      {
        accessorKey: "dateOfLastMetricStatusUpdate",
        header: "Last Updated",
        enableSorting: false,
        enableColumnActions: false,
        Cell: ({ cell }) => cell.getValue<Date>().toDateString(),
      },
      {
        accessorKey: "programName",
        header: "Program",
      },
    ],
    []
  );

  const table = useMantineReactTable({
    columns,
    data,
    initialState: {
      columnVisibility: {
        projectId: false,
      },
    },
    enableRowSelection: true, //enable some features
    enableGlobalFilter: false, //turn off a feature
    renderTopToolbarCustomActions: ({ table }) => (
      <Box
        sx={{
          display: "flex",
          gap: "16px",
          padding: "8px",
          flexWrap: "wrap",
        }}
      >
        <Button
          disabled={table.getPrePaginationRowModel().rows.length === 0}
          //export all rows, including from the next page, (still respects filtering and sorting)
          onClick={() =>
            handleExportRows(table.getPrePaginationRowModel().rows)
          }
          leftIcon={<IconDownload />}
          variant="filled"
        >
          Export All Rows
        </Button>
        <Button
          disabled={
            !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
          }
          //only export selected rows
          onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
          leftIcon={<IconDownload />}
          variant="filled"
        >
          Export Selected Rows
        </Button>
      </Box>
    ),
  });

  const handleExportRows = (rows: MRT_Row<IProjectStatusUpdate>[]) => {
    const doc = new jsPDF();

    let pdfRowData;

    const tableData = rows.map((row) => {
      pdfRowData = { ...row.original };
      //@ts-ignore
      delete pdfRowData.projectId;
      //@ts-ignore
      pdfRowData.dateOfLastMetricStatusUpdate =
        pdfRowData.dateOfLastMetricStatusUpdate.toDateString();
      return Object.values(pdfRowData);
    });

    const newHeader = [...columns];
    newHeader.shift();
    const tableHeaders = newHeader.map((c) => c.header);

    autoTable(doc, {
      head: [tableHeaders],
      //@ts-ignore
      body: tableData,
    });

    doc.save("exec-dashboard-metrics.pdf");
  };

  return (
    // <MantineReactTable table={table} initialState={{ columnVisibility: { projectId: false } }} />
    <div style={{ marginBottom: "5rem" }}>
      <MantineReactTable table={table} />
    </div>
  );
}
