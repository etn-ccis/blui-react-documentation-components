import React from 'react';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import { PlaygroundColorPicker } from './PlaygroundColorPicker.component';

describe('PlaygroundColorPicker', () => {
    afterEach(cleanup);
    it('should render the color picker', () => {
        render(<PlaygroundColorPicker id="colorPicker" type="color" />);
        const colorPicker = screen.getByRole('textbox', { name: /colorPicker/i });
        expect(colorPicker).toBeInTheDocument();
    });

    it('should update the color value when input changes', () => {
        render(<PlaygroundColorPicker id="colorPicker" type="color" />);
        const colorPicker = screen.getByRole('textbox', { name: /colorPicker/i });
        fireEvent.change(colorPicker, { target: { value: '#ff0000' } });
        expect(colorPicker).toHaveValue('#ff0000');
    });

    it('should display an error message for invalid color value', () => {
        render(<PlaygroundColorPicker id="colorPicker" type="color" required />);
        const colorPicker = screen.getByRole('textbox', { name: /colorPicker/i });
        fireEvent.change(colorPicker, { target: { value: 'invalid' } });
        const errorMessage = screen.getByText(/color value not recognized/i);
        expect(errorMessage).toBeInTheDocument();
    });
});
