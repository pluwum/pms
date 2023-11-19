import { initializeDb } from "./data-source"
import server from "./server"

const port = process.env.PORT || 8000

initializeDb()
    .then(async () => {
        server.listen(port)
        console.log(`Express server has started on port ${port}.`)
    })
    .catch((error) => console.log(error))
