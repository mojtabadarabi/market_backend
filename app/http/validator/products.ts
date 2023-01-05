import {check} from "express-validator";


module.exports={
    getSingle:[
        check('id').notEmpty().withMessage('id is requires').bail().isMongoId().withMessage('id is not valid')
    ],
    create:[
        check('name').exists().withMessage('enter name').bail(),
        check('name.fa').if(check('name').exists()).exists().withMessage('name fa'),
        check('description').exists().withMessage('enter description').bail(),
        check('description.fa').if(check('description').exists()).exists().withMessage('description fa'),
    ],
    update:[
        check('id').exists().withMessage('enter id').bail(),
    ],
    delete:[
        check('id').exists().withMessage('enter id').bail(),
    ]
}