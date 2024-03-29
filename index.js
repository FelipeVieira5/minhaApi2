const expresso = require('express');
const { status } = require('express/lib/response');
const minhaApi = expresso();
const Sequelize = require('sequelize');

minhaApi.use(expresso.json());minhaApi.use(expresso.json());
const conexao = new Sequelize('nodejs', 'root', 'root', {
    host: 'localhost', // URL
    dialect: 'mysql'
});

const porta = 4300

conexao.authenticate()
    .then(() => {
        console.log('Conectado com sucesso.');
    }).catch((erro) => {
        console.log('Deu Erro: ', erro);
    });

const Cargo = conexao.define('cargos', {
    codigo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    descricao: {
        type: Sequelize.STRING(128),
        allowNull: false
    }
});
    
const Usuario = conexao.define('usuarios', {
    codigo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: Sequelize.STRING(128),
        allowNull: false
    },
    idade: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    CPF: {
        type: Sequelize.STRING(11),
        allowNull: false
    }
});
    
Usuario.belongsTo(Cargo, { foreignKey: 'cargoId' });

conexao.sync({ alter: true }).then(() => {
    console.log('Tabelas sincronizadas com sucesso.');
}).catch((erro) => {
    console.log('Erro ao sincronizar tabelas: ', erro);
});



// Develor uma lista de usuários 
minhaApi.get('/usuarios',async(req, res) => {
    const usuarios = await Usuario.findAll();
    res.send(usuarios);
});


//Devolver os dados de um usuário específico pelo seu ID na URL
minhaApi.get('/usuarios/:idUsuario', async(req, res) => {
    const funcionarOd = parseInt(req.params.idUsuario);
    const funcionario = await Usuario.findByPk(funcionarOd);
    res.send(funcionario);
});
/*
{
    "codigo":1,
    "nome":"Rodrigo",
    "idade":12,
    "CPF":"23421354323",
    "Cargo":1
}
*/
minhaApi.post('/usuarios', async (req, res) => {
    try {
        const cargo = await Cargo.findByPk(req.body.Cargo);
        if (!cargo) {
            res.status(500).send('Cargo não encontrado');
            return;
        }
        await Usuario.create({
            nome: req.body.nome,
            idade: req.body.idade,
            CPF: req.body.CPF,
            cargoId: req.body.Cargo
        });
        res.status(200).send('Usuário cadastrado com sucesso');
    } catch (error) {
        res.status(500).send('Ocorreu um erro: ' + error.message);
    }
});


//Atualizar um usuário pelo ID na URL 
minhaApi.put('/usuarios/:idUsuario',async (req,res) => {
    const codUsuario = req.params.idUsuario;

    try {
        await Usuario.update({
            codigo: parseInt(codUsuario),
            nome:req.body.nome,
            idade:req.body.idade,
            CPF:req.body.CPF,
            Cargo:req.body.Cargo
        }, {
            where: {
                codigo: codUsuario
            }
        });

        res.send();
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao atualizar o usuário');
    }
});


// Requisição para deletar um úsuario pelo seu ID na URL
minhaApi.delete('/usuarios/:idUsuario',async(req,res) => {
    const codUsuario = req.params.idUsuario;

    try {
        const deletarUsuario = await Usuario.destroy({
            where: {
                codigo: codUsuario
            }
        });

        if (!deletarUsuario) {
            res.status(404).send('Usuario nao encontrado');
        } else  res.send('Usuario deletado');

    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao deletar o Usuario');
    }
});

//========================================//
//                CARGO                   //
//========================================//

// Requisição para buscar a lista de cargos
minhaApi.get('/cargos', async (req,res) => {
    const cargos = await Cargo.findAll();
    res.send(cargos);
});


// Requisição para buscar um cargo pelo seu código
minhaApi.get('/cargos/:codCargo',async (req, res) => {
    const id = parseInt(req.params.codCargo);
    const novoCargo = await Cargo.findByPk(id);
    res.send(novoCargo);
});

// Requisição para criar um novo cargo
minhaApi.post('/cargos',(req,res) => {
    const descricao=req.body.descricao;
    Cargo.create({descricao:descricao}).then(()=>{
        res.send('Cargo cadastrado com sucesso');
    }).catch((erro)=>{
        res.send('Ocorreu erro: ',erro);
    });
    
    return;
});

//Atualizar um usuário pelo ID na URL 
minhaApi.put('/cargos/:codCargos',async (req,res) => {
    const codCargos = req.params.codCargos;

    try {
        await Cargo.update({
            codigo: parseInt(codCargos),
            descricao: req.body.descricao
        }, {
            where: {
                codigo: codCargos
            }
        });

        res.send();
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao atualizar o usuário');
    }
});


minhaApi.delete('/cargos/:codCargos', async (req, res) => {
    const codCargos = req.params.codCargos;

    try {
        const deletedCargo = await Cargo.destroy({
            where: {
                codigo: codCargos
            }
        });

        if (!deletedCargo) {
            res.status(404).send('Cargo nao encontrado');
        } else  res.send('Cargo deletado');

    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao deletar o cargo');
    }
});

minhaApi.listen(porta, () => {console.log('Minha Primeira API na porta:'+porta)});