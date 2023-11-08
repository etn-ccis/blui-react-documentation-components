import React from 'react';
import { usePlaygroundValues } from '../../contexts/PlaygroundValuesContext';
import Box, { BoxProps } from '@mui/material/Box';

export type PlaygroundPreviewProps = Omit<BoxProps, 'component'>;
export const PlaygroundPreview: React.FC<PlaygroundPreviewProps> = (props) => {
    const { sx, ...other } = props;
    const { data, previewComponent: PreviewComponent } = usePlaygroundValues();

    return (
        <Box sx={[{ flex: '2 2 0px' }, ...(Array.isArray(sx) ? sx : [sx])]} {...other}>
            <PreviewComponent data={data} />
        </Box>
    );
};
export default PlaygroundPreview;
