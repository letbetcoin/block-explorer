import express from 'express'
import DataResponse from '../entities/DataResponse'
import path from 'path'
import {
    PAGING_DEFAULT
} from '../entities/Paging'
import _ from 'lodash'
import conf from '../config'

const router = express.Router()
class BaseController {
    buildResponse(view, req, res, next, data, error, mores) {
        if (DataResponse.checkError(error)) {
            return next(error)
        } else {
            return res.render('index', new DataResponse({
                error: error,
                data: {
                    publicPath: path.join(conf.server.base_url, conf.server.public_path),
                    data,
                    error,
                    title: '',
                    subtitle: '',
                    currentPath: req.path,
                    appName: conf.server.app_name,
                    quickLinks: conf.quick_links,
                    social: conf.social,
                    copyright: conf.copyright,
                    ...mores
                },
                body: view
            }))
        }
    }
    get router() {
        return router
    }
    parsePage(page) {
        page = parseInt(page || PAGING_DEFAULT.min_page)
        page = !_.isNaN(page) && _.isFinite(page) ? page : PAGING_DEFAULT.min_page
        page = Math.max(PAGING_DEFAULT.min_page, page)
        return page
    }
    parseSize(size) {
        size = parseInt(size || PAGING_DEFAULT.size)
        size = !_.isNaN(size) && _.isFinite(size) ? size : PAGING_DEFAULT.size
        return size
    }
    calcFrom(page, size) {
        return (page - 1) * size
    }
}

export {
    router,
    BaseController
}

export default BaseController