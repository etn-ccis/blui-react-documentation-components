import React from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import ArrowDropUp from '@mui/icons-material/ArrowDropUp';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Paper from '@mui/material/Paper';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Slider from '@mui/material/Slider';
import { PlaygroundNumberInput } from '../../types/Playground.types';
import { PlaygroundTextField } from './PlaygroundTextField.component';
import { usePlaygroundValues } from '../../contexts/PlaygroundValuesContext';

const floatMath = (value: string | number, step: number): number => {
    const valueDecimal = value.toString().indexOf('.') + 1;
    const valueDecimalPlaces = value.toString().length - valueDecimal;
    const stepDecimal = step.toString().indexOf('.') + 1;
    const stepDecimalPlaces = step.toString().length - stepDecimal;

    const floatCorrectionFactor = Math.pow(10, Math.max(valueDecimalPlaces, stepDecimalPlaces));
    // floating point math correction
    return ((value as number) * floatCorrectionFactor + step * floatCorrectionFactor) / floatCorrectionFactor;
};

export const PlaygroundNumberPicker: React.FC<PlaygroundNumberInput> = (props) => {
    const {
        minValue = Number.MIN_SAFE_INTEGER,
        maxValue = Number.MAX_SAFE_INTEGER,
        valueStep = 1,
        ...otherProps
    } = props;
    const { data, updateData } = usePlaygroundValues();

    // Slider Popover
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleOpen = (event: React.MouseEvent<HTMLDivElement>): void => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (): void => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{ position: 'relative' }}>
            <PlaygroundTextField
                {...otherProps}
                onChange={(e): void => {
                    // only allow numeric values to be typed in
                    if (e.target.value && !/^\d+(?:[.]\d+)?$/.test(e.target.value)) return;
                    updateData(props.id, parseInt(e.target.value, 10));
                }}
                onClick={handleOpen}
                inputProps={{
                    min: minValue,
                    max: maxValue,
                    step: valueStep,
                }}
                type={'number'}
                InputProps={{
                    endAdornment: (
                        // We fake the increment/decrement buttons so we can stop the event propagation (otherwise every increment toggles the slider panel)
                        <InputAdornment position="end">
                            <Stack>
                                <IconButton
                                    size={'small'}
                                    sx={{ height: 10, width: 10, p: 0.75 }}
                                    onClick={(e): void => {
                                        e.stopPropagation();
                                        const newValue = Math.min(
                                            maxValue,
                                            floatMath(data[props.id] as number, valueStep)
                                        );
                                        updateData(props.id, newValue);
                                    }}
                                >
                                    <ArrowDropUp />
                                </IconButton>
                                <IconButton
                                    size={'small'}
                                    sx={{ height: 10, width: 10, p: 0.75 }}
                                    onClick={(e): void => {
                                        e.stopPropagation();
                                        const newValue = Math.max(
                                            minValue,
                                            floatMath(data[props.id] as number, -1 * valueStep)
                                        );
                                        updateData(props.id, newValue);
                                    }}
                                >
                                    <ArrowDropDown />
                                </IconButton>
                            </Stack>
                        </InputAdornment>
                    ),
                }}
            />

            {/* The range slider popover */}
            <Collapse
                in={open}
                unmountOnExit
                sx={{ position: 'absolute', top: 'calc(100% - 20px)', left: 0, right: 0, zIndex: 1000 }}
            >
                <Paper square sx={{ p: 1, width: '100%' }}>
                    <ClickAwayListener onClickAway={handleClose}>
                        <Slider
                            value={data[props.id] === '' ? 0 : (data[props.id] as number)}
                            size={'small'}
                            step={valueStep}
                            marks
                            min={minValue}
                            max={maxValue}
                            sx={{ width: '100%' }}
                            onChange={(_event, value): void => updateData(props.id, value as number)}
                        />
                    </ClickAwayListener>
                </Paper>
            </Collapse>
        </Box>
    );
};
