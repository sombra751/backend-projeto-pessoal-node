const database = require('../models')

class aulaController {
    // static async listAulas(req, res) {
    //     try {
    //         const todasAsMaterias = await database.aulas.findAll()
    //         return res.status(200).json(todasAsMaterias)
    //     } catch (error) {
    //         return res.status(500).json(error.message)
    //     }
    // }

    // static async getAulas(req, res) {
    //     const { id } = req.params
    //     try {
    //         const umaMateria = await database.aulas.findOne({ where: { id: Number(id) } })
    //         return res.status(200).json(umaMateria)
    //     } catch (error) {
    //         return res.status(200).json(error.message)
    //     }
    // }
    // static async postAulas(req, res) {
    //     const novaMateria = req.body
    //     try {
    //         const novaMateriaCriado = await database.aulas.create(novaMateria)
    //         return res.status(200).json(novaMateriaCriado)
    //     } catch (error) {
    //         return res.status(500).json(error.message)
    //     }
    // }

    // static async putAulas(req, res) {
    //     const novaInfo = req.body
    //     const { id } = req.params
    //     try {
    //         await database.aulas.update(novaInfo, { where: { id: Number(id) } })
    //         const MateriaAtualizado = await database.aulas.findOne({ where: { id: Number(id) } })
    //         return res.status(200).json(MateriaAtualizado)
    //     } catch (error) {
    //         return res.status(500).json(error.message)

    //     }
    // }

    // static async deleteAulas(req, res) {
    //     const { id } = req.params
    //     try {
    //         await database.aulas.destroy({ where: { id: Number(id) } })
    //         return res.status(200).json({ mensagem: `id: ${id} deletado` })
    //     } catch (error) {
    //         return res.status(500).json(error.message)
    //     }
    // }


    static async postAulaAtividadeAtividade(req, res) {
        const aulaData = req.body;

        try {
            const novaAula = await database.aulas.create({
                nome: aulaData.nome,
                youtubeUrl: aulaData.youtubeUrl,
                materia_id: aulaData.materia_id,
            });

            for (const atividadeData of aulaData.atividades) {
                const novaAtividade = await database.Atividades.create({
                    pergunta: atividadeData.pergunta,
                    aula_id: novaAula.id,
                });

                for (const alternativaData of atividadeData.alternativas) {
                    await database.Alternativas.create({
                        texto: alternativaData.texto,
                        atividade_id: novaAtividade.id,
                        alternativaCorreta: alternativaData.alternativaCorreta,
                    });
                }

            }

            return res.status(201).json({ message: 'Materia, Aulas, Atividades e Alternativas criadas com sucesso!' });
        } catch (error) {
            console.error('Erro ao criar Materia, Aulas, Atividades e Alternativas:', error);
            return res.status(500).json({ error: 'Ocorreu um erro ao criar Materia, Aulas, Atividades e Alternativas.' });
        }
    }


    static async putAulaAtividadeAtividade(req, res) {
    const aulaData = req.body;
    const aulaId = req.params.id;
    console.log('requisão:',req.body);


    try {
        const aula = await database.aulas.findByPk(aulaId);

        if (!aula) {
            return res.status(404).json({ mensagem: 'Aula não encontrada' });
        }

        await aula.update({
            nome: aulaData.nome,
            youtubeUrl: aulaData.youtubeUrl,
            materia_id: aulaData.materia_id,
        });

        for (const atividadeData of aulaData.Atividades) {
            const atividade = await database.Atividades.findByPk(atividadeData.id);

            if (!atividade) {
                return res.status(404).json({ mensagem: 'Atividade não encontrada' });
            }

            await atividade.update({
                pergunta: atividadeData.pergunta,
                aula_id: aula.id,
            });

            for (const alternativaData of atividadeData.Alternativas) {
                const alternativa = await database.Alternativas.findByPk(alternativaData.id);

                if (!alternativa) {
                    return res.status(404).json({ mensagem: 'Alternativa não encontrada' });
                }

                await alternativa.update({
                    texto: alternativaData.texto,
                    atividade_id: atividade.id,
                    alternativaCorreta: alternativaData.alternativaCorreta,
                });
            }
        }

        return res.status(200).json({ mensagem: `Aula ${aulaId} foi editada` });
    } catch (error) {
        console.error('Erro ao atualizar aula:', error);
        return res.status(500).json({ error: 'Ocorreu um erro ao atualizar aula.' });
    }
}

    
    


    static async listAulaAtividadeAtividade(req, res) {
        try {
            const allAulas = await database.aulas.findAll({
                include: [
                    {
                        model: database.Atividades,
                        include: [
                            {
                                model: database.Alternativas
                            }
                        ]
                    }
                ]
            });
            res.status(200).json(allAulas)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async getAulaAtividadeAtividade(req, res) {
        const aulaId = req.params.id
        try {
            const aula = await database.aulas.findOne({
                where: { id: Number(aulaId) },
                include: [
                    {
                        model: database.Atividades,
                        include: [
                            {
                                model: database.Alternativas
                            }
                        ]
                    }
                ]
            });
            return res.status(200).json(aula)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async deleteAulaAtividadeAlternativa(req, res) {
        const aulaId = req.params.id
        try {
            const aula = await database.aulas.findByPk(aulaId)
            await aula.destroy();
            return res.status(200).json({ mensagem: `aula, id: ${aulaId} foi deletado` })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

}

module.exports = aulaController