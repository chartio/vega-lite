import { Axis as VgAxis, SignalRef, Text } from 'vega';
import { Axis, AxisPart, AxisPropsWithConditionAndSignal, ConditionalAxisProp, SignalAxisProp } from '../../axis';
import { FieldDefBase } from '../../channeldef';
import { Split } from '../split';
export declare type AxisComponentProps = Omit<VgAxis, 'title' | ConditionalAxisProp | SignalAxisProp> & Omit<AxisPropsWithConditionAndSignal, 'title'> & {
    title: Text | FieldDefBase<string>[] | SignalRef;
    labelExpr: string;
    disable: boolean;
};
export declare const AXIS_COMPONENT_PROPERTIES: ("description" | "values" | "title" | "labelAlign" | "labelBaseline" | "labelColor" | "labelFont" | "labelFontSize" | "labelFontStyle" | "labelFontWeight" | "labelOpacity" | "labelOffset" | "labelPadding" | "gridColor" | "gridDash" | "gridDashOffset" | "gridOpacity" | "gridWidth" | "tickColor" | "tickDash" | "tickDashOffset" | "tickOpacity" | "tickSize" | "tickWidth" | "domainColor" | "titleColor" | "orient" | "scale" | "gridScale" | "format" | "formatType" | "offset" | "position" | "tickCount" | "tickMinStep" | "encode" | "translate" | "minExtent" | "maxExtent" | "bandPosition" | "aria" | "titlePadding" | "titleAlign" | "titleAnchor" | "titleAngle" | "titleX" | "titleY" | "titleBaseline" | "titleFont" | "titleFontSize" | "titleFontStyle" | "titleFontWeight" | "titleLimit" | "titleLineHeight" | "titleOpacity" | "domain" | "domainCap" | "domainDash" | "domainDashOffset" | "domainOpacity" | "domainWidth" | "ticks" | "tickBand" | "tickCap" | "tickExtra" | "tickOffset" | "tickRound" | "grid" | "gridCap" | "labels" | "labelBound" | "labelFlush" | "labelFlushOffset" | "labelLineHeight" | "labelOverlap" | "labelSeparation" | "labelAngle" | "labelLimit" | "zindex" | "labelExpr" | "disable")[];
export declare class AxisComponent extends Split<AxisComponentProps> {
    readonly explicit: Partial<AxisComponentProps>;
    readonly implicit: Partial<AxisComponentProps>;
    mainExtracted: boolean;
    constructor(explicit?: Partial<AxisComponentProps>, implicit?: Partial<AxisComponentProps>, mainExtracted?: boolean);
    clone(): AxisComponent;
    hasAxisPart(part: AxisPart): boolean;
    hasOrientSignalRef(): boolean;
}
export interface AxisComponentIndex {
    x?: AxisComponent[];
    y?: AxisComponent[];
}
export interface AxisIndex {
    x?: Axis;
    y?: Axis;
}
//# sourceMappingURL=component.d.ts.map