import React, { useEffect } from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import { usePlaygroundValues } from '../../contexts/PlaygroundValuesContext';
import Prism from 'prismjs';

export type PlaygroundCodeBlockProps = BoxProps & {
    language: string;
    dataLine?: string;
    smallFont?: boolean;
};
export const PlaygroundCodeBlock: React.FC<PlaygroundCodeBlockProps> = (props) => {
    const { language, dataLine, sx, smallFont = false, ...boxProps } = props;
    const { data, codeSnippet: generateSnippet } = usePlaygroundValues();

    useEffect(() => {
        Prism.highlightAll();
    }, [data]);
    return (
        <Box
            sx={[
                {
                    flex: '1 1 0px',
                    '.line-highlight::before': {
                        display: 'none',
                    },
                    '.line-highlight::after': { display: 'none' },
                    display: 'flex',
                    fontSize: smallFont ? '0.875rem' : undefined,
                },
                ...(Array.isArray(sx) ? sx : [sx]),
            ]}
            {...boxProps}
        >
            <Box
                component={'pre'}
                data-line={dataLine}
                sx={{
                    m: 0,
                    width: '100%',
                    backgroundColor: 'common.black',
                    borderRadius: 1,
                }}
            >
                <code style={{ fontFamily: `'Roboto Mono', monospace` }} className={`language-${language}`}>
                    {generateSnippet(data)}
                </code>
            </Box>
        </Box>
    );
};
export default PlaygroundCodeBlock;
