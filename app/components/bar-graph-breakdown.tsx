"use client"
import { Bar, BarChart, CartesianGrid, Cell, LabelList, Legend, Pie, PieChart, Tooltip, XAxis, YAxis } from "recharts";
import { IProjectStatusUpdate } from "../interfaces/project-status-update.interface";
import { colorToHexCodeMap, greenHexCode, redHexCode, yellowHexCode, yellowHexCodeText } from "../constants";
import { useReducer } from "react";
import { IMetricStatus } from "../interfaces/metric-status.interface";


export default function BarGraphBreakdown() {
    const projectStatuses: IProjectStatusUpdate[] = [
        { projectId: '1', projectName: 'FEMA CIS', programName: 'FEMA', agileMetricStatus: 'green', staffingMetricStatus: 'green', modernizationMetricStatus: 'green', escalationMetricStatus: 'yellow', overallStatus: 'yellow', dateOfLastMetricStatusUpdate: new Date() },
        { projectId: '2', projectName: 'WFDSS', programName: 'Forest Service', agileMetricStatus: 'green', staffingMetricStatus: 'green', modernizationMetricStatus: 'green', escalationMetricStatus: 'yellow', overallStatus: 'yellow', dateOfLastMetricStatusUpdate: new Date() },
        { projectId: '3', projectName: 'PSAS', programName: 'USDA', agileMetricStatus: 'green', staffingMetricStatus: 'green', modernizationMetricStatus: 'yellow', escalationMetricStatus: 'green', overallStatus: 'green', dateOfLastMetricStatusUpdate: new Date() },
        { projectId: '4', projectName: 'SUDS', programName: 'Forest Service', agileMetricStatus: 'green', staffingMetricStatus: 'green', modernizationMetricStatus: 'red', escalationMetricStatus: 'red', overallStatus: 'red', dateOfLastMetricStatusUpdate: new Date() },
    ];


    const emptyObject:any = {}
    let overAll
    // const displayData: any[] = []
    const statusBreakdown: { [key in string]: {[key in IMetricStatus]: number} } = projectStatuses.reduce((prev, current) => {
        if(current.programName !== undefined && current.programName?.length > 0){
            //@ts-ignore
            if(prev[current.programName] === undefined){
                prev[current.programName] = {}
            }
            overAll = prev[current.programName][current.overallStatus]
            if(overAll !== undefined){
                overAll++
            }else {
                prev[current.programName][current.overallStatus] = 1
            }
        }else {
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
            green: entry[1].green,
            yellow: entry[1].yellow,
            red: entry[1].red,
        })
    })
    console.log(displayData, "init d")

    return (
        <div>
            <BarChart width={750} height={250} layout={'horizontal'} data={displayData}>
                <CartesianGrid strokeDasharray="3 3" />
                <YAxis />
                <XAxis  dataKey="name"/>
                <Tooltip />
                <Legend />
                <Bar dataKey="green" stackId="a" fill={greenHexCode} />
                <Bar dataKey="yellow" stackId="a" fill={yellowHexCode} />
                <Bar dataKey="red" stackId="a" fill={redHexCode} />
            </BarChart>
        </div>
    )
}
