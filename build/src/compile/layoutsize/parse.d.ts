import { ConcatModel } from '../concat';
import { Model } from '../model';
import { UnitModel } from '../unit';
import { FacetModel } from '../facet';
export declare function parseFacetLayoutSize(model: FacetModel): void;
export declare function parseLayerLayoutSize(model: Model): void;
export declare const parseRepeatLayoutSize: typeof parseConcatLayoutSize;
export declare function parseConcatLayoutSize(model: ConcatModel): void;
export declare function parseChildrenLayoutSize(model: Model): void;
export declare function parseUnitLayoutSize(model: UnitModel): void;
//# sourceMappingURL=parse.d.ts.map