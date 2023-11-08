import Tooltip, { TooltipProps } from '@mui/material/Tooltip';
import React, { useState } from 'react';
import CopyAllIcon from '@mui/icons-material/CopyAll';
import Button, { ButtonProps } from '@mui/material/Button';

type CopyToClipboardProps = ButtonProps & {
    TooltipProps?: Omit<Partial<TooltipProps>, 'open' | 'children'> & { copiedTitle?: string; duration?: number };
    copyContent: string;
};

export function copyTextToClipboard(text: string, onCopied?: () => void): void {
    void navigator.clipboard.writeText(text);
    if (onCopied) onCopied();
}

export const CopyToClipboardButton: React.FC<CopyToClipboardProps> = (props) => {
    const {
        TooltipProps: {
            title = '',
            copiedTitle = 'Copied',
            duration = 1000,
            placement = 'bottom',
            ...otherTooltipProps
        } = {},
        copyContent,
        ...buttonProps
    } = props;
    const [isCopied, setIsCopied] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);

    return (
        <Tooltip {...otherTooltipProps} title={isCopied ? copiedTitle : title} placement={placement} open={showTooltip}>
            <Button
                // overridable props
                variant="outlined"
                startIcon={<CopyAllIcon />}
                {...buttonProps}
                // mergeable props
                onMouseEnter={(e): void => {
                    if (!isCopied) setShowTooltip(true);
                    buttonProps?.onMouseEnter?.(e);
                }}
                onMouseLeave={(e): void => {
                    if (!isCopied) setShowTooltip(false);
                    buttonProps?.onMouseLeave?.(e);
                }}
                onClick={(e): void => {
                    copyTextToClipboard(copyContent, () => {
                        setIsCopied(true);
                        setShowTooltip(true);
                        setTimeout(() => {
                            setShowTooltip(false);
                            setTimeout(() => setIsCopied(false), 200);
                        }, duration);
                    });
                    buttonProps?.onClick?.(e);
                }}
            >
                {buttonProps.children ?? 'Copy All'}
            </Button>
        </Tooltip>
    );
};
