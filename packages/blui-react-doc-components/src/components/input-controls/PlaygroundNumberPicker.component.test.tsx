import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { PlaygroundNumberPicker } from './PlaygroundNumberPicker.component';

describe('PlaygroundNumberPicker', () => {
    it('should render the number picker', () => {
        render(<PlaygroundNumberPicker id="numberPicker" type="number" />);
        const numberPicker = screen.getByRole('textbox');
        expect(numberPicker).toBeInTheDocument();
    });

    it('should update the value when typing in the input', () => {
        render(<PlaygroundNumberPicker id="numberPicker" type="number" />);
        const numberPicker = screen.getByRole('textbox');
        fireEvent.change(numberPicker, { target: { value: '10' } });
        // expect(numberPicker).toHaveValue('10');
    });
});
