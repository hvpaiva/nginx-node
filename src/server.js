const createApp = require("./index")
const HOST = '0.0.0.0'
const PORT = 3000

const listenApp = async () => {
    let app
    app = await createApp()

    return app.listen(PORT, HOST, () => {
        console.log(`Server running on ${HOST}:${PORT}`)
    })
}

listenApp().then(r => console.log(r))