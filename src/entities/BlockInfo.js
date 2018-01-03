import generic from '../misc/generic'

export class BlockInfo extends generic.Entity {
    constructor(data) {
        super(data, {
            number: ['_source.number', generic.Hex],
            hash: ['_source.hash', generic.String],
            parent_hash: ['_source.parent_hash', generic.String],
            nonce: ['_source.nonce', generic.String],
            sha3_uncles: ['_source.sha3_uncles', generic.String],
            logs_bloom: ['_source.logs_bloom', generic.String],
            transactions_root: ['_source.transactions_root', generic.String],
            state_root: ['_source.state_root', generic.String],
            receipts_root: ['_source.receipts_root', generic.String],
            author: ['_source.author', generic.String],
            miner: ['_source.miner', generic.String],
            mix_hash: ['_source.mix_hash', generic.String],
            difficulty: ['_source.difficulty', generic.Hex],
            total_difficulty: ['_source.total_difficulty', generic.Hex],
            extra_data: ['_source.extra_data', generic.String],
            size: ['_source.size', generic.Hex],
            gas_limit: ['_source.gas_limit', generic.Hex],
            gas_used: ['_source.gas_used', generic.Hex],
            timestamp: ['_source.timestamp', generic.Hex],
            number_transaction: ['_source.number_transaction', generic.Number],
            uncles: ['_source.uncles', generic.Array],
            seal_fields: ['_source.seal_fields', generic.Array]
        })
    }
}

export default BlockInfo