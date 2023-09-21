"use client";
import { Box, Button, Table } from "@mantine/core";
import { IProjectStatusUpdate } from "../interfaces/project-status-update.interface";
import { colorToHexCodeMap, weeklyUpdates } from "../constants";
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
import { IWeeklyUpdate } from "../interfaces/weekly-update.interface";

const elements = weeklyUpdates[0].projectUpdates;

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
          fill={
            colorToHexCodeMap[cell.getValue<string>() as IMetricStatusLiteral]
          }
        >
          <circle cx="8" cy="8" r="8" />
          {/* <path fill="#ffffff" d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.553.553 0 0 1-1.1 0L7.1 4.995z"/> */}
        </svg>
      </div>
    );
  },
};

export const ProjectMetricsTable: React.FC<{
  weeklyUpdate: IWeeklyUpdate;
}> = ({weeklyUpdate}) => {
  const data = useMemo(() => weeklyUpdate.projectUpdates, [weeklyUpdate]);

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
                  colorToHexCodeMap[
                    cell.getValue<string>() as IMetricStatusLiteral
                  ]
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
      {
        accessorKey: "contact",
        header: "Primary Contact",
        enableSorting: false,
        enableColumnActions: false,
        enableClickToCopy: true,
        Cell: ({ cell }) => (
          // <a href={`mailto:${cell.getValue<string>()}`}>
            <>{cell.getValue<string>()}</>
          // </a>
        ),
      },
    ],
    []
  );

  const table = useMantineReactTable<IProjectStatusUpdate>({
    columns,
    data,
    initialState: {
      columnVisibility: {
        projectId: false,
      },
      sorting: [
        {
          id: "overallStatus", 
          desc: false,
        },
      ],
      density: 'xs'
    },
    enableRowSelection: true, //enable some features
    enableGlobalFilter: false, //turn off a feature
    renderTopToolbarCustomActions: ({ table }) => (
      <Box
        style={{
          display: "flex",
          alignItems: 'center',
          gap: "16px",
          padding: "8px",
          flexWrap: "wrap",
        }}
      >        
        <h2 style={{marginTop: 0, marginBottom: 0}}>Project Metrics</h2>
        <Button
          disabled={table.getPrePaginationRowModel().rows.length === 0}
          //export all rows, including from the next page, (still respects filtering and sorting)
          onClick={() =>
            handleExportRows(table.getPrePaginationRowModel().rows)
          }
          leftIcon={<IconDownload />}
          variant="filled"
          style={{display: 'flex', marginLeft: 'auto'}}
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

  /** This needs a refactor before going into the non-mockup stage
   * Right now the order of rendering is determined by Object.values, but we may need to
   * specify it manually because the keys aren't always guarnated. One of them is optional
   */
  const handleExportRows = (rows: MRT_Row<IProjectStatusUpdate>[]) => {
    const doc = new jsPDF();

    let pdfRowData;
    let program;
    const tableData = rows.map((row) => {
      pdfRowData = { ...row.original };
      //@ts-ignore
      delete pdfRowData.projectId;

      program = pdfRowData.programName;
      //@ts-ignore
      delete pdfRowData.programName;
      delete pdfRowData.projectUpdateNotes;
      //@ts-ignore
      delete pdfRowData.contact;
      pdfRowData.programName = program;

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
