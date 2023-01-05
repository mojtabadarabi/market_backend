const {DEFAULT_PAGE, DEFAULT_PAGINATION} = require('../../../config/MongoConfig')
const mongoose = require('mongoose')

interface ConnectProps {
    url: string,
    options?: object
}

module.exports = new class DatabaseTools {
    connectToMongo({url, options = {}}: ConnectProps) {
        mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            ...options
        })
            .then(() => {
                console.log('Data base connected !!!!')
            })
            .catch((err: any) => {
                console.log('Data base not connected' + err)
            })
    }

    getAllModelPagination(Model: any, page: number=DEFAULT_PAGE, paginate: number=DEFAULT_PAGINATION,optiolns:object={}) {
        return Model.find({...optiolns})
            .skip((page - 1) * paginate)
            .limit(paginate)
    }
}
