import moment from 'moment'
import _ from 'lodash'
import conf from '../config'

const FORMAT = {
    datetime: 'LLLL Z'
}

export const number = (number, defaultText = '0') => {
    var arr = `${parseFloat(number || 0) || defaultText}`.split('.')
    return `${arr[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')}${arr.length > 1 ? `.${arr[1]}` : ''}`
}

export const decimal = (number, defaultText = '', digrit = 3, fixed = false) => {
    let val = parseFloat(number || 0).toFixed(digrit)
    if (!fixed) {
        val = val.replace(/(\.\d+?)0*$/, '$1').replace(/\.0$/, '').replace(/^0*?(0\.|[^0]+)/, '$1')
    }
    var arr = `${val || defaultText}`.split('.')
    return `${arr[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')}${arr.length > 1 ? `.${arr[1]}` : ''}`
}

export const ccvalue = (number) => {
    let valInt = parseInt(number || '0')
    return decimal(number, '0', 9 - `${valInt}`.length)
}

export const lbt = (number) => {
    return `${ccvalue(number)} ${conf.server.coin_symbol}`
}

export const datetime = value => moment.unix(value).format(FORMAT.datetime)
export const age = value => moment(value * 1000).fromNow()
export const percent = value => `${decimal(value * 100, '0', 2, true)}%`
export const hex = value => _.isNumber(value) ? `0x${value.toString(16)}` : ''

export default {
    number,
    decimal,
    ccvalue,
    datetime,
    percent,
    age,
    hex,
    lbt
}