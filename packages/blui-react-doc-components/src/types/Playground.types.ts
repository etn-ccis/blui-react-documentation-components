import { CheckboxProps } from '@mui/material/Checkbox';
import { TextFieldProps } from '@mui/material/TextField';
import { ComponentType } from 'react';

export type FieldValue = string | number | boolean | undefined;
export type ComponentData = {
    [key: string]: FieldValue;
};
/**
 * Configuration options for which inputs you wish to see in the drawer
 */
export type InputConfig = PlaygroundInput[];
/**
 * A function that returns a string / code snippet based on the values of the input data provided
 */
export type CodeSnippetFunction = (data: { [key: string]: FieldValue }) => string;
/**
 * A component to render as the preview based on the values of the input data provided
 */
export type PreviewComponent = ComponentType<{ data: { [key: string]: FieldValue } }>;

export type PlaygroundInputType = 'string' | 'number' | 'color' | 'select' | 'boolean';
export type CommonPlaygroundInputProps<T> = {
    id: string;
    label?: string;
    typeLabel?: string;
    required?: boolean;
    description?: string;
    category?: string;
    defaultValue?: T;
    initialValue?: T;
};
export type PlaygroundStringInput = CommonPlaygroundInputProps<string> &
    TextFieldProps & {
        type: 'string';
    };
export type PlaygroundNumberInput = CommonPlaygroundInputProps<number | string> &
    TextFieldProps & {
        type: 'number';
        minValue?: number;
        maxValue?: number;
        valueStep?: number;
    };
export type PlaygroundColorInput = CommonPlaygroundInputProps<string> &
    TextFieldProps & {
        type: 'color';
        allowMuiColors?: boolean;
    };
export type PlaygroundSelectInput = CommonPlaygroundInputProps<string | number> &
    Omit<TextFieldProps, 'children'> & {
        type: 'select';
        options:
            | Array<{
                  label: string;
                  value: string | number;
              }>
            | string[];
    };
export type PlaygroundBooleanInput = CommonPlaygroundInputProps<boolean> &
    Omit<CheckboxProps, 'defaultValue'> & {
        type: 'boolean';
    };
export type PlaygroundInput =
    | PlaygroundStringInput
    | PlaygroundNumberInput
    | PlaygroundColorInput
    | PlaygroundSelectInput
    | PlaygroundBooleanInput;
