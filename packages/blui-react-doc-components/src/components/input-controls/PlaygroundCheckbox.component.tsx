import React from 'react';
import { PlaygroundBooleanInput } from '../../types/Playground.types';
import { usePlaygroundValues } from '../../contexts/PlaygroundValuesContext';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export const PlaygroundCheckbox: React.FC<PlaygroundBooleanInput> = (props) => {
    const {
        type, // eslint-disable-line @typescript-eslint/no-unused-vars
        id,
        label = id,
        typeLabel,
        description,
        defaultValue, // eslint-disable-line @typescript-eslint/no-unused-vars
        category, // eslint-disable-line @typescript-eslint/no-unused-vars
        initialValue,
        ...checkboxProps
    } = props;
    const { data, updateData } = usePlaygroundValues();

    return (
        <FormControlLabel
            key={id}
            control={
                <Checkbox
                    checked={(data[id] || initialValue) as boolean}
                    name={label || id}
                    color="primary"
                    onChange={(event): void => updateData(id, event.target.checked)}
                    {...checkboxProps}
                />
            }
            sx={{ alignItems: 'flex-start' }}
            label={
                <Box>
                    <Typography sx={{ fontFamily: 'inherit' }}>{`${label}${
                        typeLabel ? `: ${typeLabel}` : ''
                    }`}</Typography>
                    <Typography variant={'caption'} color={props.disabled ? 'text.disabled' : 'text.secondary'}>
                        {description}
                    </Typography>
                </Box>
            }
        />
    );
};
