import { createContext, useContext } from 'react';
import { CodeSnippetFunction, FieldValue, InputConfig, PreviewComponent } from '../types/Playground.types';

type PlaygroundValuesContextProps = {
    data: {
        [key: string]: FieldValue;
    };
    updateData: (id: string, value: FieldValue) => void;
    inputConfig: InputConfig;
    codeSnippet: CodeSnippetFunction;
    previewComponent: PreviewComponent;
};

export const PlaygroundValuesContext = createContext<PlaygroundValuesContextProps>({
    data: {},
    updateData: () => {},
    inputConfig: [],
    codeSnippet: () => '',
    previewComponent: () => null,
});

export const usePlaygroundValues = (): PlaygroundValuesContextProps => useContext(PlaygroundValuesContext);
