import explorer from '../services/explorer'
import BaseController from './base'
import ROUTER from '../config/router'
import urlBuilder from '../misc/url'
import Paging from '../entities/Paging'

class BlockController extends BaseController {
	constructor() {
		super()
		this.processBlockDetail()
		this.processBlockListing()
	}
	processBlockDetail() {
		this.router.get(`${ROUTER.block_detail.path}/:id`, (req, res, next) => {
			explorer.getBlock(req.params.id).then(({
				error,
				data
			}) => {
				return this.buildResponse(ROUTER.block_detail.view, req, res, next, data, error, {
					id: req.params.id,
					title: ROUTER.block_detail.title,
					subtitle: `#${data.number || 'not-found'}`
				})
			})
		})
	}
	processBlockListing() {
		this.router.get(ROUTER.block_listing.path, (req, res, next) => {
			let page = this.parsePage(req.query.page)
			let size = this.parseSize(req.query.size)
			explorer.searchBlock({
				from: this.calcFrom(page, size),
				size
			}).then(({
				error,
				data
			}) => {
				return this.buildResponse(ROUTER.block_listing.view, req, res, next, data, error, {
					id: req.params.id,
					title: ROUTER.block_listing.title,
					// subtitle: `#${data.number || 'not-found'}`,
					paging: new Paging(page, size, data.total, urlBuilder.blockListing, 'blocks')
				})
			})
		})
	}
}

export default new BlockController()