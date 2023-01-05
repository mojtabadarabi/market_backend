export const setupServer = (app:any) => {
    app.listen(process.env.PORT, (err: any) => {
        if (err) {
            console.log(err)
        }
        console.log('connected!!! to ' + process.env.PORT)
    })
}