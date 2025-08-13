// @ts-check
const eslint = require('@eslint/js')
const tseslint = require('typescript-eslint')
const angular = require('angular-eslint')
const prettierPlugin = require('eslint-plugin-prettier')
const fs = require('fs')

// Load Prettier settings from .prettierrc
const prettierConfig = JSON.parse(fs.readFileSync('.prettierrc', 'utf8'))

module.exports = tseslint.config(
  {
    ignores: ['node_modules', 'dist', 'coverage'],
  },
  // TypeScript + Angular rules
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        { type: 'attribute', prefix: 'app', style: 'camelCase' },
      ],
      '@angular-eslint/component-selector': [
        'error',
        { type: 'element', prefix: 'app', style: 'kebab-case' },
      ],
      semi: ['error', 'never'],
      'prettier/prettier': ['error', prettierConfig],
    },
  },
  // Application-specific rules
  {
    files: ['src/app/**/*.{ts,js}'],
    rules: {
      semi: ['error', 'never'],
      'prettier/prettier': ['error', prettierConfig],
      'no-console': ['error', { allow: ['warn', 'error'] }],
      '@typescript-eslint/no-unused-vars': ['error'],
      '@angular-eslint/sort-lifecycle-methods': 'error',
      'no-duplicate-imports': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@angular-eslint/no-output-on-prefix': 'error',
      '@angular-eslint/no-empty-lifecycle-method': 'error',
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        {
          allowExpressions: false,
          allowTypedFunctionExpressions: true,
          allowHigherOrderFunctions: false,
          allowConciseArrowFunctionExpressionsStartingWithVoid: true,
          allowedNames: [
            'ngOnInit',
            'ngOnDestroy',
            'ngOnChanges',
            'ngAfterViewInit',
            'ngAfterContentInit',
            'ngAfterContentChecked',
            'ngAfterViewChecked',
          ],
        },
      ],
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        {
          accessibility: 'explicit',
          overrides: {
            constructors: 'no-public',
            methods: 'explicit',
            properties: 'explicit',
          },
          ignoredMethodNames: [
            'ngOnInit',
            'ngOnDestroy',
            'ngOnChanges',
            'ngAfterViewInit',
            'ngAfterContentInit',
            'ngAfterContentChecked',
            'ngAfterViewChecked',
          ],
        },
      ],
    },
  },
  // HTML template rules
  {
    files: ['**/*.html'],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
    rules: {
      '@angular-eslint/template/eqeqeq': 'error',
      '@angular-eslint/template/no-any': 'error',
      '@angular-eslint/template/prefer-control-flow': 'warn',
    },
  },
)
