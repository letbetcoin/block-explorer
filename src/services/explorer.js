import elasticsearch from 'elasticsearch'
import conf from '../config'
import BlockInfo from '../entities/BlockInfo'
import TransactionInfo from '../entities/TransactionInfo'
import SearchResponse from '../entities/SearchResponse'

var _instance = {
    _client: null,
    getClient() {
        if (!this._client) {
            _instance._client = new elasticsearch.Client({
                host: conf.explorer.host,
                log: conf.debug.es_client
            })
        }
        return _instance._client
    }
}

export default {
    getBlock(id, callback) {
        return new Promise(resolve => {
            _instance.getClient().get({
                index: conf.block.index,
                type: conf.block.type,
                id: id
            }, (error, response) => {
                resolve({
                    error,
                    data: new BlockInfo(response)
                })
            })
        })
    },
    searchBlock(filters = {}) {
        const {
            from = 0,
                size = 10,
                sort = 'timestamp_num:desc'
        } = filters
        return new Promise(resolve => {
            _instance.getClient().search({
                index: conf.block.index,
                type: conf.block.type,
                size: size,
                from: from,
                sort: sort
            }, (error, response) => {
                let data = new SearchResponse(response)
                data.items = data.items.map(item => new BlockInfo(item))
                resolve({
                    error,
                    data: data
                })
            })
        })
    },
    getTransaction(txHash, callback) {
        return new Promise(resolve => {
            _instance.getClient().get({
                index: conf.transaction.index,
                type: conf.transaction.type,
                id: txHash
            }, (error, response) => {
                resolve({
                    error,
                    data: new TransactionInfo(response)
                })
            })
        })
    },
    searchTransactions(filters = {}) {
        const {
            from = 0,
                size = 10,
                pending = false,
                address = null,
                block = '',
                sort = 'receipt.block_timestamp:desc'
        } = filters
        let blockBool = block ? [{
            term: {
                'tx.block_number': block
            }
        }] : {}
        let addressBool = address ? {
            should: [{
                term: {
                    'tx.from': address
                }
            }, {
                term: {
                    'tx.to': address
                }
            }],
            'minimum_should_match': 1
        } : {}
        return new Promise(resolve => {
            _instance.getClient().search({
                index: conf.transaction.index,
                type: conf.transaction.type,
                size: size,
                from: from,
                sort: sort,
                body: {
                    query: {
                        bool: {
                            must: [
                                ...blockBool,
                                ...[{
                                    term: {
                                        'tx.is_pending': pending
                                    }
                                }]
                            ],
                            ...addressBool
                        }
                    }
                }
            }, (error, response) => {
                let data = new SearchResponse(response)
                data.items = data.items.map(item => new TransactionInfo(item))
                resolve({
                    error,
                    data: data
                })
            })
        })
    }
}