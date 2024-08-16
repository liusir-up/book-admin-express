import UserRouter from "./routes/users";
import BookRouter from "./routes/book";
import CategoryRouter from "./routes/category";
import BorrowRouter from "./routes/borrow";
import { expressjwt } from "express-jwt";
import express, { Request, Response, NextFunction } from 'express';
import {SECRET_KEY} from "./constant";
import createError from 'http-errors';
import path from 'path';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
require('./model/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));
app.use(expressjwt({secret: SECRET_KEY, algorithms: ['HS256']} ).unless({
    path: ['/api/users/login', '/api/users/logout'],
  })
);

app.use('/api/users', UserRouter);
app.use('/api/books', BookRouter);
app.use('/api/categories', CategoryRouter);
app.use('/api/borrows', BorrowRouter);


// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

app.listen('3005', () => {
  console.log('server start at 3005')
})

module.exports = app;