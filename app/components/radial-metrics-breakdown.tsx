"use client"
import { Cell, LabelList, Pie, PieChart } from "recharts";
import { IProjectStatusUpdate } from "../interfaces/project-status-update.interface";
import { colorToHexCodeMap, greenHexCode, redHexCode, yellowHexCode, yellowHexCodeText } from "../constants";
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
        { projectId: '1', projectName: 'FEMA CIS', programName: 'FEMA', agileMetricStatus: 'green', staffingMetricStatus: 'green', modernizationMetricStatus: 'green', escalationMetricStatus: 'yellow', overallStatus: 'yellow', dateOfLastMetricStatusUpdate: new Date() },
        { projectId: '2', projectName: 'WFDSS', programName: 'Forest Service', agileMetricStatus: 'green', staffingMetricStatus: 'green', modernizationMetricStatus: 'green', escalationMetricStatus: 'yellow', overallStatus: 'yellow', dateOfLastMetricStatusUpdate: new Date() },
        { projectId: '3', projectName: 'PSAS', programName: 'USDA', agileMetricStatus: 'green', staffingMetricStatus: 'green', modernizationMetricStatus: 'yellow', escalationMetricStatus: 'green', overallStatus: 'green', dateOfLastMetricStatusUpdate: new Date() },
        { projectId: '4', projectName: 'SUDS', programName: 'Forest Service', agileMetricStatus: 'green', staffingMetricStatus: 'green', modernizationMetricStatus: 'red', escalationMetricStatus: 'red', overallStatus: 'red', dateOfLastMetricStatusUpdate: new Date() },
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
        <div style={{ 'display': 'flex', fontSize: '3rem' }}>
            <div>
                {initialData.green > 0 && <div><span style={{ color: greenHexCode}}>{initialData.green}</span> <span style={{ color: greenHexCode, fontSize: '1.8rem' }}>Healthy</span></div>}
            </div>
            <PieChart style={{marginInline: '20px'}} width={250} height={250}>
                <Pie data={displayData} dataKey="value" cx="50%" cy="50%" innerRadius={70} outerRadius={110} startAngle={45} endAngle={405}>
                    {/* <LabelList valueAccessor={renderCustomizedLabel} position={'outside'}/> */}
                    {
                        displayData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colorToHexCodeMap[entry.name as IMetricStatus ?? 'yellow']} />
                        ))
                    }</Pie>
            </PieChart>
            <div>
                {initialData.yellow > 0 && <div><span style={{ color: yellowHexCodeText}}>{initialData.yellow}</span> <span style={{ color: yellowHexCodeText, fontSize: '1.8rem' }}>Need attention</span></div>}
                {initialData.red > 0 && <div><span style={{ color: redHexCode}}>{initialData.red}</span> <span style={{ color: redHexCode, fontSize: '1.8rem' }}>Off track</span></div>}
            </div>
        </div>
    )
}
