import React, { useState } from 'react';
import { PlaygroundValuesContext } from '../../contexts/PlaygroundValuesContext';
import { PlaygroundCodeBlock } from '../PlaygroundCodeBlock';
import { PlaygroundPreview } from '../PlaygroundPreview';
import Stack, { StackProps } from '@mui/material/Stack';
import { PlaygroundDrawer } from '../PlaygroundDrawer';
import { CodeSnippetFunction, FieldValue, InputConfig, PreviewComponent } from '../../types/Playground.types';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export type PlaygroundProps = StackProps & {
    inputConfig: InputConfig;
    codeSnippet: CodeSnippetFunction;
    previewComponent: PreviewComponent;
};
export const Playground: React.FC<PlaygroundProps> = ({
    inputConfig,
    codeSnippet,
    previewComponent,
    sx,
    ...other
}): JSX.Element => {
    const [fields, setFields] = useState(() => {
        const fieldValues: { [key: string]: FieldValue } = {};
        for (let i = 0; i < inputConfig.length; i++) {
            fieldValues[inputConfig[i].id] = inputConfig[i].initialValue ?? '';
        }
        return fieldValues;
    });
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <PlaygroundValuesContext.Provider
            value={{
                data: fields,
                updateData: (id, value) => setFields((f) => ({ ...f, [id]: value })),
                inputConfig,
                codeSnippet,
                previewComponent,
            }}
        >
            <Stack direction={'row'} sx={[{ height: '100%' }, ...(Array.isArray(sx) ? sx : [sx])]} {...other}>
                <Stack direction={'column'} sx={{ flex: '1 1 0px', minWidth: 0 }}>
                    <PlaygroundPreview />
                    {!isMobile && <PlaygroundCodeBlock language={'jsx'} />}
                </Stack>
                <PlaygroundDrawer />
            </Stack>
        </PlaygroundValuesContext.Provider>
    );
};
export default Playground;
