import generic from '../misc/generic'

export const TRANSACTION = {
    status_ids: {
        fail: 0,
        success: 1,
        pending: 2
    },
    status_name: {
        0: 'Fail',
        1: 'Success',
        2: 'Pending'
    },
    status_class_name: {
        0: 'd-inline p-2 bg-danger text-white',
        1: 'd-inline p-2 bg-success text-white',
        2: 'd-inline p-2 bg-info text-white'
    }
}

export class TransactionInfo extends generic.Entity {
    constructor(data) {
        super(data, {
            hash: ['_source.tx.hash', generic.String],
            nonce: ['_source.tx.nonce', generic.String],
            block_hash: ['_source.tx.block_hash', generic.String],
            block_number: ['_source.tx.block_number', generic.Hex],
            block_number_hex: ['_source.tx.block_number', generic.String],
            transaction_index: ['_source.tx.transaction_index', generic.Hex],
            from: ['_source.tx.from', generic.String],
            to: ['_source.tx.to', generic.String],
            value: ['_source.tx.value', generic.Hex],
            is_pending: ['_source.tx.is_pending', generic.Boolean],
            received_timestamp: ['_source.tx.received_timestamp', generic.Number],
            gas_price: ['_source.tx.gas_price', generic.Hex],
            gas: ['_source.tx.gas', generic.Hex],
            gas_used: ['_source.receipt.gas_used', generic.Hex],
            cumulative_gas_used: ['_source.receipt.cumulative_gas_used', generic.Hex],
            input: ['_source.tx.input', generic.String],
            creates: ['_source.tx.creates', generic.String],
            public_key: ['_source.tx.public_key', generic.String],
            raw: ['_source.tx.raw', generic.String],
            contract_address: ['_source.receipt.contract_address', generic.String],
            status: ['_source.receipt.status', generic.Hex],
            block_timestamp: ['_source.receipt.block_timestamp', generic.Number]
        })
        this.tx_fee = this.gas_used * this.gas_price
        this.status = this.is_pending ? TRANSACTION.status_ids.pending : this.status
        this.timestamp = this.is_pending ? this.received_timestamp : this.block_timestamp
        this.status_name = TRANSACTION.status_name[this.status] || ''
        this.status_class_name = TRANSACTION.status_class_name[this.status] || ''
    }
}

export default TransactionInfo