import { Router } from 'express';

import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import MeetUpController from './app/controllers/MeetUpController';
import MeetupOwnerController from './app/controllers/MeetupOwnerController';
import BannerController from './app/controllers/BannerController';
import SubscriptionController from './app/controllers/SubscriptionController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

const upload = multer(multerConfig);

// --------------- criação das rotas

// rota para criação de usuário
routes.post('/users', UserController.store);

// rota para log in
routes.post('/sessions', SessionController.store);

// middleware de autenticação
routes.use(authMiddleware);

// criação de rota para atualização
routes.put('/users', UserController.update);

// -- MeetUps
routes.post('/meetups', MeetUpController.store);
routes.delete('/meetups/:id', MeetUpController.delete);
routes.put('/meetups/:id', MeetUpController.update);
routes.get('/meetups', MeetUpController.index);

// --MeetUps do organizador
routes.get('/organizer', MeetupOwnerController.index);

// --Subscriptions
routes.post('/subscription/:meetupId', SubscriptionController.store);
routes.get('/subscription', SubscriptionController.index);
routes.delete('/subscription/:subscriptionId', SubscriptionController.delete);

// rota para upload de arquivo
routes.post('/banner', upload.single('banner'), BannerController.store);

export default routes;
