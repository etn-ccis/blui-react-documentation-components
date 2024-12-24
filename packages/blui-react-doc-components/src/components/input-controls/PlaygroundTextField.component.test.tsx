import React from 'react';
import { render, screen } from '@testing-library/react';
import { PlaygroundTextField } from './PlaygroundTextField.component';

describe('PlaygroundTextField', () => {
    it('should render the text field with default values', () => {
        render(<PlaygroundTextField id="example" type={'string'} />);

        const textField = screen.getByLabelText('example');

        expect(textField).toBeInTheDocument();
        expect(textField).toHaveValue('');
        expect(textField).toHaveAttribute('type', 'text');
        expect(textField).not.toHaveAttribute('required');
        expect(textField).not.toHaveAttribute('description');
    });

    // it('should update the value when input changes', () => {
    //     render(<PlaygroundTextField id="example" type={'string'} required />);
    //     const textField = screen.getByLabelText('example');
    //     fireEvent.change(textField, { target: { value: 'New value' } });
    //     expect(textField).toBe('New value');
    // });
});
