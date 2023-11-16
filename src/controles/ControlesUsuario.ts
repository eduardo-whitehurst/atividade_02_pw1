import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client';
import { verificarUsuarioExiste } from '../middleware/VerificarUsuarioExiste';
import { Usuario } from "../modelos/Usuario";

const prisma = new PrismaClient();

async function criarUsuario(req: Request, res: Response) {
    const novoUsuario: Usuario = req.body;
    try {
        const usuario = await prisma.usuario.findFirst({
            where: {
                nomeusuario: novoUsuario.nomeusuario as string,
            },
        });

        // Verifique se já existe um usuário com o mesmo nome de usuário
        if (usuario) {
            return res.status(400).json({ error: 'Nome de usuário já utilizado' });
        }

        // Crie um novo usuário
        const newUser = await prisma.usuario.create({
            data: {
                nome: novoUsuario.nome,
                nomeusuario: novoUsuario.nomeusuario,
            }
        });

        // Retorne o usuário criado com o código de status 201
        res.status(201).json(newUser);

    } catch (error) {
        // Lidar com erros de consulta do Prisma, se necessário
        console.error(error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
}

async function listarUsuarios(req: Request, res: Response) {
    // Retorna a lista de todos os usuários
    res.status(200).json(await prisma.usuario.findMany())
}

async function validarUsuario(req: Request, res: Response) {
    await verificarUsuarioExiste(req, res, async () => {
        try {
            const usuario = req.user;

            if (usuario) {
                return res.status(400).json({ error: 'Nome de usuário já utilizado' });
            }

            res.status(201).json(usuario);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    });
}

export { criarUsuario, listarUsuarios, validarUsuario }
