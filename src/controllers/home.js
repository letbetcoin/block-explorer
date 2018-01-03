import BaseController from './base'
import explorer from '../services/explorer'
import ROUTER from '../config/router'

const HOME_ITEMS = 10

class HomeController extends BaseController {
    constructor() {
        super()
        this.processHomePage()
    }
    processHomePage() {
        this.router.get(ROUTER.home.path, (req, res, next) => {
            let data = {
                trans: {},
                block: {},
                error: null
            }
            Promise.all([
                explorer.searchBlock({
                    size: HOME_ITEMS
                }).then(blockResp => {
                    data.block = blockResp.data
                    data.error = data.error || blockResp.error
                    return blockResp
                }),
                explorer.searchTransactions({
                    size: HOME_ITEMS
                }).then(transResp => {
                    data.trans = transResp.data
                    data.error = data.error || transResp.error
                    return transResp
                })
            ]).then(() => {
                this.buildResponse(ROUTER.home.view, req, res, next, null, null, {
                    title: ROUTER.home.title,
                    subtitle: req.params.id,
                    ...data
                })
            })
        })
    }
}

export default new HomeController()