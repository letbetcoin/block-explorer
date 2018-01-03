import _ from 'lodash'
import generic from '../misc/generic'

export default class SearchResponse extends generic.Entity {
    constructor(data) {
        super(data, {
            items: ['hits.hits', generic.Array],
            total: ['hits.total', generic.Number]
        })
    }

    set _items(value) {
        if (_.isArray(value)) {
            this.items = value
        }
    }

    set _total(value) {
        if (_.isNumber(value)) {
            this.total = value
        }
    }
}