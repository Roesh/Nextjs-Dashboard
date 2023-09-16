import { IMetricStatus } from "./interfaces/metric-status.interface"

// Colors:
export const redHexCode = '#D2222D'
export const yellowHexCode = '#FFBF00'
export const yellowHexCodeText = '##8E6C06'
export const greenHexCode = '#007000'

export const colorToHexCodeMap: {[key in IMetricStatus]: string}= {
    'green': greenHexCode,
    'yellow': yellowHexCode,
    'red': redHexCode
}