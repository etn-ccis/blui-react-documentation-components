import bluiTsxConfig from '@brightlayer-ui/eslint-config/tsx.js';
import jestDom from 'eslint-plugin-jest-dom';
import testingLibrary from 'eslint-plugin-testing-library';

export default [
    // Extend the Brightlayer UI TSX configuration
    ...bluiTsxConfig,
    
    // Override configuration for all files
    {
        files: ['**/*.{ts,tsx,js,jsx}'],
        languageOptions: {
            parserOptions: {
                project: './tsconfig.json',
                ecmaVersion: 'latest',
                sourceType: 'module',
            },
        },
        plugins: {
            'jest-dom': jestDom,
            'testing-library': testingLibrary,
        },
        rules: {
            // Override rules from the original .eslintrc.js
            '@typescript-eslint/no-empty-function': 'off',
            'no-empty-function': 'off',
            '@typescript-eslint/naming-convention': [
                'error',
                {
                    selector: [
                        'classProperty',
                        'objectLiteralProperty',
                        'typeProperty',
                        'classMethod',
                        'objectLiteralMethod',
                        'typeMethod',
                        'accessor',
                        'enumMember',
                    ],
                    format: null,
                    modifiers: ['requiresQuotes'],
                },
            ],
        },
    },
    
    // Configuration for test files with Jest globals
    {
        files: ['**/*.test.{ts,tsx,js,jsx}', '**/*.spec.{ts,tsx,js,jsx}'],
        languageOptions: {
            globals: {
                // Jest globals
                describe: 'readonly',
                it: 'readonly',
                test: 'readonly',
                expect: 'readonly',
                beforeEach: 'readonly',
                afterEach: 'readonly',
                beforeAll: 'readonly',
                afterAll: 'readonly',
                jest: 'readonly',
            },
        },
    },
];