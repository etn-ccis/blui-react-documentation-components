import React, { useEffect, useMemo, useState } from 'react';
import groupBy from 'lodash.groupby';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import { PlaygroundInput, PlaygroundStringInput } from '../../types/Playground.types';
import { PlaygroundTextField } from '../input-controls/PlaygroundTextField.component';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMore from '@mui/icons-material/ExpandMore';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp';
import AccordionDetails from '@mui/material/AccordionDetails';
import Stack from '@mui/material/Stack';
import { PlaygroundSelect } from '../input-controls/PlaygroundSelect.component';
import { PlaygroundNumberPicker } from '../input-controls/PlaygroundNumberPicker.component';
import { PlaygroundCheckbox } from '../input-controls/PlaygroundCheckbox.component';
import { PlaygroundColorPicker } from '../input-controls/PlaygroundColorPicker.component';
import { PlaygroundCodeBlock } from '../PlaygroundCodeBlock';
import { usePlaygroundValues } from '../../contexts/PlaygroundValuesContext';
import { InfoListItem } from '@brightlayer-ui/react-components';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const getInputByType: (input: PlaygroundInput) => JSX.Element = (input) => {
    switch (input.type) {
        case 'select':
            return <PlaygroundSelect key={input.id} {...input} />;
        case 'number':
            return <PlaygroundNumberPicker key={input.id} {...input} />;
        case 'boolean':
            return <PlaygroundCheckbox key={input.id} {...input} />;
        case 'color':
            return <PlaygroundColorPicker key={input.id} {...input} />;
        case 'string':
        default:
            return <PlaygroundTextField key={input.id} {...(input as PlaygroundStringInput)} />;
    }
};

export type PlaygroundDrawerProps = DrawerProps;
export const PlaygroundDrawer: React.FC<PlaygroundDrawerProps> = (props) => {
    const { PaperProps: { sx: paperSx, ...paperProps } = {}, ...drawerProps } = props;
    const { inputConfig } = usePlaygroundValues();
    const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
    const [selectedTab, setSelectedTab] = React.useState<'Props' | 'Code'>('Props');
    const groupedInputs = useMemo(() => groupBy(inputConfig, (i) => i.category ?? 'root'), [inputConfig]);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(() => {
        setMobileDrawerOpen(false);
        setSelectedTab('Props');
    }, [isMobile]);

    const inputForm = useMemo(
        () => (
            <Box sx={{ pb: isMobile ? '25vh' : '50vh' }}>
                {Object.keys(groupedInputs).map((category, index) => (
                    <React.Fragment key={category}>
                        {index !== 0 && <Divider />}
                        <Accordion
                            defaultExpanded={index === 0}
                            sx={{
                                boxShadow: 'none',
                                '&:before': {
                                    display: 'none',
                                },
                                backgroundImage: 'none',
                                backgroundColor: 'transparent',
                            }}
                        >
                            <AccordionSummary expandIcon={<ExpandMore sx={{ color: 'primary.main' }} />}>
                                <Typography variant={'subtitle1'} color={'primary.main'}>
                                    {category}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Stack gap={2}>
                                    {groupedInputs[category].map((i): JSX.Element => getInputByType(i))}
                                </Stack>
                            </AccordionDetails>
                        </Accordion>
                    </React.Fragment>
                ))}
            </Box>
        ),
        [groupedInputs]
    );

    return (
        <>
            <Drawer
                PaperProps={{
                    sx: [
                        {
                            width: isMobile ? '100%' : 350,
                            height: isMobile ? '70%' : undefined,
                            position: isMobile ? 'fixed' : 'static',
                            '& .MuiInputBase-root, & .MuiFormControlLabel-label': {
                                fontFamily: '"Roboto Mono", monospace',
                            },
                            zIndex: (t) => t.zIndex.appBar - 1,
                        },
                        ...(Array.isArray(paperSx) ? paperSx : [paperSx]),
                    ],
                    ...paperProps,
                }}
                ModalProps={{ keepMounted: true }}
                onClose={(): void => setMobileDrawerOpen(false)}
                anchor={isMobile ? 'bottom' : 'right'}
                open={!isMobile || mobileDrawerOpen}
                variant={isMobile ? 'temporary' : 'persistent'}
                {...drawerProps}
            >
                {!isMobile && inputForm}
                {isMobile && (
                    <>
                        <InfoListItem
                            hidePadding
                            title={<Typography variant="h6">Props & Code</Typography>}
                            rightComponent={
                                <IconButton onClick={(): void => setMobileDrawerOpen((o) => !o)}>
                                    {mobileDrawerOpen ? <KeyboardArrowDown /> : <KeyboardArrowUp />}
                                </IconButton>
                            }
                        />
                        <Tabs
                            centered
                            value={selectedTab}
                            textColor="primary"
                            onChange={(e, value: 'Props' | 'Code'): void => setSelectedTab(value)}
                            sx={{
                                width: '100%',
                                borderBottom: (t) => `1px solid ${t.palette.divider}`,
                                '& .MuiTabs-indicator': {
                                    backgroundColor: 'primary.main',
                                },
                            }}
                        >
                            <Tab
                                sx={{
                                    flex: 1,
                                    maxWidth: 'unset',
                                    color: 'text.primary',
                                    '&.Mui-selected': {
                                        color: 'primary.main',
                                    },
                                }}
                                label="Props"
                                value="Props"
                            />
                            <Tab
                                sx={{
                                    flex: 1,
                                    maxWidth: 'unset',
                                    color: 'text.primary',
                                    '&.Mui-selected': {
                                        color: 'primary.main',
                                    },
                                }}
                                label="Code"
                                value="Code"
                            />
                        </Tabs>
                        <Box sx={{ overflowY: 'auto', flex: '1 1 0px' }}>
                            {selectedTab === 'Props' && inputForm}
                            {selectedTab === 'Code' && <PlaygroundCodeBlock language={'jsx'} sx={{ height: '100%' }} />}
                        </Box>
                    </>
                )}
            </Drawer>
            {isMobile && (
                <InfoListItem
                    hidePadding
                    onClick={(): void => setMobileDrawerOpen((o) => !o)}
                    title={<Typography variant="h6">Props & Code</Typography>}
                    rightComponent={
                        <IconButton>{mobileDrawerOpen ? <KeyboardArrowDown /> : <KeyboardArrowUp />}</IconButton>
                    }
                    backgroundColor={theme.palette.background.paper}
                    sx={{ position: 'fixed', bottom: 0, width: '100%', boxShadow: 4 }}
                />
            )}
        </>
    );
};
export default PlaygroundDrawer;
