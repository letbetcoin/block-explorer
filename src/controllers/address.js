import BaseController from './base'
import explorer from '../services/explorer'
import ROUTER from '../config/router'
import Paging from '../entities/Paging'
import urlBuilder from '../misc/url'

class AddressController extends BaseController {
	constructor() {
		super()
		this.processAddressDetail()
	}
	processAddressDetail() {
		this.router.get(`${ROUTER.address_detail.path}/:id`, (req, res, next) => {
			let page = this.parsePage(req.query.page)
			let size = this.parseSize(req.query.size)
			explorer.searchTransactions({
				from: this.calcFrom(page, size),
				size: size,
				address: req.params.id
			}).then(({
				error,
				data
			}) => {
				return this.buildResponse(ROUTER.address_detail.view, req, res, next, data, error, {
					title: ROUTER.address_detail.title,
					subtitle: req.params.id,
					paging: new Paging(page, size, data.total, mpage => {
						return `${urlBuilder.addressDetail(req.params.id || '', mpage)}`
					}, 'transactions')
				})
			})
		})
	}
}

export default new AddressController()