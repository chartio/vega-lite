import {InitSignal, NewSignal} from 'vega';
import {getViewConfigContinuousSize} from '../../config';
import {hasDiscreteDomain} from '../../scale';
import {getFirstDefined} from '../../util';
import {isVgRangeStep, VgRangeStep} from '../../vega.schema';
import {signalOrStringValue} from '../common';
import {Model} from '../model';
import {ScaleComponent} from '../scale/component';
import {getSizeTypeFromLayoutSizeType, LayoutSizeType} from './component';
import {isFacetMapping} from '../../spec/facet';
import {FacetModel} from '../facet';
import {getFacetParentModel} from '../selection';

export function assembleLayoutSignals(model: Model): NewSignal[] {
  return [
    ...sizeSignals(model, 'width'),
    ...sizeSignals(model, 'height'),
    ...sizeSignals(model, 'childWidth'),
    ...sizeSignals(model, 'childHeight')
  ];
}

export function sizeSignals(model: Model, sizeType: LayoutSizeType): (NewSignal | InitSignal)[] {
  const channel = sizeType === 'width' ? 'x' : 'y';
  const size = model.component.layoutSize.get(sizeType);
  const facetParent = getFacetParentModel(model);
  if (!size || (size === 'merged' && !facetParent)) {
    return [];
  }

  // Read size signal name from name map, just in case it is the top-level size signal that got renamed.
  const name = model.getSizeSignalRef(sizeType).signal;

  if (facetParent?.hasStaticOuterDimension(getSizeTypeFromLayoutSizeType(sizeType))) {
    // this disregards any sizing directly set for the facet child which has already been set on the facet parent
    return [
      {
        name,
        update: autosizedFacetExpr(facetParent, sizeType)
      }
    ];
  } else if (size === 'step') {
    const scaleComponent = model.getScaleComponent(channel);

    if (scaleComponent) {
      const type = scaleComponent.get('type');
      const range = scaleComponent.get('range');

      if (hasDiscreteDomain(type) && isVgRangeStep(range)) {
        const scaleName = model.scaleName(channel);

        if (facetParent) {
          // If parent is facet and this is an independent scale, return only signal signal
          // as the width/height will be calculated using the cardinality from
          // facet's aggregate rather than reading from scale domain
          const parentResolve = model.parent.component.resolve;
          if (parentResolve.scale[channel] === 'independent') {
            return [stepSignal(scaleName, range)];
          }
        }

        return [
          stepSignal(scaleName, range),
          {
            name,
            update: sizeExpr(scaleName, scaleComponent, `domain('${scaleName}').length`)
          }
        ];
      }
    }
    /* istanbul ignore next: Condition should not happen -- only for warning in development. */
    throw new Error('layout size is step although width/height is not step.');
  } else if (size == 'container') {
    const isWidth = name.endsWith('width');
    const expr = isWidth ? 'containerSize()[0]' : 'containerSize()[1]';
    const defaultValue = getViewConfigContinuousSize(model.config.view, isWidth ? 'width' : 'height');
    const safeExpr = `isFinite(${expr}) ? ${expr} : ${defaultValue}`;
    return [{name, init: safeExpr, on: [{update: safeExpr, events: 'window:resize'}]}];
  } else if (size !== 'merged') {
    return [
      {
        name,
        value: size
      }
    ];
  }
  return [];
}

function stepSignal(scaleName: string, range: VgRangeStep): NewSignal {
  return {
    name: `${scaleName}_step`,
    value: range.step
  };
}

export function sizeExpr(scaleName: string, scaleComponent: ScaleComponent, cardinality: string) {
  const type = scaleComponent.get('type');
  const padding = scaleComponent.get('padding');
  const paddingOuter = getFirstDefined(scaleComponent.get('paddingOuter'), padding);

  let paddingInner = scaleComponent.get('paddingInner');
  paddingInner =
    type === 'band'
      ? // only band has real paddingInner
        paddingInner !== undefined
        ? paddingInner
        : padding
      : // For point, as calculated in https://github.com/vega/vega-scale/blob/master/src/band.js#L128,
        // it's equivalent to have paddingInner = 1 since there is only n-1 steps between n points.
        1;
  return `bandspace(${cardinality}, ${signalOrStringValue(paddingInner)}, ${signalOrStringValue(
    paddingOuter
  )}) * ${scaleName}_step`;
}

export function autosizedFacetExpr(model: FacetModel, sizeType: LayoutSizeType) {
  const channel = sizeType === 'width' ? 'column' : 'row';
  if (!model.facet[channel] && isFacetMapping(model.facet)) {
    // no faceting on this channel so just pass through the overall dimension of this channel
    return sizeType;
  }
  // if the facet operator defines an explicit row or column channel, the compiled vega spec includes the '(row|column)_domain' data
  // otherwise the facet operator is itself is a facet field definition, the compiled vega spec instead includes the 'facet_domain_(row|column)' data
  const name = model.name ? `${model.name}_` : '';
  const domain = !isFacetMapping(model.facet) ? `facet_domain_${channel}` : `${name}${channel}_domain`;
  return `${sizeType} / length(data('${domain}'))`;
}
