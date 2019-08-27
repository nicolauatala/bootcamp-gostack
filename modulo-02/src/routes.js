import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import AppointmentController from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);
routes.post('/users', UserController.store);

// Middleware global
routes.use(authMiddleware);
routes.put('/users', UserController.update);

// Providers
routes.get('/providers', ProviderController.index);

// Files
routes.post('/files', upload.single('file'), FileController.store);

// Appointment
routes.get('/appointments', AppointmentController.index);
routes.post('/appointments', AppointmentController.store);

// Schedule
routes.get('/schedule', ScheduleController.index);

export default routes;
