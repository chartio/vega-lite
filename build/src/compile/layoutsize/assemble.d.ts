import { InitSignal, NewSignal } from 'vega';
import { Model } from '../model';
import { ScaleComponent } from '../scale/component';
import { LayoutSizeType } from './component';
import { FacetModel } from '../facet';
export declare function assembleLayoutSignals(model: Model): NewSignal[];
export declare function sizeSignals(model: Model, sizeType: LayoutSizeType): (NewSignal | InitSignal)[];
export declare function sizeExpr(scaleName: string, scaleComponent: ScaleComponent, cardinality: string): string;
export declare function autosizedFacetExpr(model: FacetModel, sizeType: LayoutSizeType): string;
//# sourceMappingURL=assemble.d.ts.map