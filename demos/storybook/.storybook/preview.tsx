import React from 'react';
import type { Preview } from "@storybook/react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { blueDark as blue } from '@brightlayer-ui/react-themes';
import { CssBaseline } from '@mui/material';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={createTheme(blue)}>
        <CssBaseline />
        {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default preview;
