import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client';
import { Usuario } from "../modelos/Usuario";

const prisma = new PrismaClient();

async function criarTecnologia(req: Request, res: Response) {
  const { titulo, estudar_ate } = req.body;
  const user: Usuario = req.user as Usuario; // Recupere o usuário do middleware
  try {
    const newTechnology = await prisma.tecnologia.create({
      data: {
        titulo: titulo,
        estudar_ate: new Date(estudar_ate),
        usuarioId: user.id,
      },
    });

    // Retorna a tecnologia criada
    res.status(201).json(newTechnology);
  } catch (error) {
    // Tratando erro do servidor
    console.error('Error creating technology:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

async function listarTecnologia(req: Request, res: Response) {
  const user: Usuario = req.user as Usuario; // Recupere o usuário do middleware

  // Retorna a lista de tecnologias do usuário
  try {
    const technologies = await prisma.tecnologia.findMany({
      where: {
        usuarioId: user.id,
      },
    });

    res.status(200).json(technologies);
  } catch (error) {
    // Tratando erro do servidor
    console.error('Error listing technologies:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

async function atualizarTecnologia(req: Request, res: Response) {
  const { titulo, estudar_ate } = req.body;
  const user: Usuario = req.user as Usuario; // Recupere o usuário do middleware
  const technologyId: string = req.params.id;

  try {
    // Atualize as propriedades da tecnologia
    const updatedTechnology = await prisma.tecnologia.update({
      where: {
        id: technologyId,
        usuarioId: user.id,
      },
      data: {
        titulo: titulo,
        estudar_ate: new Date(estudar_ate),
      },
    });

    if (!updatedTechnology) {
      return res.status(404).json({ error: 'Tecnologia não encontrada' });
    }

    // Retorne a tecnologia atualizada
    return res.status(200).json(updatedTechnology);
  } catch (error) {
    // Tratando erro do servidor
    console.error('Error updating technology:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

async function statusTecnologia(req: Request, res: Response) {
  const user: Usuario = req.user as Usuario; // Recupere o usuário do middleware
  const technologyId: string = req.params.id;

  try {
    // Atualize as propriedades da tecnologia
    const updatedTechnology = await prisma.tecnologia.update({
      where: {
        id: technologyId,
        usuarioId: user.id,
      },
      data: {
        estudada: true
      },
    });

    if (!updatedTechnology) {
      return res.status(404).json({ error: 'Tecnologia não encontrada' });
    }


    // Retorne a tecnologia atualizada
    res.status(200).json(updatedTechnology);
  } catch (error) {
    // Tratando erro do servidor
    console.error('Error updating technology:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

async function excluirTecnologia(req: Request, res: Response) {
  const user: Usuario = req.user as Usuario; // Recupere o usuário do middleware
  const technologyId: string = req.params.id;

  try {
    const technology = await prisma.tecnologia.findUnique({
      where: {
        id: technologyId,
      },
    });

    if (!technology) {
      return res.status(404).json({ error: 'Tecnologia não encontrada' });
    }

    /// Remova a tecnologia da lista do usuário
    await prisma.tecnologia.delete({
      where: {
        id: technologyId,
      }
    });

    // Retorne a lista de tecnologias restantes
    const technologies = await prisma.tecnologia.findMany({
      where: {
        usuarioId: user.id,
      },
    });

    res.status(200).json(technologies);
  } catch (error) {
    // Tratando erro do servidor
    console.error('Error updating technology:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

export { criarTecnologia, listarTecnologia, atualizarTecnologia, statusTecnologia, excluirTecnologia };