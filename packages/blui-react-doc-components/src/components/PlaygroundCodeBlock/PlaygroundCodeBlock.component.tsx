import React, { useEffect, useState } from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import { usePlaygroundValues } from '../../contexts/PlaygroundValuesContext';
import { CopyToClipboardButton } from '../CopyToClipboardButton';
import * as Colors from '@brightlayer-ui/colors';
import Prism from 'prismjs';

export type PlaygroundCodeBlockProps = BoxProps & {
    language: string;
    dataLine?: string;
    smallFont?: boolean;
};
export const PlaygroundCodeBlock: React.FC<PlaygroundCodeBlockProps> = (props) => {
    const { language, dataLine, sx, smallFont = false, ...boxProps } = props;
    const { data, codeSnippet: generateSnippet } = usePlaygroundValues();
    const [showCopyButton, setShowCopyButton] = useState(false);
    const codeSnippet = generateSnippet(data);

    useEffect(() => {
        Prism.highlightAll();
    }, [data]);

    return (
        <Box
            sx={[
                {
                    flex: '1 1 0px',
                    position: 'relative',
                    '.line-highlight::before': {
                        display: 'none',
                    },
                    '.line-highlight::after': { display: 'none' },
                    display: 'flex',
                    fontSize: smallFont ? '0.875rem' : undefined,
                },
                ...(Array.isArray(sx) ? sx : [sx]),
            ]}
            onMouseEnter={(): void => setShowCopyButton(true)}
            onMouseLeave={(): void => setShowCopyButton(false)}
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
                    {codeSnippet}
                </code>
            </Box>
            {showCopyButton && (
                <CopyToClipboardButton
                    sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        color: Colors.blue[200],
                        borderColor: Colors.blue[200],
                        backgroundColor: Colors.black[800],
                        '&:hover': { borderColor: Colors.blue[200], backgroundColor: Colors.black[800] },
                    }}
                    TooltipProps={{
                        title: 'Copy All',
                    }}
                    copyContent={codeSnippet}
                />
            )}
        </Box>
    );
};
export default PlaygroundCodeBlock;
