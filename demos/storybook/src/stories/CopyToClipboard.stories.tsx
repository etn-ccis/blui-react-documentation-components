import type { Meta, StoryObj } from '@storybook/react';
import { CopyToClipboardButton } from '@brightlayer-ui/react-doc-components';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: 'Components/ClipboardButton',
    component: CopyToClipboardButton,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    // tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    // argTypes: {
    //   backgroundColor: { control: 'color' },
    // },
} satisfies Meta<typeof CopyToClipboardButton>;

export default meta;
type Story = StoryObj<typeof CopyToClipboardButton>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const ClipboardButton: Story = {
    args: {
        copyContent: 'Copy me to the clipboard',
        children: 'Copy All',
        variant: 'outlined',
        TooltipProps: {
            duration: 1000,
            placement: 'bottom',
            copiedTitle: 'Copied!',
        },
    },
};
