const database = require('../models')
const sequelize = require('sequelize')


class AtividadeController {
    static async pegaAtividadeAleatoria(req, res) {
        try {
            const Atividades = await database.Atividades.findAll({ order: sequelize.literal('rand()'), include: database.Alternativas });
    
            if (!Atividades || Atividades.length === 0) {
                return res.status(404).send('Nenhuma pergunta disponível');
            }
    
            const atividadeIds = Atividades.map(atividade => atividade.id);
            const Respostas = await database.Respostas.findAll({ where: { atividade_id: atividadeIds } });
            const atividadeIdsRespondidas = Respostas.map(resposta => resposta.atividade_id);
    
            const AtividadesNaoRespondidas = Atividades.filter(atividade => !atividadeIdsRespondidas.includes(atividade.id));
    
            const numeroDeAtividadesExibir = Math.min(5, Math.max(1, AtividadesNaoRespondidas.length));
    
            const atividadesExibir = AtividadesNaoRespondidas.slice(0, numeroDeAtividadesExibir);
    
            res.json(atividadesExibir);
        } catch (error) {
            console.error(error);
            res.status(500).send('Erro ao obter pergunta aleatória');
        }
    }


    static async comparaAtividadesComRespostas(req, res) {
        try {
            
            const Atividades = await database.Atividades.findAll()
            const atividadeIds = Atividades.map(atividade => atividade.id);
            const Respostas = await database.Respostas.findAll({ where: { atividade_id: atividadeIds } });
            const atividadeIdsRespondidas = Respostas.map(resposta => resposta.atividade_id);
    
            const AtividadesNaoRespondidas = Atividades.filter(atividade => !atividadeIdsRespondidas.includes(atividade.id));

            const verificaAtividadeExibir = AtividadesNaoRespondidas.length === 0 

            res.json(verificaAtividadeExibir)
        } catch (error) {
            return res.status(500).json(error.message)
        }

    }
    

    static async listAtividades(req, res) {
        try {
            const todasAtividade = await database.Atividades.findAll()
            return res.status(200).json(todasAtividade)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async getAtividades(req, res) {
        const { id } = req.params
        try {
            const umaAtividade = await database.Atividades.findOne({ where: { id: Number(id) } })
            return res.status(200).json(umaAtividade)
        } catch (error) {
            return res.status(200).json(error.message)
        }
    }
    static async postAtividades(req, res) {
        const novaAtividade = req.body
        try {
            const novaAtividadeCriado = await database.Atividades.create(novaAtividade)
            return res.status(200).json(novaAtividadeCriado)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async putAtividades(req, res) {
        const novaInfo = req.body
        const { id } = req.params
        try {
            await database.Atividades.update(novaInfo, { where: { id: Number(id) } })
            const AtividadeAtualizado = await database.Atividades.findOne({ where: { id: Number(id) } })
            return res.status(200).json(AtividadeAtualizado)
        } catch (error) {
            return res.status(500).json(error.message)

        }
    }

    static async deleteAtividades(req, res) {
        const { id } = req.params
        try {
            await database.Atividades.destroy({ where: { id: Number(id) } })
            return res.status(200).json({ mensagem: `id: ${id} deletado` })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    


    v2acerta
    // static async pegaAtividadeAleatoria(req, res) {
    //     try {
    //         const Atividades = await database.Atividades.findAll({ order: sequelize.literal('rand()'), limit: 5, include: database.Alternativas });
    
    //         if (!Atividades || Atividades.length === 0) {
    //             return res.status(404).send('Nenhuma pergunta disponível');
    //         }
    
    //         const atividadeIds = Atividades.map(atividade => atividade.id);
    //         const Respostas = await database.Respostas.findAll({ where: { atividade_id: atividadeIds } });
    //         const atividadeIdsRespondidas = Respostas.map(resposta => resposta.atividade_id);
    
    //         const AtividadesNaoRespondidas = Atividades.filter(atividade => !atividadeIdsRespondidas.includes(atividade.id));
    
    //         res.json(AtividadesNaoRespondidas);
    //     } catch (error) {
    //         console.error(error);
    //         res.status(500).send('Erro ao obter pergunta aleatória');
    //     }
    // }
    
    
    v1
    // static async pegaEvalida(req, res) {
    //     try {
    //         const atividadesRespondidas = await database.Respostas.findAll({ attributes: ['atividade_id'] });
        
    //         const idsAtividadesRespondidas = atividadesRespondidas.map(resp => resp.atividade_id);
        
    //         // Lógica para obter a próxima pergunta não respondida
    //         const pergunta = await database.Pergunta.findOne({
    //           where: {
    //             id: { [database.Sequelize.Op.notIn]: idsAtividadesRespondidas }
    //           },
    //           order: database.Sequelize.literal('RAND()')
    //         });
        
    //         if (pergunta) {
    //           res.json({ pergunta: pergunta.texto });
    //         } else {
    //           res.json({ pergunta: null }); // Todas as atividades já foram respondidas
    //         }
    //       } catch (error) {
    //         console.error(error);
    //         res.status(500).json({ error: 'Erro ao obter a próxima pergunta.' });
    //       }
    //     };
    }


module.exports = AtividadeController