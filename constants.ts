export const corsOptions = {
    origin:'*',
    methods:[
        'GET',
        'POST'
    ],
    allowedHeaders:[
        'Content-Type',
        'lang',
        'Authentication'
    ]
}
export const ROLES = {
    USER_ROLE:'user',
    AUTHOR_ROLE:'author',
    ADMIN_ROLE:'admin',
    SUPER_ADMIN_ROLE:'super_admin'
}