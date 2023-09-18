"use client"
import { Bar, BarChart, CartesianGrid, Cell, LabelList, Legend, Pie, PieChart, Tooltip, XAxis, YAxis } from "recharts";
import { IProjectStatusUpdate } from "../interfaces/project-status-update.interface";
import { colorToHexCodeMap, greenHexCode, redHexCode, testProjectUpdatesArray, yellowHexCode, yellowHexCodeText } from "../constants";
import { useReducer } from "react";
import { IMetricStatus } from "../interfaces/metric-status.interface";


export default function BarGraphBreakdown() {
    const projectStatuses: IProjectStatusUpdate[] = testProjectUpdatesArray;


    const emptyObject: any = {}
    let overAll
    // const displayData: any[] = []
    const statusBreakdown: { [key in string]: { [key in IMetricStatus]: number } } = projectStatuses.reduce((prev, current) => {
        if (current.programName !== undefined && current.programName?.length > 0) {
            //@ts-ignore
            if (prev[current.programName] === undefined) {
                prev[current.programName] = {}
            }
            overAll = prev[current.programName][current.overallStatus]
            if (overAll !== undefined) {
                overAll++
            } else {
                prev[current.programName][current.overallStatus] = 1
            }
        } else {
            prev.other = {}
        }
        return prev
    }, emptyObject)


    // const statusBreakdown = projectStatuses.reduce(((prev, current) => {
    //     prev[current.overallStatus]++
    //     return prev
    // }), emptyObject)

    const displayData = Object.entries(statusBreakdown).map((entry) => {
        return ({
            name: entry[0],
            green: entry[1].Green,
            yellow: entry[1].Yellow,
            red: entry[1].Red,
        })
    })
    console.log(displayData, "init d")

    return (
        // https://github.com/recharts/recharts/issues/1618
        <div>
            <BarChart width={800} height={250} layout={'horizontal'} data={displayData} {...{
                overflow: 'visible'
            }}>
                <YAxis type="number" hide/>
                <XAxis  type="category" dataKey="name" angle={-45} textAnchor="end" />
                <Bar dataKey="green" stackId="a" fill={greenHexCode} />
                <Bar dataKey="yellow" stackId="a" fill={yellowHexCode} />
                <Bar dataKey="red" stackId="a" fill={redHexCode} />
            </BarChart>
        </div>
    )
}
