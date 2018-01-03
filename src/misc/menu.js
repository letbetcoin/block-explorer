import ROUTER from '../config/router'

function registerMenu(name, path, childs = []) {
    return {
        name,
        path,
        childs
    }
}

export const MENUS = [
    registerMenu('Home', ROUTER.home.path),
    registerMenu('Blocks', ROUTER.block_listing.path),
    registerMenu('Transactions', ROUTER.all_transactions.path, [
        registerMenu('All Transactions', ROUTER.all_transactions.path),
        registerMenu('Pending Transactions', ROUTER.pending_transactions.path)
    ])
]

export default {
    items: MENUS,
    isActive(currentPath, path, childs = []) {
        if (currentPath === path) {
            return true
        } else if (childs.length) {
            return childs.find(c => c.path === currentPath)
        }
        return false
    }
}