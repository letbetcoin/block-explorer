export const ROUTER = {
    home: {
        title: '',
        path: '/',
        view: 'pages/home'
    },
    block_listing: {
        title: 'All Blocks',
        path: '/blocks',
        view: 'pages/block-listing'
    },
    block_detail: {
        title: 'Block',
        path: '/block',
        view: 'pages/block'
    },
    transaction_detail: {
        title: 'Transaction',
        path: '/tx',
        view: 'pages/transaction'
    },
    all_transactions: {
        title: 'Transactions',
        path: '/txs',
        view: 'pages/transaction-listing'
    },
    pending_transactions: {
        title: 'Pending Transactions',
        path: '/txs-pending',
        view: 'pages/pending-transactions'
    },
    address_detail: {
        title: 'Address',
        path: '/address',
        view: 'pages/transaction-listing'
    }
}

export default ROUTER