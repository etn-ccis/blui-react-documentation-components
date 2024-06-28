import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { PlaygroundCheckbox } from './PlaygroundCheckbox.component';

describe('PlaygroundCheckbox', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterEach(cleanup);

    it('should render the checkbox with default values', () => {
        render(<PlaygroundCheckbox id="checkboxId" type={'boolean'} />);
        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).toBeInTheDocument();
        expect(checkbox).not.toBeChecked();
    });

    it('should render the checkbox with custom label', () => {
        render(<PlaygroundCheckbox id="checkboxId" label="Custom Label" type={'boolean'} />);
        const label = screen.getByText('Custom Label');
        expect(label).toBeInTheDocument();
    });

    it('should render the description', () => {
        render(<PlaygroundCheckbox id="checkboxId" description="Checkbox description" type={'boolean'} />);
        const description = screen.getByText('Checkbox description');
        expect(description).toBeInTheDocument();
    });
});
