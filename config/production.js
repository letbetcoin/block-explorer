module.exports = {
    server: {
        app_name: 'LBT Block Explorer',
        base_url: '/',
        public_path: '/public/',
        coin_symbol: 'LBT'
    },
    debug: {
        es_client: ['error'],
        error_stack: false,
        morgan: 'combined'
    },
    copyright: {
        name: 'Let.bet',
        url: 'https://let.bet',
        time: '2017'
    },
    social: {
        facebook: 'https://facebook.com/letbetcoin',
        github: 'https://twitter.com/letbetcoin',
        twitter: 'https://github.com/letbetcoin'
    },
    quick_links: [{
        name: 'Wallet',
        url: 'https://wallet.let.bet'
    }, {
        name: 'ICO',
        url: 'https://ico.let.bet'
    }, {
        name: 'Games',
        url: 'https://game.let.bet'
    }, {
        name: 'Network Stats',
        url: 'https://stats.let.bet'
    }],
    explorer: {
        host: process.env.ES_HTTP_URL
    },
    block: {
        index: process.env.ES_BLOCK_INDEX,
        type: process.env.ES_BLOCK_TYPE
    },
    transaction: {
        index: process.env.ES_TX_INDEX,
        type: process.env.ES_TX_TYPE
    }
}