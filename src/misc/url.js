import ROUTER from '../config/router'
import commons from '../misc/commons'
export default {
    home() {
        return ROUTER.home.path
    },
    blockDetail(blockHash = '') {
        return `${ROUTER.block_detail.path}/${blockHash}`
    },
    blockListing(page) {
        if (page > 1) {
            return `${ROUTER.block_listing.path}?page=${page}`
        }
        return ROUTER.block_listing.path
    },
    transactionDetail(txhash = '') {
        return `${ROUTER.transaction_detail.path}/${txhash}`
    },
    allTransactions(page = 1, blockNumber = '') {
        let res = ROUTER.all_transactions.path
        let params = {}
        if (page > 1) {
            params.page = page
        }
        if (blockNumber) {
            params.block = blockNumber
        }
        params = commons.buildParams(params)
        return params ? `${res}?${params}` : res
    },
    pendingTransactions(page = 1) {
        if (page > 1) {
            return `${ROUTER.pending_transactions.path}?page=${page}`
        }
        return ROUTER.pending_transactions.path
    },
    addressDetail(address, page = 1) {
        if (page > 1) {
            return `${ROUTER.address_detail.path}/${address}?page=${page}`
        }
        return `${ROUTER.address_detail.path}/${address}`
    }
}