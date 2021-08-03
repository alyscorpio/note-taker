const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


// Route to get notes
app.get('/api/notes', (req,res) => {
  var notes;
  fs.readFile('db/db.json', 'utf8', (error, data) => {
    error ? console.error(error) : notes = JSON.parse(data);
    console.log(notes);
    res.json(notes);
  });
});

// Route to post note
app.post('/api/notes', (req, res) => {
  var notes;
  var note = req.body;
  fs.readFile('db/db.json', 'utf8', (error, data) => {
      error ? console.error(error) : notes =JSON.parse(data);
      notes.push(note);
      fs.writeFile('db/db.json', JSON.stringify(notes), (err) => 
      err ? console.error(err) : res.json(notes));
  });
});

// Route to delete note
app.delete('api/notes/:id', (req, res) => {
  var notes;
  fs.readFile('db/db.json', 'utf8', (error,data) => {
    error ? console.error(error) : notes = JSON.parse(data);
    notes.splice(req.params.id, 1);
    fs.writeFile('db/db.json', JSON.stringify(notes), (err) =>
    err? console.error(err) : res.json(notes));
  });
});


app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});