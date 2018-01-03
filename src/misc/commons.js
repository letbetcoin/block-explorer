import _ from 'lodash'
export default {
    buildParams(object) {
        let res = ''
        if (_.isObject(object)) {
            for (let k in object) {
                let val = object[k]
                if (val === undefined || val === null) {
                    val = ''
                }
                if (_.isArray(val)) {
                    val = val.join(',')
                }
                if (val) {
                    res += res ? `&${k}=${val}` : `${k}=${val}`
                }
            }
        }
        return res
    }
}