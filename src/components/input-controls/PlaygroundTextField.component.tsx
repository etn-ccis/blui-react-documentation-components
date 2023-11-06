import React from 'react';
import TextField from '@mui/material/TextField';
import { PlaygroundInputType, PlaygroundNumberInput, PlaygroundStringInput } from '../../types/Playground.types';
import { usePlaygroundValues } from '../../contexts/PlaygroundValuesContext';

export const PlaygroundTextField: React.FC<
    Omit<PlaygroundStringInput | PlaygroundNumberInput, 'type'> & { type: PlaygroundInputType }
> = (props) => {
    const {
        type, // eslint-disable-line @typescript-eslint/no-unused-vars
        id,
        label = id,
        typeLabel,
        required,
        description,
        category, // eslint-disable-line @typescript-eslint/no-unused-vars
        defaultValue, // eslint-disable-line @typescript-eslint/no-unused-vars
        initialValue,
        ...textFieldProps
    } = props;
    const { data, updateData } = usePlaygroundValues();
    const isRequiredPropEmpty = required && (data[id] === undefined || data[id] === '');

    return (
        <TextField
            key={id}
            value={data[id] ?? initialValue ?? ''}
            variant={'filled'}
            fullWidth
            label={`${label}${typeLabel ? `: ${typeLabel}` : ''}`}
            error={isRequiredPropEmpty}
            helperText={isRequiredPropEmpty ? `${label} is required` : description}
            onChange={(e): void => {
                updateData(id, e.target.value);
            }}
            {...textFieldProps}
        />
    );
};
