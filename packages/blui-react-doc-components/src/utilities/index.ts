import { PlaygroundProps } from '../components/PlaygroundPage/PlaygroundPage.component';
import { ComponentData, FieldValue } from '../types/Playground.types';

/**
 *
 * @param data a mapping of input keys and values
 * @param inputConfig a configuration object specifying the properties of the inputs
 * @returns a new ComponentData object that removes undefined values or values that are equal to the default for the field
 */
export const getPropsMapping = (data: ComponentData, inputConfig: PlaygroundProps['inputConfig']): ComponentData => {
    const sanitizedData: ComponentData = {};

    Object.keys(data).forEach((prop) => {
        // prop has no value
        if (data[prop] === undefined || data[prop] === '' || data[prop] === 'undefined') return;
        const propConfig = inputConfig.find((input) => input.id === prop);
        // no default configured
        if (!propConfig) {
            sanitizedData[prop] = data[prop];
            return;
        }
        // value equals default
        else if (propConfig.defaultValue !== undefined && data[prop] === propConfig.defaultValue) return;
        // value is not the default
        sanitizedData[prop] = data[prop];
    });

    return sanitizedData;
};

/**
 *
 * @param value the value of a particular component prop
 * @returns a string representation of the correct JSX binding expression based on the value type
 */
export const getPropValueBinding = (value: FieldValue): string => {
    if (value === undefined || value === 'undefined') return '={ undefined }';
    switch (typeof value) {
        case 'number':
            return `={${value}}`;
        case 'boolean':
            return value === true ? '' : `={${value.toString()}}`;
        case 'string':
        default:
            return value.includes(`'`) ?  `={\`${value}\`}` :  `={'${value}'}`;
    }
};

/**
 *
 * @param data a mapping of input keys and values
 * @param config optional configuration options (custom separator character and/or omit certain values)
 * @returns a string representation of the data parameter properly mapped to JSX bindings
 */
export const getPropsToString = (data: ComponentData, config: { join?: string; skip?: string[] } = {}): string => {
    const { join = ' ', skip = [] } = config;
    const values: string[] = [];
    Object.keys(data).forEach((prop) => {
        if (!skip.includes(prop)) {
            values.push(`${prop}${getPropValueBinding(data[prop])}`);
        }
    });
    return values.join(join);
};
