import React from 'react';
import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import { CopyToClipboardButton } from './CopyToClipboardButton.component';

afterEach(cleanup);

describe('CopyToClipboardButton', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render the button', () => {
        render(<CopyToClipboardButton copyContent={'Code snippet'} />);
    });

    it('should render the button with default text', () => {
        render(<CopyToClipboardButton copyContent="Code snippet" />);
        expect(screen.getByRole('button')).toHaveTextContent('Copy All');
    });

    // it('should not show tooltip when already copied', async () => {
    //   render(<CopyToClipboardButton copyContent="Code snippet" />);
    //   const button = screen.getByRole('button');

    //   fireEvent.click(button);
    //   fireEvent.click(button);

    //   await waitFor(() => {
    //     expect(copyTextToClipboard).toHaveBeenCalledTimes(2);
    //   });
    // });
});
