import { Legend as VgLegend } from 'vega';
import { NonPositionScaleChannel } from '../../channel';
import { Legend } from '../../legend';
import { Split } from '../split';
export declare type LegendComponentProps = VgLegend & {
    labelExpr?: string;
    selections?: string[];
    disable?: boolean;
};
export declare const LEGEND_COMPONENT_PROPERTIES: ("fill" | "stroke" | "opacity" | "strokeWidth" | "strokeDash" | "size" | "shape" | "description" | "values" | "title" | "labelAlign" | "labelBaseline" | "labelColor" | "labelFont" | "labelFontSize" | "labelFontStyle" | "labelFontWeight" | "labelOpacity" | "labelOffset" | "labelPadding" | "titleColor" | "orient" | "format" | "formatType" | "offset" | "tickCount" | "tickMinStep" | "encode" | "aria" | "titlePadding" | "titleAlign" | "titleAnchor" | "titleBaseline" | "titleFont" | "titleFontSize" | "titleFontStyle" | "titleFontWeight" | "titleLimit" | "titleLineHeight" | "titleOpacity" | "labelOverlap" | "labelSeparation" | "labelLimit" | "zindex" | "labelExpr" | "disable" | "type" | "padding" | "cornerRadius" | "fillColor" | "gradientStrokeColor" | "strokeColor" | "symbolFillColor" | "symbolStrokeColor" | "symbolLimit" | "legendX" | "legendY" | "titleOrient" | "gradientLength" | "gradientOpacity" | "gradientThickness" | "gradientStrokeWidth" | "clipHeight" | "columns" | "columnPadding" | "rowPadding" | "gridAlign" | "symbolDash" | "symbolDashOffset" | "symbolOffset" | "symbolOpacity" | "symbolSize" | "symbolStrokeWidth" | "symbolType" | "direction" | "selections")[];
export declare class LegendComponent extends Split<LegendComponentProps> {
}
export declare type LegendComponentIndex = Partial<Record<NonPositionScaleChannel, LegendComponent>>;
export declare type LegendIndex = Partial<Record<NonPositionScaleChannel, Legend>>;
//# sourceMappingURL=component.d.ts.map