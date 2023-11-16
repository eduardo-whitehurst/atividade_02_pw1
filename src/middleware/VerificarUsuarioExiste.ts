import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { Usuario } from '../modelos/Usuario';

const prisma = new PrismaClient();

async function verificarUsuarioExiste(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { nomeusuario } = req.headers;

  try {
    const usuario = await prisma.usuario.findFirst({
      where: {
        nomeusuario: nomeusuario as string,
      },
    });

    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    req.user = usuario as Usuario;
    next();
  } catch (error) {
    // Lidar com erros de consulta do Prisma, se necessário
    console.error(error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

export { verificarUsuarioExiste };
