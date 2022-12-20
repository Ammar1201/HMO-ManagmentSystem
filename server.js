import express from 'express';
import cors from 'cors';
import './db/mongoose.js';
import * as url from 'url';
import path from 'path';
import { indexRouter } from './routes/index.routes.js';

const __dirname = url.fileURLToPath(new URL('./', import.meta.url));

const PORT = process.env.PORT || 5000;

export const app = express();

app.use(express.json());
app.use(cors());

const publicPath = path.join(__dirname, 'build');
app.use(express.static(publicPath));

app.use('/api', indexRouter);

// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
// });

app.listen(PORT, () => {
  console.log('express server listening on port ' + PORT);
});