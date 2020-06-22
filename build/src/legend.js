import { keys } from './util';
export const LEGEND_SCALE_CHANNELS = [
    'size',
    'shape',
    'fill',
    'stroke',
    'strokeDash',
    'strokeWidth',
    'opacity'
];
export const SIGNAL_LEGEND_PROP_INDEX = {
    fillColor: {
        part: 'legend',
        vgProp: 'fill'
    },
    gradientStrokeColor: {
        part: 'gradient',
        vgProp: 'stroke'
    },
    labelColor: {
        part: 'labels',
        vgProp: 'fill'
    },
    strokeColor: {
        part: 'legend',
        vgProp: 'stroke'
    },
    symbolFillColor: {
        part: 'symbols',
        vgProp: 'fill'
    },
    symbolStrokeColor: {
        part: 'symbols',
        vgProp: 'stroke'
    },
    titleColor: {
        part: 'title',
        vgProp: 'fill'
    }
};
export const defaultLegendConfig = {
    gradientHorizontalMaxLength: 200,
    gradientHorizontalMinLength: 100,
    gradientVerticalMaxLength: 200,
    gradientVerticalMinLength: 64,
    unselectedOpacity: 0.35
};
export const COMMON_LEGEND_PROPERTY_INDEX = {
    aria: 1,
    clipHeight: 1,
    columnPadding: 1,
    columns: 1,
    cornerRadius: 1,
    description: 1,
    direction: 1,
    fillColor: 1,
    format: 1,
    formatType: 1,
    gradientLength: 1,
    gradientOpacity: 1,
    gradientStrokeColor: 1,
    gradientStrokeWidth: 1,
    gradientThickness: 1,
    gridAlign: 1,
    labelAlign: 1,
    labelBaseline: 1,
    labelColor: 1,
    labelFont: 1,
    labelFontSize: 1,
    labelFontStyle: 1,
    labelFontWeight: 1,
    labelLimit: 1,
    labelOffset: 1,
    labelOpacity: 1,
    labelOverlap: 1,
    labelPadding: 1,
    labelSeparation: 1,
    legendX: 1,
    legendY: 1,
    offset: 1,
    orient: 1,
    padding: 1,
    rowPadding: 1,
    strokeColor: 1,
    symbolDash: 1,
    symbolDashOffset: 1,
    symbolFillColor: 1,
    symbolLimit: 1,
    symbolOffset: 1,
    symbolOpacity: 1,
    symbolSize: 1,
    symbolStrokeColor: 1,
    symbolStrokeWidth: 1,
    symbolType: 1,
    tickCount: 1,
    tickMinStep: 1,
    title: 1,
    titleAlign: 1,
    titleAnchor: 1,
    titleBaseline: 1,
    titleColor: 1,
    titleFont: 1,
    titleFontSize: 1,
    titleFontStyle: 1,
    titleFontWeight: 1,
    titleLimit: 1,
    titleLineHeight: 1,
    titleOpacity: 1,
    titleOrient: 1,
    titlePadding: 1,
    type: 1,
    values: 1,
    zindex: 1
};
export const LEGEND_PROPERTIES = keys(COMMON_LEGEND_PROPERTY_INDEX);
//# sourceMappingURL=legend.js.map