const database = require('../models')
const { hash } = require('bcryptjs')

class UsuarioService {
    async pegaTudo(){
        const pegaUsuarios = await database.Usuarios.findAll()
        return pegaUsuarios
    }

    // async cadastrar(dto) {
    //     const usuario = await database.Usuarios.findOne({
    //         where: {
    //             email: dto.email
    //         }
    //     })

    //     if (usuario) {
    //         throw new Error('Usuário ja cadastrado')
    //     }
    //     try {
    //         const passwordHash = await hash(dto.password, 8)
    //         const novoUsuario = await database.Usuarios.create({
    //             id: uuid.v4(),
    //             username: dto.username,
    //             password: passwordHash,
    //             email: dto.email
    //         })

    //         return novoUsuario
    //     } catch (error) {
    //         throw new Error('Erro ao cadastrar usuário')
    //     }
    // }
    async cadastrarUsuarioComPerfilEroles(dto) {
        try {
          // Verifica se o usuário já está cadastrado
          const usuarioExistente = await database.Usuarios.findOne({
            where: {
              email: dto.email,
            },
          });
    
          if (usuarioExistente) {
            throw new Error('Usuário já cadastrado');
          }
    
          // Criação do usuário
          const passwordHash = await hash(dto.password, 8);
          const novoUsuario = await database.Usuarios.create({
            nome: dto.nome,
            password: passwordHash,
            email: dto.email,
          });
    
          // Criação do perfil (tabela teste)
          const novoPerfil = await database.teste.create({
            oi: novoUsuario.id, // Relaciona o perfil ao usuário
            tchau: novoUsuario.tcah, // Substitua pelo valor desejado
          });
    
          // Atribuição de roles - ajuste conforme a sua lógica
          await this.atribuirRolesAoUsuario(novoUsuario.id, 'ID da role');
    
          return { usuario: novoUsuario, perfil: novoPerfil };
        } catch (error) {
          console.error(error);
          throw new Error('Erro ao cadastrar usuário com perfil e roles');
        }
      }
      
      async  getUsuariosDocenteIds() {
        try {
            const usuariosDocenteIds = await database.teste.findAll({
                attributes: ['usuarioId'],
                include: [
                    {
                        model: database.roles,
                        attributes: [],
                        where: {
                            nome: 'Docente'
                        }
                    }
                ]
            });
    
            // Mapeia os IDs para um array
            const usuariosDocenteIdsArray = usuariosDocenteIds.map(usuario => usuario.usuarioId);

            const usuarioInformação = await database.Usuarios.findAll({
                where: {
                    id: usuariosDocenteIdsArray
                }
            })
    
            return usuarioInformação;
        } catch (error) {
            console.error('Erro ao obter IDs de usuários docentes:', error);
            throw error;
        }
    }
      async  getUsuariosAdminIds() {
        try {
            const usuariosDocenteIds = await database.teste.findAll({
                attributes: ['usuarioId'],
                include: [
                    {
                        model: database.roles,
                        attributes: [],
                        where: {
                            nome: 'Administrador'
                        }
                    }
                ]
            });
    
            // Mapeia os IDs para um array
            const usuariosDocenteIdsArray = usuariosDocenteIds.map(usuario => usuario.usuarioId);

            const usuarioInformação = await database.Usuarios.findAll({
                where: {
                    id: usuariosDocenteIdsArray
                }
            })
    
            return usuarioInformação;
        } catch (error) {
            console.error('Erro ao obter IDs de usuários docentes:', error);
            throw error;
        }
    }
    
      async  getUsuariosEstudantesIds() {
        try {
            const usuariosDocenteIds = await database.teste.findAll({
                attributes: ['usuarioId'],
                include: [
                    {
                        model: database.roles,
                        attributes: [],
                        where: {
                            nome: 'Estudante'
                        }
                    }
                ]
            });
    
            // Mapeia os IDs para um array
            const usuariosDocenteIdsArray = usuariosDocenteIds.map(usuario => usuario.usuarioId);

            const usuarioInformação = await database.Usuarios.findAll({
                where: {
                    id: usuariosDocenteIdsArray
                }
            })
    
            return usuarioInformação;
        } catch (error) {
            console.error('Erro ao obter IDs de usuários docentes:', error);
            throw error;
        }
    }
    
    
    
    
}

module.exports = UsuarioService