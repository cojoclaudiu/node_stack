import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';

// dotenv.config();

const PORT = Number(process.env.PORT ?? 3080);

const app = express();
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.json({
    test: 'hello world',
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`server running at http://localhost:${PORT}`);
});
