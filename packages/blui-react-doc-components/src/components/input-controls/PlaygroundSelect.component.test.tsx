import React from 'react';
import { render, screen } from '@testing-library/react';
import { PlaygroundSelect } from './PlaygroundSelect.component';

describe('PlaygroundSelect', () => {
    const options = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
    ];

    it('should render the select component', () => {
        render(<PlaygroundSelect options={options} id={''} type={'select'} />);
        const selectElement = screen.getByRole('combobox');
        expect(selectElement).toBeInTheDocument();
    });
});
