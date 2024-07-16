const database = require('../models')

class atividadeController {
    static async listAlternativas(req, res) {
        try {
            const todasAsAlternativas = await database.Alternativas.findAll()
            return res.status(200).json(todasAsAlternativas)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async getAlternativas(req, res) {
        const { id } = req.params
        try {
            const umaAlternativa = await database.Alternativas.findOne({ where: { id: Number(id) } })
            return res.status(200).json(umaAlternativa)
        } catch (error) {
            return res.status(200).json(error.message)
        }
    }
    static async postAlternativas(req, res) {
        const novaAlternativa = req.body
        try {
            const novaAlternativaCriado = await database.Alternativas.create(novaAlternativa)
            return res.status(200).json(novaAlternativaCriado)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async putAlternativas(req, res) {
        const novaInfo = req.body
        const { id } = req.params
        try {
            await database.Alternativas.update(novaInfo, { where: { id: Number(id) } })
            const AlternativaAtualizado = await database.Alternativas.findOne({ where: { id: Number(id) } })
            return res.status(200).json(AlternativaAtualizado)
        } catch (error) {
            return res.status(500).json(error.message)

        }
    }

    static async deleteAlternativas(req, res) {
        const { id } = req.params
        try {
            await database.Alternativas.destroy({ where: { id: Number(id) } })
            return res.status(200).json({ mensagem: `id: ${id} deletado` })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

}

module.exports = atividadeController