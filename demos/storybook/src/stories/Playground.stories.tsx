import type { Meta, StoryObj } from '@storybook/react';
import {
    Playground as BLUIPlaygroundPage,
    CodeSnippetFunction,
    InputConfig,
    PreviewComponent,
    getPropsMapping,
    getPropsToString,
} from '@brightlayer-ui/react-doc-components';
import 'prismjs/components/prism-jsx.js';
import 'prismjs/themes/prism-tomorrow.css';
import { ChannelValue, ChannelValueProps } from '@brightlayer-ui/react-components';
import { TrendingDown, TrendingUp } from '@mui/icons-material';
import Stack from '@mui/material/Stack';
import './index.css';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: 'Components/Playground',
    component: BLUIPlaygroundPage,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'fullscreen',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    // tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    // argTypes: {
    //   backgroundColor: { control: 'color' },
    // },
} satisfies Meta<typeof BLUIPlaygroundPage>;

export default meta;
type Story = StoryObj<typeof BLUIPlaygroundPage>;

const inputConfig: InputConfig = [
    // Required Props
    {
        id: 'value',
        type: 'string',
        typeLabel: `number | string`,
        initialValue: '15',
        description: 'The value (bold text) to display',
        required: true,
        category: 'Required Props',
    },
    // Optional Props
    {
        id: 'units',
        type: 'string',
        initialValue: 'hz',
        typeLabel: 'string',
        description: 'The text to display for the units (light text)',
        required: false,
        category: 'Optional Props',
    },
    {
        id: 'icon',
        type: 'select',
        typeLabel: 'JSX.Element',
        description: 'The inline icon to display',
        initialValue: '<TrendingUp />',
        options: [
            { label: 'undefined', value: 'undefined' },
            { label: '<TrendingUp />', value: '<TrendingUp />' },
            { label: '<TrendingDown />', value: '<TrendingDown />' },
        ],
        required: false,
        category: 'Optional Props',
    },
    {
        id: 'fontSize',
        type: 'number',
        typeLabel: `number | string`,
        initialValue: 30,
        description: 'The size of the font',
        required: false,
        minValue: 10,
        maxValue: 50,
        valueStep: 10,
        category: 'Optional Props',
        defaultValue: 'inherit',
    },
    {
        id: 'color',
        label: 'color',
        type: 'color',
        typeLabel: 'string',
        description: 'The color of the font',
        required: false,
        category: 'Optional Props',
        defaultValue: 'inherit',
        allowMuiColors: true,
    },
    {
        id: 'prefix',
        type: 'boolean',
        initialValue: false,
        typeLabel: 'boolean',
        description: 'Show units before the value',
        required: false,
        category: 'Optional Props',
        defaultValue: false,
    },
    {
        id: 'unitSpace',
        type: 'select',
        typeLabel: `'auto' | 'show' | 'hide'`,
        initialValue: 'auto',
        options: [
            { label: 'auto', value: 'auto' },
            { label: 'hide', value: 'hide' },
            { label: 'show', value: 'show' },
        ],
        description: 'Show/Hide spacing between the value and units',
        required: false,
        category: 'Optional Props',
        defaultValue: 'auto',
    },
    // Other Configuration
    {
        id: 'htmlColor',
        type: 'color',
        initialValue: '#f33333',
        // typeLabel: 'string',
        description: 'The color applied to the primary icon',
        required: false,
        label: 'Icon Color',
        category: 'Other Configuration',
    },
];

const ChannelValuePreview: PreviewComponent = ({ data }) => {
    const { htmlColor, icon, ...rest } = data as unknown as ChannelValueProps & { htmlColor: string };
    const getIcon = (value: string): JSX.Element | undefined => {
        switch (value) {
            case '<TrendingUp />':
                return <TrendingUp htmlColor={htmlColor || 'inherit'} />;
            case '<TrendingDown />':
                return <TrendingDown htmlColor={htmlColor || 'inherit'} />;
            case 'undefined':
            default:
                return undefined;
        }
    };

    return (
        <Stack alignItems={'center'} justifyContent={'center'} sx={{ width: '100%', height: '100%' }}>
            <ChannelValue {...rest} icon={getIcon(icon as unknown as string)} />
        </Stack>
    );
};

const generateSnippet: CodeSnippetFunction = (data) =>
    `<ChannelValue 
	${getPropsToString(getPropsMapping(data, inputConfig), { join: '\n\t', skip: ['icon', 'htmlColor'] })}
  	${data.icon && data.icon !== 'undefined'
          ? `icon={${(data.icon as string).replace('/>', '')}fontSize={'inherit'}${
                data.htmlColor && data.htmlColor !== 'undefined' ? ` htmlColor={'${data.htmlColor as string}'}` : ''
            } />}`
          : ''
  }
/>`.replace(/^\s*$(?:\r\n?|\n)/gm, '');

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Playground: Story = {
    render: () => (
        <BLUIPlaygroundPage
            sx={{ height: '100vh' }}
            inputConfig={inputConfig}
            codeSnippet={generateSnippet}
            previewComponent={ChannelValuePreview}
        />
    ),
};
