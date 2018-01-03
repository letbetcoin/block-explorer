import generic from '../misc/generic'
import filter from '../misc/filter'
import url from '../misc/url'
import calc from '../misc/calc'
import menu from '../misc/menu'
import _ from 'lodash'

export default class DataResponse extends generic.Entity {
    constructor(data) {
        super(data, {
            _error: ['error', generic.Any],
            data: ['data', generic.Object],
            title: ['title', generic.String],
            body: ['body', generic.String]
        })
        this.format = filter
        this.url = url
        this.calc = calc
        this.menu = menu
    }
    set _error(value) {
        this.error = DataResponse.checkError(value)
    }
    static checkError(error) {
        if (error && !_.isEmpty(error)) {
            return error
        }
        return false
    }
}