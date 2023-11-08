// import React from 'react';
// import TextField, { TextFieldProps } from '@mui/material/TextField';
// import { PlaygroundComponentProp } from '../types';

import React from 'react';
import { PlaygroundSelectInput } from '../../types/Playground.types';
import MenuItem from '@mui/material/MenuItem';
import { PlaygroundTextField } from './PlaygroundTextField.component';

export const PlaygroundSelect: React.FC<PlaygroundSelectInput> = (props) => {
    const { options, ...otherProps } = props;
    return (
        <PlaygroundTextField {...otherProps} select>
            {options.map((option) => {
                const isString = typeof option === 'string';
                const value = isString ? option : option.value;
                return (
                    <MenuItem key={value} value={value}>
                        {isString ? option : option.label}
                    </MenuItem>
                );
            })}
        </PlaygroundTextField>
    );
};
