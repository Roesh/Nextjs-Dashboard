import { Table } from "@mantine/core";
import { IProjectStatusUpdate } from "../interfaces/project-status-update.interface";

export default function ProjectMetricsTable() {
    const elements: IProjectStatusUpdate[] = [
        { projectId: '1', projectName: 'FEMA CIS', programName: 'FEMA', agileMetricStatus: 'green', staffingMetricStatus: 'green', modernizationMetricStatus: 'green', escalationMetricStatus: 'yellow', overallStatus: 'yellow', dateOfLastMetricStatusUpdate: new Date() },
        { projectId: '2', projectName: 'WFDSS', programName: 'Forest Service', agileMetricStatus: 'green', staffingMetricStatus: 'green', modernizationMetricStatus: 'green', escalationMetricStatus: 'yellow', overallStatus: 'yellow', dateOfLastMetricStatusUpdate: new Date() },
        { projectId: '3', projectName: 'PSAS', programName: 'USDA', agileMetricStatus: 'green', staffingMetricStatus: 'green', modernizationMetricStatus: 'yellow', escalationMetricStatus: 'green', overallStatus: 'green', dateOfLastMetricStatusUpdate: new Date() },
    ];

    const rows = elements.map((element) => (
        <tr key={element.projectId}>
            <td>{element.projectName}</td>
            {/* Create widget to display colored circle based on metric in addition to status, keep Section 508 in mind and leave aria label on icon rendered */}
            <td>{element.agileMetricStatus}</td>
            <td>{element.staffingMetricStatus}</td>
            <td>{element.modernizationMetricStatus}</td>
            <td>{element.escalationMetricStatus}</td>
        </tr>
    ));

    return (
        <Table>
            <thead>
                <tr>
                    <th>Project Name</th>
                    <th>Agile Metrics</th>
                    <th>Staffing</th>
                    <th>Modernization</th>
                    <th>Risks</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </Table>
    );
}