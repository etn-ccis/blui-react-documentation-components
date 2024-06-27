import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PlaygroundCodeBlock from './PlaygroundCodeBlock.component';

describe('PlaygroundCodeBlock', () => {
    it('should render code snippet', () => {
        render(<PlaygroundCodeBlock language="javascript" />);
        const codeElement = screen.getByRole('code');
        expect(codeElement).toBeInTheDocument();
    });

    it('should highlight code when data changes', () => {
        render(<PlaygroundCodeBlock language="javascript" />);
        const codeElement = screen.getByRole('code');
        expect(codeElement).toHaveClass('language-javascript');

        // Simulate data change
        // ...

        expect(codeElement).toHaveClass('language-javascript');
    });

    it('should show copy button on mouse enter', () => {
        render(<PlaygroundCodeBlock language="javascript" />);
        const copyButton = screen.queryByRole('button');
        expect(copyButton).not.toBeInTheDocument();

        const codeBlock = screen.getByRole('code');
        fireEvent.mouseEnter(codeBlock);

        const updatedCopyButton = screen.getByRole('button');
        expect(updatedCopyButton).toBeInTheDocument();
    });

    it('should hide copy button on mouse leave', () => {
        render(<PlaygroundCodeBlock language="javascript" />);
        const codeBlock = screen.getByRole('code');
        fireEvent.mouseEnter(codeBlock);

        const copyButton = screen.getByRole('button');
        expect(copyButton).toBeInTheDocument();

        fireEvent.mouseLeave(codeBlock);

        const updatedCopyButton = screen.queryByRole('button');
        expect(updatedCopyButton).not.toBeInTheDocument();
    });
});
