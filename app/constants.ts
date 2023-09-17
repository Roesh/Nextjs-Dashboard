import { IMetricStatus } from "./interfaces/metric-status.interface"

// Colors:
export const redHexCode = '#D75553'
export const yellowHexCode = '#F68D4B'
export const yellowHexCodeText = '#F68D4B'
export const greenHexCode = '#5EBC58'

export const colorToHexCodeMap: {[key in IMetricStatus]: string}= {
    'green': greenHexCode,
    'yellow': yellowHexCode,
    'red': redHexCode
}