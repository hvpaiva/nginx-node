const express = require('express')
const { queryPromise } = require('./queryPromise')

async function createApp() {
    const app = express()
    const sqlTable = `CREATE TABLE IF NOT EXISTS People(id int NOT NULL AUTO_INCREMENT, name varchar(255) NOT NULL, PRIMARY KEY(id))`;

    await queryPromise.query(sqlTable)

    const people = [['Highlander Paiva'], ['Gabriela Paiva'], ['Elder Júnior']]
    const sqlInsert = `INSERT INTO People(name) VALUES ?`;

    await queryPromise.queryMultiple(sqlInsert, people)

    app.get('/', async (req, res) => {
        const selectPeople = `SELECT * FROM People`
        const allPeople = await queryPromise.query(selectPeople)

        const html = `<h1>Full Cycle Rocks!</h1>\n
                      <ul>
                        ${allPeople.map(person => `<li>${person.name}</li>`).join('')}
                      </ul>`

        res.send(html)
    })
    return app
}

module.exports = createApp