import { AggregateOp, BandScale, BaseScale, BinOrdinalScale, ColorValueRef, Compare as VgCompare, ExprRef as VgExprRef, GeoShapeTransform as VgGeoShapeTransform, IdentityScale, LayoutAlign, LinearScale, LogScale, NumericValueRef, OrdinalScale, PointScale, PowScale, ProjectionType, QuantileScale, QuantizeScale, RangeBand, RangeRaw, RangeScheme, ScaleData, ScaleDataRef, ScaledValueRef, ScaleMultiDataRef, ScaleMultiFieldsRef, SequentialScale, SignalRef, SortField as VgSortField, SqrtScale, SymLogScale, ThresholdScale, TimeInterval, TimeIntervalStep, TimeScale, Title as VgTitle, Transforms as VgTransform, UnionSortField as VgUnionSortField, Mark } from 'vega';
import { Value } from './channeldef';
import { SortOrder } from './sort';
import { Flag, Dict } from './util';
export { VgSortField, VgUnionSortField, VgCompare, VgTitle, LayoutAlign, ProjectionType, VgExprRef };
declare type ExcludeMapped<T, E> = {
    [P in keyof T]: Exclude<T[P], E>;
};
declare type ExcludeMappedButKeepSignals<T, E> = {
    [P in keyof T]: SignalRef extends T[P] ? Exclude<T[P], E> | SignalRef : Exclude<T[P], E>;
};
export declare type ExcludeMappedValueRef<T> = ExcludeMapped<T, ScaledValueRef<any> | NumericValueRef | ColorValueRef>;
export declare type ExcludeMappedValueRefButKeepSignal<T> = ExcludeMappedButKeepSignals<T, ScaledValueRef<any> | NumericValueRef | ColorValueRef>;
export interface VgData {
    name: string;
    source?: string;
    values?: any;
    format?: {
        type?: string;
        parse?: string | Dict<unknown>;
        property?: string;
        feature?: string;
        mesh?: string;
    };
    url?: string;
    transform?: VgTransform[];
}
export declare type VgScaleDataRefWithSort = ScaleDataRef & {
    sort?: VgSortField;
};
export declare function isSignalRef(o: any): o is SignalRef;
export interface VgValueRef {
    value?: Value | number[];
    field?: string | {
        datum?: string;
        group?: string;
        parent?: string;
    };
    signal?: string;
    scale?: string;
    mult?: number;
    offset?: number | VgValueRef;
    band?: boolean | number | VgValueRef;
    test?: string;
}
export declare type VgScaleMultiDataRefWithSort = ScaleMultiDataRef & {
    fields: (any[] | VgScaleDataRefWithSort | SignalRef)[];
    sort?: VgUnionSortField;
};
export declare type VgMultiFieldsRefWithSort = ScaleMultiFieldsRef & {
    sort?: VgUnionSortField;
};
export declare type VgRange = RangeScheme | ScaleData | RangeBand | RangeRaw;
export declare function isVgRangeStep(range: VgRange): range is VgRangeStep;
export interface VgRangeStep {
    step: number | SignalRef;
}
export declare type VgNonUnionDomain = (null | string | number | boolean | SignalRef)[] | VgScaleDataRefWithSort | SignalRef;
export declare type VgDomain = BaseScale['domain'];
export declare type VgMarkGroup = any;
/**
 * A combined type for any Vega scales that Vega-Lite can generate
 */
export declare type VgScale = Pick<BaseScale, 'type'> & {
    range?: RangeScheme | RangeBand | ScaleData;
    nice?: boolean | number | TimeInterval | TimeIntervalStep | SignalRef;
    zero?: boolean | SignalRef;
} & Omit<Omit<LinearScale, 'type'> & Omit<LogScale, 'type'> & Omit<SymLogScale, 'type'> & Omit<Partial<PowScale>, 'type'> & // use partial so exponent is not required
Omit<SqrtScale, 'type'> & Omit<IdentityScale, 'type'> & Omit<TimeScale, 'type'> & Omit<QuantileScale, 'type'> & Omit<QuantizeScale, 'type'> & Omit<ThresholdScale, 'type'> & Omit<BinOrdinalScale, 'type'> & Omit<SequentialScale, 'type'> & Omit<BandScale, 'type'> & Omit<PointScale, 'type'> & Omit<OrdinalScale, 'type'>, 'range' | 'nice' | 'zero'>;
export interface RowCol<T> {
    row?: T;
    column?: T;
}
export interface VgLayout {
    center?: boolean | RowCol<boolean>;
    padding?: number | RowCol<number>;
    headerBand?: number | RowCol<number>;
    footerBand?: number | RowCol<number>;
    titleAnchor?: 'start' | 'end' | RowCol<'start' | 'end'>;
    offset?: number | {
        rowHeader?: number;
        rowFooter?: number;
        rowTitle?: number;
        columnHeader?: number;
        columnFooter?: number;
        columnTitle?: number;
    };
    bounds?: 'full' | 'flush';
    columns?: number | {
        signal: string;
    };
    align?: LayoutAlign | RowCol<LayoutAlign>;
}
export declare function isDataRefUnionedDomain(domain: VgDomain): domain is VgScaleMultiDataRefWithSort;
export declare function isFieldRefUnionDomain(domain: VgDomain): domain is VgMultiFieldsRefWithSort;
export declare function isDataRefDomain(domain: VgDomain): domain is VgScaleDataRefWithSort;
export declare type VgEncodeChannel = 'x' | 'x2' | 'xc' | 'width' | 'y' | 'y2' | 'yc' | 'height' | 'opacity' | 'fill' | 'fillOpacity' | 'stroke' | 'strokeWidth' | 'strokeCap' | 'strokeOpacity' | 'strokeDash' | 'strokeDashOffset' | 'strokeMiterLimit' | 'strokeJoin' | 'strokeOffset' | 'strokeForeground' | 'cursor' | 'clip' | 'size' | 'shape' | 'path' | 'innerRadius' | 'outerRadius' | 'startAngle' | 'endAngle' | 'interpolate' | 'tension' | 'orient' | 'url' | 'align' | 'baseline' | 'text' | 'dir' | 'ellipsis' | 'limit' | 'dx' | 'dy' | 'radius' | 'theta' | 'angle' | 'font' | 'fontSize' | 'fontWeight' | 'fontStyle' | 'tooltip' | 'href' | 'cursor' | 'defined' | 'cornerRadius' | 'cornerRadiusTopLeft' | 'cornerRadiusTopRight' | 'cornerRadiusBottomRight' | 'cornerRadiusBottomLeft' | 'scaleX' | 'scaleY';
export declare type VgEncodeEntry = Partial<Record<VgEncodeChannel, VgValueRef | (VgValueRef & {
    test?: string;
})[]>>;
export declare type VgPostEncodingTransform = VgGeoShapeTransform;
export declare const VG_MARK_CONFIGS: ("width" | "height" | "theta" | "radius" | "fill" | "stroke" | "opacity" | "fillOpacity" | "strokeOpacity" | "strokeWidth" | "strokeDash" | "size" | "angle" | "shape" | "text" | "tooltip" | "href" | "description" | "interpolate" | "align" | "orient" | "aria" | "cornerRadius" | "strokeCap" | "strokeDashOffset" | "strokeJoin" | "strokeMiterLimit" | "ariaRole" | "ariaRoleDescription" | "aspect" | "blend" | "strokeOffset" | "tension" | "startAngle" | "endAngle" | "padAngle" | "innerRadius" | "outerRadius" | "baseline" | "dir" | "dx" | "dy" | "ellipsis" | "limit" | "lineBreak" | "lineHeight" | "font" | "fontSize" | "fontStyle" | "fontWeight" | "cursor" | "cornerRadiusTopLeft" | "cornerRadiusTopRight" | "cornerRadiusBottomRight" | "cornerRadiusBottomLeft")[];
export declare const VG_MARK_INDEX: Flag<Mark['type']>;
export declare const VG_CORNERRADIUS_CHANNELS: readonly ["cornerRadius", "cornerRadiusTopLeft", "cornerRadiusTopRight", "cornerRadiusBottomLeft", "cornerRadiusBottomRight"];
export interface VgComparator {
    field?: string | string[];
    order?: SortOrder | SortOrder[];
}
export interface VgJoinAggregateTransform {
    type: 'joinaggregate';
    as?: string[];
    ops?: AggregateOp[];
    fields?: string[];
    groupby?: string[];
}
//# sourceMappingURL=vega.schema.d.ts.map