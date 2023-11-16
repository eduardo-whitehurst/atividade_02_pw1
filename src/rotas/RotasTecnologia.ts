import express, { Router, Request, Response } from 'express';
import {criarTecnologia, listarTecnologia, atualizarTecnologia, statusTecnologia, excluirTecnologia} from '../controles/ControlesTecnologia';
import { verificarUsuarioExiste } from '../middleware/VerificarUsuarioExiste';
const router: Router = express.Router();

// Rota para criar uma nova tecnologia
router.post('/', verificarUsuarioExiste, criarTecnologia);

// Rota para listar todas as tecnologias de um usuário
router.get('/', verificarUsuarioExiste, listarTecnologia);

// Rota para atualizar uma tecnologia de um usuário
router.patch('/:id', verificarUsuarioExiste, atualizarTecnologia);

// Rota para marcar uma tecnologia como estudada
router.patch('/:id/studied', verificarUsuarioExiste, statusTecnologia);

// Rota para excluir uma tecnologia de um usuário
router.delete('/:id', verificarUsuarioExiste, excluirTecnologia);

export { router as technologyRoutes };
