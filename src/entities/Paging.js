import filter from '../misc/filter'
import _ from 'lodash'

export const PAGING_DEFAULT = {
    size: 20,
    min_page: 1,
    page: 1,
    total: 0,
    num_items: 2,
    max_total: 10000
}

export default class Paging {
    constructor(page = PAGING_DEFAULT.page, size = PAGING_DEFAULT.size, total = PAGING_DEFAULT.total, buildUrlFunc, unit = 'entries', numItems = PAGING_DEFAULT.num_items) {
        this.page = Math.max(PAGING_DEFAULT.min_page, page)
        this.size = size
        this.maxTotal = Math.min(total, PAGING_DEFAULT.max_total)
        this.total = filter.number(total)
        this.minPage = PAGING_DEFAULT.min_page
        this.maxPage = Math.max(this.minPage, Math.ceil(this.maxTotal / size))
        this.items = []
        this.unit = unit
        let min = Math.max(1, page - numItems)
        let max = Math.min(this.maxPage, page + numItems)
        if (page <= this.maxPage - numItems * 2) {
            min = page - numItems
        } else {
            min = this.maxPage - numItems * 2
        }
        min = Math.max(1, min)
        for (let i = min; i <= min + numItems * 2; i++) {
            if (i > this.maxPage) break
            this.items.push(i)
        }
        this.from = (this.page - 1) * this.size + 1
        this.to = filter.number(Math.min(this.from + this.size - 1, this.maxTotal))
        this.from = filter.number(this.from)
        this.empty = min === max
        this.buildUrl = _.isFunction(buildUrlFunc) ? buildUrlFunc : this._buildUrl
    }
    _buildUrl(page) {
        return `#${page}`
    }
}