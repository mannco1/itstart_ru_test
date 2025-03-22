const jsonServer = require('json-server');
const express = require('express');
const cors = require('cors');  // Импортируем cors
const path = require('path');
const fs = require('fs');

const app = express();
const dbPath = path.join(__dirname, 'seminars.json');
const server = jsonServer.create();
const router = jsonServer.router(dbPath);
const middlewares = jsonServer.defaults();

// Разрешаем все домены
app.use(cors());

app.use(middlewares);
app.use(jsonServer.bodyParser);
app.use('/api', router);

app.listen(5001, () => {  // Измените порт на 5001
  console.log('JSON Server is running at http://localhost:5001');
});

app.get('/api/seminars', (req, res) => {
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading data');
      return;
    }
    const seminars = JSON.parse(data);
    res.json(seminars);
  });
});

app.delete('/api/seminars/:id', (req, res) => {
  const seminarId = parseInt(req.params.id, 10);
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading data');
      return;
    }
    let seminars = JSON.parse(data);
    seminars = seminars.filter(seminar => seminar.id !== seminarId);
    fs.writeFile(dbPath, JSON.stringify(seminars, null, 2), (err) => {
      if (err) {
        res.status(500).send('Error writing data');
        return;
      }
      res.status(204).send();
    });
  });
});