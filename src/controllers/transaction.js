import BaseController from './base'
import explorer from '../services/explorer'
import ROUTER from '../config/router'
import Paging from '../entities/Paging'
import urlBuilder from '../misc/url'
import filter from '../misc/filter'

class TransactionController extends BaseController {
	constructor() {
		super()
		this.processTransactionDetail()
		this.processAllTransaction()
		this.processPendingTransactions()
	}
	processTransactionDetail() {
		this.router.get(`${ROUTER.transaction_detail.path}/:id`, (req, res, next) => {
			return explorer.getTransaction(req.params.id).then(({
				error,
				data
			}) => {
				return this.buildResponse(ROUTER.transaction_detail.view, req, res, next, data, error, {
					title: ROUTER.transaction_detail.title,
					subtitle: req.params.id
				})
			})
		})
	}
	processAllTransaction() {
		this.router.get(ROUTER.all_transactions.path, (req, res, next) => {
			let page = this.parsePage(req.query.page)
			let size = this.parseSize(req.query.size)
			let block = req.query.block
			return explorer.searchTransactions({
				from: this.calcFrom(page, size),
				size: size,
				block: block ? filter.hex(parseInt(block)) : ''
			}).then(({
				error,
				data
			}) => {
				return this.buildResponse(ROUTER.all_transactions.view, req, res, next, data, error, {
					title: ROUTER.all_transactions.title,
					subtitle: req.params.id || (block ? `For Block #${block}` : '') || '',
					paging: new Paging(page, size, data.total, urlBuilder.allTransactions, 'transactions')
				})
			})
		})
	}
	processPendingTransactions() {
		this.router.get(ROUTER.pending_transactions.path, (req, res, next) => {
			let page = this.parsePage(req.query.page)
			let size = this.parseSize(req.query.size)
			return explorer.searchTransactions({
				from: this.calcFrom(page, size),
				size: size,
				pending: true
			}).then(({
				error,
				data
			}) => {
				return this.buildResponse(ROUTER.pending_transactions.view, req, res, next, data, error, {
					title: ROUTER.pending_transactions.title,
					subtitle: req.params.id,
					paging: new Paging(page, size, data.total, urlBuilder.pendingTransactions, 'transactions')
				})
			})
		})
	}
}

export default new TransactionController()