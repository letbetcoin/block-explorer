export const ERROR = {
    status_name: {
        404: 'Not found',
        500: 'Internal Server Error',
        501: 'Not Implemented',
        502: 'Bad Gateway',
        503: 'Service Unavailable',
        504: 'Gateway Timeout',
        505: 'HTTP Version Not Supported',
        506: 'Variant Also Negotiates',
        507: 'Insufficient Storage',
        508: 'Loop Detected',
        510: 'Not Extended',
        511: 'Network Authentication Required'
    },
    status_msg: {
        404: 'We\'re sorry, we couldn\'t find what you were looking for.'
    }
}

export class NotFound extends Error {
    constructor(message = ERROR.status_name['404']) {
        super(message)
        this.status = 404
    }
}