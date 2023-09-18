import { IMetricStatus } from "./interfaces/metric-status.interface"
import { IProjectStatusUpdate, ISubMetricsLiteral } from "./interfaces/project-status-update.interface"

// Colors:
export const redHexCode = '#D75553'
export const yellowHexCode = '#F68D4B'
export const yellowHexCodeText = '#F68D4B'
export const greenHexCode = '#5EBC58'
export const grayHexCode = '#D3D3D3'
export const grayTextHexCode = '#3D3D3D'

export const colorToHexCodeMap: {[key in IMetricStatus]: string}= {
    'Green': greenHexCode,
    'Yellow': yellowHexCode,
    'Red': redHexCode,
}

export const metricToSortLevelMap: {[key in IMetricStatus]: number}= {
    'Green': 30,
    'Yellow': 20,
    'Red': 10,
}
export const testProjectUpdatesArray: IProjectStatusUpdate[] = [
    { projectId: '1', projectName: 'FEMA CIS', programName: 'FEMA', agileMetricStatus: 'Green', staffingMetricStatus: 'Green', modernizationMetricStatus: 'Green', escalationMetricStatus: 'Yellow', overallStatus: 'Yellow', dateOfLastMetricStatusUpdate: new Date() },
    { projectId: '2', projectName: 'WFDSS', programName: 'Forest Service', agileMetricStatus: 'Green', staffingMetricStatus: 'Green', modernizationMetricStatus: 'Green', escalationMetricStatus: 'Yellow', overallStatus: 'Yellow', dateOfLastMetricStatusUpdate: new Date() },
    { projectId: '3', projectName: 'PSAS', programName: 'USDA', agileMetricStatus: 'Green', staffingMetricStatus: 'Green', modernizationMetricStatus: 'Yellow', escalationMetricStatus: 'Green', overallStatus: 'Green', dateOfLastMetricStatusUpdate: new Date() },
    { projectId: '4', projectName: 'SUDS', programName: 'Forest Service', agileMetricStatus: 'Green', staffingMetricStatus: 'Green', modernizationMetricStatus: 'Red', escalationMetricStatus: 'Red', overallStatus: 'Red', dateOfLastMetricStatusUpdate: new Date() },
    { projectId: '5', projectName: 'ACWS Example #1', programName: 'ACWS', agileMetricStatus: 'Green', staffingMetricStatus: 'Yellow', modernizationMetricStatus: 'Red', escalationMetricStatus: 'Red', overallStatus: 'Red', dateOfLastMetricStatusUpdate: new Date() },
    { projectId: '6', projectName: 'CON-IT Example #1', programName: 'CON-IT', agileMetricStatus: 'Green', staffingMetricStatus: 'Green', modernizationMetricStatus: 'Red', escalationMetricStatus: 'Red', overallStatus: 'Red', dateOfLastMetricStatusUpdate: new Date() },
    
    { projectId: '7', projectName: 'CONEXUS Example #1', programName: 'GSA CONEXUS', agileMetricStatus: 'Green', staffingMetricStatus: 'Red', modernizationMetricStatus: 'Red', escalationMetricStatus: 'Yellow', overallStatus: 'Green', dateOfLastMetricStatusUpdate: new Date() },
    { projectId: '8', projectName: 'NSOBS Example #1', programName: 'GSA NSOBS', agileMetricStatus: 'Green', staffingMetricStatus: 'Yellow', modernizationMetricStatus: 'Red', escalationMetricStatus: 'Yellow', overallStatus: 'Green', dateOfLastMetricStatusUpdate: new Date() },
    { projectId: '9', projectName: 'VMDI', programName: 'Infrastructure', agileMetricStatus: 'Green', staffingMetricStatus: 'Green', modernizationMetricStatus: 'Red', escalationMetricStatus: 'Red', overallStatus: 'Red', dateOfLastMetricStatusUpdate: new Date() },
    { projectId: '10', projectName: 'Jira', programName: 'Infrastructure', agileMetricStatus: 'Green', staffingMetricStatus: 'Green', modernizationMetricStatus: 'Red', escalationMetricStatus: 'Red', overallStatus: 'Red', dateOfLastMetricStatusUpdate: new Date() },
    { projectId: '11', projectName: 'Bamboo', programName: 'Infrastructure', agileMetricStatus: 'Yellow', staffingMetricStatus: 'Yellow', modernizationMetricStatus: 'Green', escalationMetricStatus: 'Yellow', overallStatus: 'Yellow', dateOfLastMetricStatusUpdate: new Date() },
    { projectId: '12', projectName: 'BitBucket', programName: 'Infrastructure', agileMetricStatus: 'Red', staffingMetricStatus: 'Green', modernizationMetricStatus: 'Green', escalationMetricStatus: 'Red', overallStatus: 'Red', dateOfLastMetricStatusUpdate: new Date() },
    { projectId: '12', projectName: 'Example Infra project', programName: 'Infrastructure', agileMetricStatus: 'Red', staffingMetricStatus: 'Green', modernizationMetricStatus: 'Green', escalationMetricStatus: 'Red', overallStatus: 'Green', dateOfLastMetricStatusUpdate: new Date() },
    { projectId: '13', projectName: 'ACWS Example #2', programName: 'ACWS', agileMetricStatus: 'Green', staffingMetricStatus: 'Yellow', modernizationMetricStatus: 'Red', escalationMetricStatus: 'Red', overallStatus: 'Red', dateOfLastMetricStatusUpdate: new Date() },
];

export const metricKeyToDisplayNameMap: {[key in ISubMetricsLiteral]: string}= {
    'agileMetricStatus': 'Agile',
    'escalationMetricStatus': 'Risk',
    'modernizationMetricStatus': 'Tech',
    'staffingMetricStatus': 'Staff'
}

