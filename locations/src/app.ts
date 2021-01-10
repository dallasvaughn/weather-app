import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import { errorHandler } from '@dsvtickets/common';
import { NotFoundError, currentUser } from '@dsvtickets/common';
import cookieSession from 'cookie-session';
import { saveLocationRouter } from './routes/save';
import { indexLocationRouter } from './routes/index';
import { deleteLocationRouter } from './routes/delete';

// import { createTicketRouter} from './routes/new'
// import { showTicketRouter } from './routes/show'
// import { indexTicketRouter } from './routes/index'
// import { updateTicketRouter } from './routes/update'

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);
app.use(currentUser);

app.use(saveLocationRouter);
app.use(indexLocationRouter);
app.use(deleteLocationRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
