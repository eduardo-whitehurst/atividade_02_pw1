import express, { Router } from 'express';
import { criarUsuario, listarUsuarios, validarUsuario } from '../controles/ControlesUsuario';

const router: Router = express.Router();

// Rota para criar um novo usuário
router.post('/', criarUsuario);

// Rota para listar todos os usuários
router.get('/', listarUsuarios);

// Rota para validar a existência de um usuário
router.get('/validate', validarUsuario);

export { router as userRoutes };
