"use client"
import { Cell, LabelList, Pie, PieChart } from "recharts";
import { IProjectStatusUpdate } from "../interfaces/project-status-update.interface";
import { colorToHexCodeMap, greenHexCode, redHexCode, yellowHexCode } from "../constants";
import { useReducer } from "react";
import { IMetricStatus } from "../interfaces/metric-status.interface";


const renderCustomizedLabel = (props: any) => {
    // const { x, y, width, height, name, value } = props;
    // const radius = 10;
    console.log(props.payload, "pps")
    if (props.payload?.value === 0) {
        return ""
    }

    return (`${props.payload?.value} ${props.payload?.name}`);
};

export default function RadialMetricsTable() {
    const projectStatuses: IProjectStatusUpdate[] = [
        { projectId: '1', projectName: 'FEMA CIS', agileMetricStatus: 'green', staffingMetricStatus: 'green', modernizationMetricStatus: 'green', escalationMetricStatus: 'yellow', overallStatus: 'yellow', dateOfLastMetricStatusUpdate: new Date() },
        { projectId: '2', projectName: 'WFDSS', agileMetricStatus: 'green', staffingMetricStatus: 'green', modernizationMetricStatus: 'green', escalationMetricStatus: 'yellow', overallStatus: 'yellow', dateOfLastMetricStatusUpdate: new Date() },
        { projectId: '3', projectName: 'PSAS', agileMetricStatus: 'green', staffingMetricStatus: 'green', modernizationMetricStatus: 'yellow', escalationMetricStatus: 'green', overallStatus: 'green', dateOfLastMetricStatusUpdate: new Date() },
        { projectId: '3', projectName: 'SUDS', agileMetricStatus: 'green', staffingMetricStatus: 'green', modernizationMetricStatus: 'red', escalationMetricStatus: 'red', overallStatus: 'red', dateOfLastMetricStatusUpdate: new Date() },
    ];

    // const displayData: any[] = []
    const initialData: { [key in IMetricStatus]: number } = { green: 0, yellow: 0, red: 0 }

    const statusBreakdown = projectStatuses.reduce(((prev, current) => {
        prev[current.overallStatus]++
        return prev
    }), initialData)

    const displayData = Object.entries(statusBreakdown).map((entry) => {
        return ({
            name: entry[0],
            value: entry[1]
        })
    })

    return (
        <div style={{ 'display': 'flex' }}>
            <div>
                {initialData.green > 0 && <h2>{initialData.green} <span style={{ color: greenHexCode }}>Healthy</span></h2>}
                {initialData.yellow > 0 && <h2>{initialData.yellow} <span style={{ color: yellowHexCodeText }}>Need attention</span></h2>}
                {initialData.red > 0 && <h2>{initialData.red} <span style={{ color: redHexCode }}>Off track</span></h2>}
            </div>
            <PieChart width={250} height={250}>
                <Pie data={displayData} dataKey="value" cx="50%" cy="50%" outerRadius={110}>
                    {/* <LabelList valueAccessor={renderCustomizedLabel} position={'outside'}/> */}
                    {
                        displayData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colorToHexCodeMap[entry.name as IMetricStatus ?? 'yellow']} />
                        ))
                    }</Pie>
            </PieChart>
        </div>
    )
}
