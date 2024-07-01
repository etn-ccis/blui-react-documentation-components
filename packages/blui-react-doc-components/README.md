[![Build](https://github.com/etn-ccis/blui-react-documentation-components/actions/workflows/blui-ci.yml/badge.svg?branch=master)](https://github.com/etn-ccis/blui-react-documentation-components/actions/workflows/blui-ci.yml) ![npm](https://img.shields.io/npm/v/@brightlayer-ui/react-doc-components?label=%40brightlayer-ui%2Freact-doc-components) 

# React Documentation Components

This library contains components that are used to build component documentation. They can be used to create "Playground" pages, which are similar to Storybook stories, but built using the BLUI design standards and components. These playground pages allows a user to toggle different values for various configurable properties and then see a running code example and code snippet that reflect the selected values.

## Installation

To install the components from NPM as a dependency for your project, you can run the following command in your project root:

```shell
yarn add @brightlayer-ui/react-doc-components
```

You will also need to make sure you have all of the required peer dependencies installed (this library relies on both MUI and BLUI components):

```shell
yarn add @brightlayer-ui/react-components @emotion/react @emotion/styled @mui/icons-material @mui/material react
```

## Usage

When building a component documentation page / playground, you will need to configure the inputs to display in the sidebar, the component you would like to render for the live demo based on the inputs, and the code snippet you would like to display. Here is a simple example using the BLUI ChannelValue component:

```tsx
import React from 'react';
import { ChannelValue, ChannelValueProps } from '@brightlayer-ui/react-components';
import TrendingDown from '@mui/icons-material/TrendingDown';
import TrendingUp from '@mui/icons-material/TrendingUp';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { InputConfig, PreviewComponent, CodeSnippetFunction, getPropsToString, getPropsMapping, Playground } from '@brightlayer-ui/react-doc-components';


const inputConfig: InputConfig = [
    // Required Props
    {
        id: 'value',
        type: 'string',
        typeLabel: `number | string`,
        initialValue: '15',
        description: 'The value (bold text) to display',
        required: true,
        category: 'Required Props'
    },
    // Optional Props
    {
        id: 'units',
        type: 'string',
        initialValue: 'hz',
        typeLabel: 'string',
        description: 'The text to display for the units (light text)',
        required: false,
        category: 'Optional Props'
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
            { label: '<TrendingDown />', value: '<TrendingDown />' }
        ],
        required: false,
        category: 'Optional Props'
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
        defaultValue: 'inherit'
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
            { label: 'show', value: 'show' }
        ],
        description: 'Show/Hide spacing between the value and units',
        required: false,
        category: 'Optional Props',
        defaultValue: 'auto'
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
        category: 'Other Configuration'
    },
];


const ChannelValuePreview: PreviewComponent = ({ data }) => {
    const { htmlColor, icon, ...rest } = data as unknown as ChannelValueProps & { htmlColor: string };
    const getIcon = (value: string): JSX.Element | undefined => {
        switch (value) {
            case '<TrendingUp />': return <TrendingUp htmlColor={htmlColor || 'inherit'} />;
            case '<TrendingDown />': return <TrendingDown htmlColor={htmlColor || 'inherit'} />;
            case 'undefined':
            default:
                return undefined;
        }
    }

    return (
        <Stack alignItems={'center'} justifyContent={'center'} sx={{ width: '100%', height: '100%' }}>
            <ChannelValue
                {...rest}
                icon={getIcon(icon as unknown as string)}
            />
        </Stack>
    )
}

const generateSnippet: CodeSnippetFunction = (data) => `<ChannelValue 
    ${getPropsToString(getPropsMapping(data, inputConfig), { join: '\n\t', skip: ['icon', 'htmlColor'] })}
    ${data.icon && data.icon !== 'undefined' ? `icon={${(data.icon as string).replace('/>', '')}fontSize={'inherit'}${data.htmlColor && data.htmlColor !== 'undefined' ? ` htmlColor={'${data.htmlColor as string}'}` : ''} />}` : ''}
/>`.replace(/^\s*$(?:\r\n?|\n)/gm, '')


export const ChannelValuePlayground = (): JSX.Element => (
    <Box sx={{ flex: '1 1 0px', minHeight: 0 }}>
        <Playground
            inputConfig={inputConfig}
            codeSnippet={generateSnippet}
            previewComponent={ChannelValuePreview}
        />
    </Box>
);

```

![ChannelValue Example](https://raw.githubusercontent.com/etn-ccis/blui-react-documentation-components/main/packages/blui-react-doc-components/media/example.png)