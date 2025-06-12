import e from 'express';
import express from 'express';
const app = express();
const port = 3000;

app.get(' /api/sum', (req, res) => {
  const a = parsefloat(req.query.a);
  const b = parsefloat (req.query.b);
  res.send({sum: a + b});
});

app.post('/api/sort ', (req, res) => {
   const requestNumber = req.body.numbers;
   const order = req.body.order;
   const orderNumbers = requestNumber.sort((a, b) => {
    if (order === 'asc') {
      return a - b;
    }
    else (order === 'desc')
    {
      return b - a;
    }
  });
  res.send({result: orderNumbers});
});



app.post('/api/calculate', (req, res) => {
  const { a, b, operation } = req.body;

  if (typeof a !== 'number' || typeof b !== 'number') {
    return res.status(400).json({ error: "the numbers are invalid"});
  }

  if (!['add', 'subtract', 'multiply', 'divide'].includes(operation)) {
    return res.status(400).json({ error: "incorrect operation" });
  }

  let result;

  switch (operation) {
    case 'add':
      result = a + b;
      break;
    case 'subtract':
      result = a - b;
      break;
    case 'multiply':
      result = a * b;
      break;
    case 'divide':
      if (b === 0) {
        return res.status(400).json({ error: "cannot divide by zero" });
      }
      result = a / b;
      break;
  }

  res.json({ result });
});



app.get('/api/fibonacci', (req, res) => {
  const n = parseInt(req.query.n);

  if (isNaN(n) || n <= 0) {
    return res.status(400).json({ error: "n is invalid" });
  }

  let fib = [0, 1];

  for (let i = 2; i < n; i++) {
    fib[i] = fib[i - 1] + fib[i - 2];
  }

  res.json({ result: fib.slice(0, n) });
});




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
