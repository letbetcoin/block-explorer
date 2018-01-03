module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module'
    },
    env: {
        browser: true,
        mocha: true,
        jquery: true
    },
    globals: {
        describe: true
    },
    extends: ['standard'],
    plugins: [
        'html',
        // 'mocha'
    ],
    'rules': {
        'indent': 0,
        'space-before-function': 0,
        'space-before-function-paren': 0,
        'spaced-comment': 0,
        'no-multiple-empty-lines': 0,
        'no-unused-vars': 1,
        'no-extra-bind': 0,
        'arrow-parens': 0,
        'generator-star-spacing': 0,
        'padded-blocks': 0,
        'quotes': [1, 'single'],
        'semi': [1, 'never'],
        'no-unused-vars': 1,
        'linebreak-style': [2, 'unix'],
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,
        'eol-last': 0,
        'camelcase': 0,
        'no-tabs': 0,
        'no-mixed-spaces-and-tabs': 0,
        'key-spacing': 0,
        'handle-callback-err': 0,
        'eqeqeq': 1,
        'no-new': 1
    }
}