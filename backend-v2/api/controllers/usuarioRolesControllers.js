const UsuarioService = require('../services/usuarioService')
const { hash } = require('bcryptjs')
const uuid = require('uuid')
const usuarioService = new UsuarioService()

const database = require("../models");

class UsuarioRolesController {
    // static async postRolesUsuario(req, res) {
    //     const novoPerfilUsuario = req.body;

    //     try {
    //         const novoPerfilUsuarioCriado = await database.teste.create(novoPerfilUsuario);
    //         return res.status(200).json(novoPerfilUsuarioCriado);
    //     } catch (error) {
    //         res.status(500).send({ message: 'Erro ao criar o perfil do usuário' });
    //     }
    // }


    static async obterTodosUsuariosETestes(req, res) {
        try {
            // Obter todos os Usuários e Testes com as Matrículas
            const usuariosETestes = await database.Usuarios.findAll({
                include: [
                    {
                        model: database.teste,
                        as: 'testes',
                    },
                    {
                        model: database.Matriculas,
                        as: 'matriculas',
                    },
                ],
            });
    
            return res.status(200).json(usuariosETestes);
        } catch (error) {
            console.error('Erro ao obter todos Usuários, Testes e Matrículas:', error);
            return res.status(500).json({ error: 'Ocorreu um erro ao obter todos Usuários, Testes e Matrículas.' });
        }
    }
    


    static async criarEstudantes(req, res) {
        const usuarioData = req.body;
    
        try {
            // Criar o novo usuário
            const passwordHash = await hash(usuarioData.password, 8);
            const novoUsuario = await database.Usuarios.create({
                nome: usuarioData.nome,
                password: passwordHash,
                email: usuarioData.email,
                telefone: usuarioData.telefone,
                cep: usuarioData.cep,
                numero: usuarioData.numero,
                complemento: usuarioData.complemento,
                rua: usuarioData.rua,
                bairro: usuarioData.bairro,
                cidade: usuarioData.cidade,
                estado: usuarioData.estado,
            });
    
            // Garantir que usuarioData.testes seja um array
            usuarioData.testes = Array.isArray(usuarioData.testes) ? usuarioData.testes : [];
    
            // Adicionar um objeto com roleIdFixo se o array estiver vazio
            if (usuarioData.testes.length === 0) {
                usuarioData.testes.push({ roleId: "40c08b0b-2009-4853-97fa-01a960420fc8" });
            }
    
            // Criar os testes associados a esse usuário com roleId fixo
            for (const testeData of usuarioData.testes) {
                try {
                    const novoTeste = await database.teste.create({
                        usuarioId: novoUsuario.id,
                        roleId: testeData.roleId || "40c08b0b-2009-4853-97fa-01a960420fc8",
                    });
                } catch (error) {
                    // Lidar com o erro de criação do teste
                    console.error('Erro ao criar teste:', error);
                    return res.status(500).json({ error: 'Ocorreu um erro ao criar o teste.' });
                }
            }
    
            // Restante do código para criar matrículas
    
            return res.status(201).json({ message: 'Usuário e Teste criados com sucesso!' });
        } catch (error) {
            console.error('Erro ao criar Usuário e Teste:', error);
            return res.status(500).json({ error: 'Ocorreu um erro ao criar Usuário e Teste.' });
        }
    }
    
    static async criarDocente(req, res) {
        const usuarioData = req.body;
        const roleIdFixo = "bde9dbaf-7e71-4936-bed1-4fc02cff5507";
    
        try {
            // Criar o novo usuário
            const passwordHash = await hash(usuarioData.password, 8);
            const novoUsuario = await database.Usuarios.create({
                nome: usuarioData.nome,
                password: passwordHash,
                email: usuarioData.email,
                telefone: usuarioData.telefone,
                cep: usuarioData.cep,
                numero: usuarioData.numero,
                complemento: usuarioData.complemento,
                rua: usuarioData.rua,
                bairro: usuarioData.bairro,
                cidade: usuarioData.cidade,
                estado: usuarioData.estado,
            });
    
            // Garantir que usuarioData.testes seja um array
            usuarioData.testes = Array.isArray(usuarioData.testes) ? usuarioData.testes : [];
    
            // Adicionar um objeto com roleIdFixo se o array estiver vazio
            if (usuarioData.testes.length === 0) {
                usuarioData.testes.push({ roleId: roleIdFixo });
            }
    
            // Criar os testes associados a esse usuário com roleId fixo
            for (const testeData of usuarioData.testes) {
                try {
                    const novoTeste = await database.teste.create({
                        usuarioId: novoUsuario.id,
                        roleId: testeData.roleId || roleIdFixo,
                    });
                } catch (error) {
                    // Lidar com o erro de criação do teste
                    console.error('Erro ao criar teste:', error);
                    return res.status(500).json({ error: 'Ocorreu um erro ao criar o teste.' });
                }
            }
    
            // Restante do código para criar matrículas
    
            return res.status(201).json({ message: 'Usuário e Teste criados com sucesso!' });
        } catch (error) {
            console.error('Erro ao criar Usuário e Teste:', error);
            return res.status(500).json({ error: 'Ocorreu um erro ao criar Usuário e Teste.' });
        }
    }
    static async criarDocente(req, res) {
        const usuarioData = req.body;
        const roleIdFixo = "bde9dbaf-7e71-4936-bed1-4fc02cff5507";
    
        try {
            // Criar o novo usuário
            const passwordHash = await hash(usuarioData.password, 8);
            const novoUsuario = await database.Usuarios.create({
                nome: usuarioData.nome,
                password: passwordHash,
                email: usuarioData.email,
                telefone: usuarioData.telefone,
                cep: usuarioData.cep,
                numero: usuarioData.numero,
                complemento: usuarioData.complemento,
                rua: usuarioData.rua,
                bairro: usuarioData.bairro,
                cidade: usuarioData.cidade,
                estado: usuarioData.estado,
            });
    
            // Garantir que usuarioData.testes seja um array
            usuarioData.testes = Array.isArray(usuarioData.testes) ? usuarioData.testes : [];
    
            // Adicionar um objeto com roleIdFixo se o array estiver vazio
            if (usuarioData.testes.length === 0) {
                usuarioData.testes.push({ roleId: roleIdFixo });
            }
    
            // Criar os testes associados a esse usuário com roleId fixo
            for (const testeData of usuarioData.testes) {
                try {
                    const novoTeste = await database.teste.create({
                        usuarioId: novoUsuario.id,
                        roleId: testeData.roleId || roleIdFixo,
                    });
                } catch (error) {
                    // Lidar com o erro de criação do teste
                    console.error('Erro ao criar teste:', error);
                    return res.status(500).json({ error: 'Ocorreu um erro ao criar o teste.' });
                }
            }
    
            // Restante do código para criar matrículas
    
            return res.status(201).json({ message: 'Usuário e Teste criados com sucesso!' });
        } catch (error) {
            console.error('Erro ao criar Usuário e Teste:', error);
            return res.status(500).json({ error: 'Ocorreu um erro ao criar Usuário e Teste.' });
        }
    }
    
    



    static async obterUsuarioETestePorId(req, res) {
        const usuarioETesteId = req.params.id;
    
        try {
            // Obter o Usuário e Teste por ID
            const usuarioETeste = await database.Usuarios.findOne({
                where: { id: usuarioETesteId },
                include: [{
                    model: database.teste,
                    as: 'testes',
                },
                {
                    model: database.Matriculas,
                    as: 'matriculas',
                }],
            });
    
            if (!usuarioETeste) {
                return res.status(404).json({ error: 'Usuário e Teste não encontrado.' });
            }
    
            return res.status(200).json(usuarioETeste);
        } catch (error) {
            console.error('Erro ao obter Usuário e Teste por ID:', error);
            return res.status(500).json({ error: 'Ocorreu um erro ao obter Usuário e Teste.' });
        }
    }

    static async excluirUsuarioETestePorId(req, res) {
        const usuarioETesteId = req.params.id;

        try {
            // Excluir Usuário e Teste por ID
            const result = await database.Usuarios.destroy({
                where: { id: usuarioETesteId },
            });

            if (result === 0) {
                return res.status(404).json({ error: 'Usuário e Teste não encontrado.' });
            }

            return res.status(204).json(); // Retorna 204 No Content em caso de sucesso sem conteúdo
        } catch (error) {
            console.error('Erro ao excluir Usuário e Teste por ID:', error);
            return res.status(500).json({ error: 'Ocorreu um erro ao excluir Usuário e Teste.' });
        }
    }
    // static async atualizarUsuarioETeste(req, res) {
    //     const usuarioETesteId = req.params.id;
    //     const novosDados = req.body;

    //     try {
    //         // Atualizar Usuário e Teste por ID
    //         const result = await database.Usuarios.update({
    //             nome: novosDados.nome,
    //             email: novosDados.email,
    //             password: novosDados.password,
    //             email: novosDados.email,
    //             telefone: novosDados.telefone,
    //             cep: novosDados.cep,
    //             numero: novosDados.numero,
    //             complemento: novosDados.complemento,
    //             rua: novosDados.rua,
    //             bairro: novosDados.bairro,
    //             cidade: novosDados.cidade,
    //             estado: novosDados.estado,
    //             // Adicione outras propriedades conforme necessário
    //         }, {
    //             where: { id: usuarioETesteId },
    //         });

    //         if (result[0] === 0) {
    //             return res.status(404).json({ error: 'Usuário e Teste não encontrado.' });
    //         }

    //         return res.status(200).json({ message: 'Usuário e Teste atualizados com sucesso!' });
    //     } catch (error) {
    //         console.error('Erro ao atualizar Usuário e Teste por ID:', error);
    //         return res.status(500).json({ error: 'Ocorreu um erro ao atualizar Usuário e Teste.' });
    //     }
    // }
    static async atualizarUsuarioETeste(req, res) {
        const usuarioETesteId = req.params.id;
        const novosDados = req.body;

        try {
            // Atualizar Usuário e Teste por ID
            const usuario = await database.Usuarios.findByPk(usuarioETesteId);
            if (!usuario) {
                return res.status(404).json({ error: 'Usuário não encontrado.' });
            }

            await usuario.update({
                nome: novosDados.nome,
                email: novosDados.email,
                password: novosDados.password,
                telefone: novosDados.telefone,
                cep: novosDados.cep,
                numero: novosDados.numero,
                complemento: novosDados.complemento,
                rua: novosDados.rua,
                bairro: novosDados.bairro,
                cidade: novosDados.cidade,
                estado: novosDados.estado,
                // Adicione outras propriedades conforme necessário
            });



            return res.status(200).json({ message: 'Usuário e Teste atualizados com sucesso!' });
        } catch (error) {
            console.error('Erro ao atualizar Usuário e Teste por ID:', error);
            return res.status(500).json({ error: 'Ocorreu um erro ao atualizar Usuário e Teste.' });
        }
    }




}

module.exports = UsuarioRolesController;

