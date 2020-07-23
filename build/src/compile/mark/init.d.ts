import { Config } from '../../config';
import { Encoding } from '../../encoding';
import { MarkDef } from '../../mark';
export declare function initMarkdef(markDef: MarkDef, encoding: Encoding<string>, config: Config): MarkDef<"text" | "point" | "arc" | "area" | "bar" | "image" | "line" | "rect" | "rule" | "tick" | "trail" | "circle" | "square" | "geoshape">;
export declare function defaultFilled(markDef: MarkDef, config: Config, { graticule }: {
    graticule: boolean;
}): boolean;
//# sourceMappingURL=init.d.ts.map