import { contains } from '../../util';
import { isSignalRef } from '../../vega.schema';
import { isConcatModel, isLayerModel } from '../model';
export function assembleProjections(model) {
    if (isLayerModel(model) || isConcatModel(model)) {
        return assembleProjectionsForModelAndChildren(model);
    }
    else {
        return assembleProjectionForModel(model);
    }
}
export function assembleProjectionsForModelAndChildren(model) {
    return model.children.reduce((projections, child) => {
        return projections.concat(child.assembleProjections());
    }, assembleProjectionForModel(model));
}
export function assembleProjectionForModel(model) {
    const component = model.component.projection;
    if (!component || component.merged) {
        return [];
    }
    const projection = component.combine();
    const { name } = projection; // we need to extract name so that it is always present in the output and pass TS type validation
    if (!component.data) {
        // generate custom projection, no automatic fitting
        return [
            Object.assign(Object.assign({ name }, { translate: { signal: '[width / 2, height / 2]' } }), projection)
        ];
    }
    else {
        // generate projection that uses extent fitting
        const size = {
            signal: `[${component.size.map(ref => ref.signal).join(', ')}]`
        };
        const fits = component.data.reduce((sources, data) => {
            const source = isSignalRef(data) ? data.signal : `data('${model.lookupDataSource(data)}')`;
            if (!contains(sources, source)) {
                // build a unique list of sources
                sources.push(source);
            }
            return sources;
        }, []);
        if (fits.length <= 0) {
            throw new Error("Projection's fit didn't find any data sources");
        }
        return [
            Object.assign({ name,
                size, fit: {
                    signal: fits.length > 1 ? `[${fits.join(', ')}]` : fits[0]
                } }, projection)
        ];
    }
}
//# sourceMappingURL=assemble.js.map