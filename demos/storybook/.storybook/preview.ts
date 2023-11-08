import type { Preview } from "@storybook/react";
// import Prism from 'prismjs';
// prismJs
// import 'prismjs/components/prism-jsx.js';
// // import 'prismjs/plugins/line-numbers/prism-line-numbers.js';
// // import 'prismjs/plugins/line-highlight/prism-line-highlight.js';
// import 'prismjs/themes/prism-tomorrow.css';
// // import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
// // import 'prismjs/plugins/line-highlight/prism-line-highlight.css';
import '../index.css';

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
};

export default preview;
