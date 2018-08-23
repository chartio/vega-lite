"use strict";
/* tslint:disable quotemark */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var chai_1 = require("chai");
var log = tslib_1.__importStar(require("../../../src/log"));
var mark_1 = require("../../../src/mark");
var util_1 = require("../../../src/util");
var util_2 = require("../../util");
describe('compile/mark/init', function () {
    describe('defaultOpacity', function () {
        it('should return 0.7 by default for unaggregated point, tick, circle, and square', function () {
            for (var _i = 0, _a = [mark_1.POINT, mark_1.TICK, mark_1.CIRCLE, mark_1.SQUARE]; _i < _a.length; _i++) {
                var mark = _a[_i];
                var model = util_2.parseUnitModelWithScaleAndLayoutSize({
                    mark: mark,
                    encoding: {
                        y: { type: 'quantitative', field: 'foo' },
                        x: { type: 'quantitative', field: 'bar' }
                    }
                });
                chai_1.assert.equal(model.markDef.opacity, 0.7);
            }
        });
        it('should return undefined by default for aggregated point, tick, circle, and square', function () {
            for (var _i = 0, _a = [mark_1.POINT, mark_1.TICK, mark_1.CIRCLE, mark_1.SQUARE]; _i < _a.length; _i++) {
                var mark = _a[_i];
                var model = util_2.parseUnitModelWithScaleAndLayoutSize({
                    mark: mark,
                    encoding: {
                        y: { aggregate: 'mean', type: 'quantitative', field: 'foo' },
                        x: { type: 'nominal', field: 'bar' }
                    }
                });
                chai_1.assert.equal(model.markDef.opacity, undefined);
            }
        });
        it('should use specified opacity', function () {
            for (var _i = 0, _a = [mark_1.POINT, mark_1.TICK, mark_1.CIRCLE, mark_1.SQUARE]; _i < _a.length; _i++) {
                var mark = _a[_i];
                var model = util_2.parseUnitModelWithScaleAndLayoutSize({
                    mark: { type: mark, opacity: 0.9 },
                    encoding: {
                        y: { type: 'quantitative', field: 'foo' },
                        x: { type: 'quantitative', field: 'bar' }
                    }
                });
                chai_1.assert.equal(model.markDef.opacity, 0.9);
            }
        });
        it('should return undefined by default for other marks', function () {
            var otherMarks = util_1.without(mark_1.PRIMITIVE_MARKS, [mark_1.POINT, mark_1.TICK, mark_1.CIRCLE, mark_1.SQUARE]);
            for (var _i = 0, otherMarks_1 = otherMarks; _i < otherMarks_1.length; _i++) {
                var mark = otherMarks_1[_i];
                var model = util_2.parseUnitModelWithScaleAndLayoutSize({
                    mark: mark,
                    encoding: {
                        y: { type: 'quantitative', field: 'foo' },
                        x: { type: 'nominal', field: 'bar' }
                    }
                });
                chai_1.assert.equal(model.markDef.opacity, undefined);
            }
        });
    });
    describe('orient', function () {
        it('should return correct default for QxQ', log.wrap(function (localLogger) {
            var model = util_2.parseUnitModelWithScaleAndLayoutSize({
                mark: 'bar',
                encoding: {
                    y: { type: 'quantitative', field: 'foo' },
                    x: { type: 'quantitative', field: 'bar' }
                }
            });
            chai_1.assert.equal(model.markDef.orient, 'vertical');
        }));
        it('should return correct default for empty plot', log.wrap(function (localLogger) {
            var model = util_2.parseUnitModelWithScaleAndLayoutSize({
                mark: 'bar',
                encoding: {}
            });
            chai_1.assert.equal(model.markDef.orient, undefined);
        }));
        it('should return correct orient for bar with both axes discrete', log.wrap(function (localLogger) {
            var model = util_2.parseUnitModelWithScaleAndLayoutSize({
                mark: 'bar',
                encoding: {
                    x: { type: 'ordinal', field: 'foo' },
                    y: { type: 'ordinal', field: 'bar' }
                }
            });
            chai_1.assert.equal(model.markDef.orient, undefined);
        }));
        it('should return correct orient for vertical bar', function () {
            var model = util_2.parseUnitModelWithScaleAndLayoutSize({
                mark: 'bar',
                encoding: {
                    y: { type: 'quantitative', field: 'foo' },
                    x: { type: 'ordinal', field: 'bar' }
                }
            });
            chai_1.assert.equal(model.markDef.orient, 'vertical');
        });
        it('should return correct orient for horizontal bar', function () {
            var model = util_2.parseUnitModelWithScaleAndLayoutSize({
                mark: 'bar',
                encoding: {
                    x: { type: 'quantitative', field: 'foo' },
                    y: { type: 'ordinal', field: 'bar' }
                }
            });
            chai_1.assert.equal(model.markDef.orient, 'horizontal');
        });
        it('should return correct orient for vertical bar with raw temporal dimension', function () {
            var model = util_2.parseUnitModelWithScaleAndLayoutSize({
                mark: 'bar',
                encoding: {
                    y: { type: 'quantitative', field: 'foo' },
                    x: { type: 'temporal', field: 'bar' }
                }
            });
            chai_1.assert.equal(model.markDef.orient, 'vertical');
        });
        it('should return correct orient for horizontal bar with raw temporal dimension', function () {
            var model = util_2.parseUnitModelWithScaleAndLayoutSize({
                mark: 'bar',
                encoding: {
                    x: { type: 'quantitative', field: 'foo' },
                    y: { type: 'temporal', field: 'bar' }
                }
            });
            chai_1.assert.equal(model.markDef.orient, 'horizontal');
        });
        it('should return correct orient for vertical tick', function () {
            var model = util_2.parseUnitModelWithScaleAndLayoutSize({
                mark: 'tick',
                encoding: {
                    x: { type: 'quantitative', field: 'foo' },
                    y: { type: 'ordinal', field: 'bar' }
                }
            });
            chai_1.assert.equal(model.markDef.orient, 'vertical');
        });
        it('should return correct orient for vertical tick with bin', function () {
            var model = util_2.parseUnitModelWithScaleAndLayoutSize({
                mark: 'tick',
                encoding: {
                    x: { type: 'quantitative', field: 'foo' },
                    y: { type: 'quantitative', field: 'bar', bin: true }
                }
            });
            chai_1.assert.equal(model.markDef.orient, 'vertical');
        });
        it('should return correct orient for vertical tick of continuous timeUnit dotplot', function () {
            var model = util_2.parseUnitModelWithScaleAndLayoutSize({
                mark: 'tick',
                encoding: {
                    x: { type: 'temporal', field: 'foo', timeUnit: 'yearmonthdate' },
                    y: { type: 'ordinal', field: 'bar' }
                }
            });
            chai_1.assert.equal(model.markDef.orient, 'vertical');
        });
        it('should return correct orient for horizontal tick', function () {
            var model = util_2.parseUnitModelWithScaleAndLayoutSize({
                mark: 'tick',
                encoding: {
                    y: { type: 'quantitative', field: 'foo' },
                    x: { type: 'ordinal', field: 'bar' }
                }
            });
            chai_1.assert.equal(model.markDef.orient, 'horizontal');
        });
        it('should return correct orient for vertical rule', function () {
            var model = util_2.parseUnitModelWithScaleAndLayoutSize({
                mark: 'rule',
                encoding: {
                    x: { value: 0 }
                }
            });
            chai_1.assert.equal(model.markDef.orient, 'vertical');
        });
        it('should return correct orient for horizontal rule', function () {
            var model = util_2.parseUnitModelWithScaleAndLayoutSize({
                mark: 'rule',
                encoding: {
                    y: { value: 0 }
                }
            });
            chai_1.assert.equal(model.markDef.orient, 'horizontal');
        });
        it('should return undefined for line segment rule', function () {
            var model = util_2.parseUnitModelWithScaleAndLayoutSize({
                mark: 'rule',
                encoding: {
                    y: { value: 0 },
                    x: { value: 0 },
                    y2: { value: 100 },
                    x2: { value: 100 }
                }
            });
            chai_1.assert.equal(model.markDef.orient, undefined);
        });
        it('should return undefined for line segment rule with only x and y without x2, y2', function () {
            var model = util_2.parseUnitModelWithScaleAndLayoutSize({
                mark: 'rule',
                encoding: {
                    y: { value: 0 },
                    x: { value: 0 }
                }
            });
            chai_1.assert.equal(model.markDef.orient, undefined);
        });
        it('should return correct orient for horizontal rules without x2 ', function () {
            var model = util_2.parseUnitModelWithScaleAndLayoutSize({
                mark: 'rule',
                encoding: {
                    x: { field: 'b', type: 'quantitative' },
                    y: { field: 'a', type: 'ordinal' }
                }
            });
            chai_1.assert.equal(model.markDef.orient, 'horizontal');
        });
        it('should return correct orient for vertical rules without y2 ', function () {
            var model = util_2.parseUnitModelWithScaleAndLayoutSize({
                mark: 'rule',
                encoding: {
                    y: { field: 'b', type: 'quantitative' },
                    x: { field: 'a', type: 'ordinal' }
                }
            });
            chai_1.assert.equal(model.markDef.orient, 'vertical');
        });
        it('should return correct orient for vertical rule with range', function () {
            var model = util_2.parseUnitModelWithScaleAndLayoutSize({
                mark: 'rule',
                encoding: {
                    x: { type: 'ordinal', field: 'foo' },
                    y: { type: 'quantitative', field: 'bar' },
                    y2: { type: 'quantitative', field: 'baz' }
                }
            });
            chai_1.assert.equal(model.markDef.orient, 'vertical');
        });
        it('should return correct orient for horizontal rule with range', function () {
            var model = util_2.parseUnitModelWithScaleAndLayoutSize({
                mark: 'rule',
                encoding: {
                    y: { type: 'ordinal', field: 'foo' },
                    x: { type: 'quantitative', field: 'bar' },
                    x2: { type: 'quantitative', field: 'baz' }
                }
            });
            chai_1.assert.equal(model.markDef.orient, 'horizontal');
        });
        it('should return correct orient for horizontal rule with range and no ordinal', function () {
            var model = util_2.parseUnitModelWithScaleAndLayoutSize({
                mark: 'rule',
                encoding: {
                    x: { type: 'quantitative', field: 'bar' },
                    x2: { type: 'quantitative', field: 'baz' }
                }
            });
            chai_1.assert.equal(model.markDef.orient, 'horizontal');
        });
        it('should return correct orient for vertical rule with range and no ordinal', function () {
            var model = util_2.parseUnitModelWithScaleAndLayoutSize({
                mark: 'rule',
                encoding: {
                    y: { type: 'quantitative', field: 'bar' },
                    y2: { type: 'quantitative', field: 'baz' }
                }
            });
            chai_1.assert.equal(model.markDef.orient, 'vertical');
        });
        it('should return correct orient for bar with vertical binned data', function () {
            var model = util_2.parseUnitModelWithScaleAndLayoutSize({
                mark: 'bar',
                encoding: {
                    x: {
                        field: 'bin_start',
                        bin: 'binned',
                        type: 'quantitative',
                        axis: {
                            tickStep: 2
                        }
                    },
                    x2: {
                        field: 'bin_end',
                        type: 'quantitative'
                    },
                    y: {
                        field: 'count',
                        type: 'quantitative'
                    }
                }
            });
            chai_1.assert.equal(model.markDef.orient, 'vertical');
        });
        it('should return correct orient for bar with horizontal binned data', function () {
            var model = util_2.parseUnitModelWithScaleAndLayoutSize({
                mark: 'bar',
                encoding: {
                    y: {
                        field: 'bin_start',
                        bin: 'binned',
                        type: 'quantitative',
                        axis: {
                            tickStep: 2
                        }
                    },
                    y2: {
                        field: 'bin_end',
                        type: 'quantitative'
                    },
                    x: {
                        field: 'count',
                        type: 'quantitative'
                    }
                }
            });
            chai_1.assert.equal(model.markDef.orient, 'horizontal');
        });
        it('should return correct orient for area with vertical binned data', function () {
            var model = util_2.parseUnitModelWithScaleAndLayoutSize({
                mark: 'area',
                encoding: {
                    x: {
                        field: 'bin_start',
                        bin: 'binned',
                        type: 'quantitative',
                        axis: {
                            tickStep: 2
                        }
                    },
                    x2: {
                        field: 'bin_end',
                        type: 'quantitative'
                    },
                    y: {
                        field: 'count',
                        type: 'quantitative'
                    }
                }
            });
            chai_1.assert.equal(model.markDef.orient, 'vertical');
        });
        it('should return correct orient for area with horizontal binned data', function () {
            var model = util_2.parseUnitModelWithScaleAndLayoutSize({
                mark: 'area',
                encoding: {
                    y: {
                        field: 'bin_start',
                        bin: 'binned',
                        type: 'quantitative',
                        axis: {
                            tickStep: 2
                        }
                    },
                    y2: {
                        field: 'bin_end',
                        type: 'quantitative'
                    },
                    x: {
                        field: 'count',
                        type: 'quantitative'
                    }
                }
            });
            chai_1.assert.equal(model.markDef.orient, 'horizontal');
        });
    });
    describe('cursor', function () {
        it('cursor should be undefined when no href channel defined', function () {
            var model = util_2.parseUnitModelWithScaleAndLayoutSize({
                mark: 'bar',
                encoding: {
                    y: { type: 'quantitative', field: 'foo' },
                    x: { type: 'temporal', field: 'bar' }
                }
            });
            chai_1.assert.equal(model.markDef.cursor, undefined);
        });
        it('should return pointer cursor when href channel present', function () {
            var model = util_2.parseUnitModelWithScaleAndLayoutSize({
                mark: 'bar',
                selection: { test: { type: 'single' } },
                encoding: {
                    x: { field: 'a', type: 'ordinal' },
                    y: { field: 'b', type: 'quantitative' },
                    href: {
                        condition: { selection: 'test', value: 'https://vega.github.io/schema/vega-lite/v2.json' },
                        field: 'a',
                        type: 'ordinal'
                    }
                }
            });
            chai_1.assert.equal(model.markDef.cursor, 'pointer');
        });
        it('should return specified cursor when href channel present but cursor specified', function () {
            var model = util_2.parseUnitModelWithScaleAndLayoutSize({
                mark: { type: 'bar', cursor: 'auto' },
                selection: { test: { type: 'single' } },
                encoding: {
                    x: { field: 'a', type: 'ordinal' },
                    y: { field: 'b', type: 'quantitative' },
                    href: {
                        condition: { selection: 'test', value: 'http://www.google.com' },
                        field: 'a',
                        type: 'ordinal'
                    }
                }
            });
            chai_1.assert.equal(model.markDef.cursor, 'auto');
        });
        it('should return pointer cursor when href channel specified in mark definition', function () {
            var model = util_2.parseUnitModelWithScaleAndLayoutSize({
                mark: { type: 'bar', href: 'http://www.google.com' },
                encoding: {
                    y: { type: 'quantitative', field: 'foo' },
                    x: { type: 'temporal', field: 'bar' }
                }
            });
            chai_1.assert.equal(model.markDef.cursor, 'pointer');
        });
        it('should return specified cursor when href channel specified in mark definition but cursor also specified in mark', function () {
            var model = util_2.parseUnitModelWithScaleAndLayoutSize({
                mark: { type: 'bar', href: 'http://www.google.com', cursor: 'auto' },
                encoding: {
                    y: { type: 'quantitative', field: 'foo' },
                    x: { type: 'temporal', field: 'bar' }
                }
            });
            chai_1.assert.equal(model.markDef.cursor, 'auto');
        });
        it('should return pointer cursor when href channel specified in mark config', function () {
            var model = util_2.parseUnitModelWithScaleAndLayoutSize({
                config: {
                    mark: {
                        href: 'http://www.google.com'
                    }
                },
                mark: 'bar',
                encoding: {
                    y: { type: 'quantitative', field: 'foo' },
                    x: { type: 'temporal', field: 'bar' }
                }
            });
            chai_1.assert.equal(model.markDef.cursor, 'pointer');
        });
        it('should return specified cursor when href channel specified in mark config but cursor also specified in mark', function () {
            var model = util_2.parseUnitModelWithScaleAndLayoutSize({
                config: {
                    mark: {
                        href: 'http://www.google.com'
                    }
                },
                mark: { type: 'bar', cursor: 'auto' },
                encoding: {
                    y: { type: 'quantitative', field: 'foo' },
                    x: { type: 'temporal', field: 'bar' }
                }
            });
            chai_1.assert.equal(model.markDef.cursor, 'auto');
        });
        it('should not specify cursor in the markdef if defined in the config', function () {
            var model = util_2.parseUnitModelWithScaleAndLayoutSize({
                config: {
                    mark: {
                        href: 'http://www.google.com',
                        cursor: 'auto'
                    }
                },
                mark: 'bar',
                encoding: {
                    y: { type: 'quantitative', field: 'foo' },
                    x: { type: 'temporal', field: 'bar' }
                }
            });
            chai_1.assert.equal(model.markDef.cursor, undefined);
        });
    });
});
//# sourceMappingURL=init.test.js.map