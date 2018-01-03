var _intance = {}

function getConfig(mode) {
    try {
        console.log('[LOADING CONFIG] mode=%s', mode)
        _intance = require(`../../config/${mode}`)
        console.log('[LOADING CONFIG] SUCCEEDED')
    } catch (ex) {
        console.error('Load config fail with mode=%s', mode)
    }
    return _intance
}

export default {
    server: {
        app_name: 'LBT Block Explorer',
        base_url: '/',
        public_path: '/public/',
        coin_symbol: 'LBT'
    },
    debug: {
        es_client: 'trace',
        error_stack: true,
        morgan: 'dev'
    },
    copyright: {
        name: 'Localhost',
        url: 'https://localhost',
        time: '2017'
    },
    social: {
        facebook: 'https://facebook.com/localhost',
        github: 'https://twitter.com/localhost',
        twitter: 'https://github.com/localhost'
    },
    quick_links: [{
        name: 'Wallet',
        url: 'https://wallet.localhost'
    }, {
        name: 'ICO',
        url: 'https://ico.localhost'
    }, {
        name: 'Games',
        url: 'https://game.localhost'
    }, {
        name: 'Network Stats',
        url: 'https://stats.localhost'
    }],
    explorer: {
        host: process.env.ES_HTTP_URL
    },
    ...getConfig(process.env.MODE)
}