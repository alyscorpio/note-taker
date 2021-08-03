const data = require("../db/db.json")
const { nanoid } = require('nanoid')

module.exports = (app) => {
    app.get("/api/notes", (req,res) => {
        let newId = req.body;
        newId.id = nanoid(2);
        res.json(data);
        console.log(data)
    })

    app.delete("/api/notes/:id", (req, res) => {
        const chosen = req.params.id;

        for (let i = 0; i < data.length; i++) {
            if (chosen === data.id) {
                res.json(chosen);
            };
        }
    })
};

