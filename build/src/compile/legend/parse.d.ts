import { NonPositionScaleChannel } from '../../channel';
import { Model } from '../model';
import { UnitModel } from '../unit';
import { LegendComponent } from './component';
export declare function parseLegend(model: Model): Partial<Record<"color" | "fill" | "stroke" | "opacity" | "fillOpacity" | "strokeOpacity" | "strokeWidth" | "strokeDash" | "size" | "angle" | "shape", LegendComponent>>;
export declare function parseLegendForChannel(model: UnitModel, channel: NonPositionScaleChannel): LegendComponent;
export declare function mergeLegendComponent(mergedLegend: LegendComponent, childLegend: LegendComponent): LegendComponent;
//# sourceMappingURL=parse.d.ts.map