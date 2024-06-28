// TODO: Remove this after the issues with @types/react goes away

// https://github.com/DefinitelyTyped/DefinitelyTyped/discussions/68444

/* eslint-disable */

declare global {
    namespace React {
        interface DOMAttributes<T> {
            placeholder?: string | undefined;
            onPointerEnterCapture?: string | undefined;
            onPointerLeaveCapture?: string | undefined;
        }
    }
}

export * from './PlaygroundDrawer.component';
