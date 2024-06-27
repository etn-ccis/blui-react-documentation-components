import React from 'react';
import { render } from '@testing-library/react';
import { PlaygroundPreview } from './PlaygroundPreview.component';

describe('PlaygroundPreview', () => {
  it('should render the component', () => {
    render(<PlaygroundPreview />);
  });
});