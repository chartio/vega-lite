import { Config } from '../../config';
import { Encoding } from '../../encoding';
import { Mark, MarkDef } from '../../mark';
export declare function initMarkdef(mark: Mark | MarkDef, encoding: Encoding<string>, config: Config, { graticule }: {
    graticule: boolean;
}): MarkDef<"text" | "point" | "arc" | "area" | "bar" | "image" | "line" | "rect" | "rule" | "tick" | "trail" | "circle" | "square" | "geoshape">;
//# sourceMappingURL=init.d.ts.map