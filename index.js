const expresso = require('express');
const api = expresso();

api.use(expresso.json());api.use(expresso.json());
const porta = 4300



const receitasList = [
    {
        id: 1,
        descricao: "Venda de motores",
        valor: 120000,
        categoria: "vendas"
    }
];
const despesasList = [
    {
        id: 1,
        descricao: "Salário de funcionarios",
        valor: 20000,
        categoria: "salario"
    }
];

// Develor lista de receitas 
api.get('/receita',(req, res) => {
    let repostaReceita = '';

    if(!receitasList.length){
        res.status(500).send();
        return;
    }
    for(const receita of receitasList){
        repostaReceita += '<p>';
        repostaReceita += "Id: "+receita.id+"<br>";
        repostaReceita += "Descricao: "+receita.descricao+"<br>";
        repostaReceita += "Valor: "+receita.valor+"<br>";
        repostaReceita += "Categoria: "+receita.categoria+"<br>";
        repostaReceita += '</p>\n';
    }
    res.send(repostaReceita);
});

//buscar uma receita especifica
api.get('/receita/visualizar/:idRecei',(req, res) => {
    let repostaReceita = '';

    const idReceita = req.params.idRecei;
    const ObjReceita = funcionarioList.find(receita => parseInt(receita.id) === parseInt(idReceita));

    if (!ObjReceita) {
        res.status(500).send();
        return;
    }
    repostaReceita += '<p>';
    repostaReceita += "Id: "+ObjReceita.id+"<br>";
    repostaReceita += "Descricao: "+ObjReceita.descricao+"<br>";
    repostaReceita += "Valor: "+ObjReceita.valor+"<br>";
    repostaReceita += "Categoria: "+ObjReceita.categoria+"<br>";
    repostaReceita += '</p>\n';
    res.send(repostaReceita);
});

//adicionar uma nova receira
api.post('/receita/add',(req,res) => {
   let maiorID = Math.max(...receitasList.map(({ id }) => id));
   
   const objReceita = {id: maiorID+1,descricao:req.body.descricao ,valor:req.body.valor, categoria:req.body.categoria};
    if (!receitasList.length)maiorID=0;
   receitasList.push(objReceita);
    res.send('Usuario adicionado');
    return;
});

//atualizar uma receita já existente
api.put('/receita/atualizar/:idRecei',(req,res) => {
    const idRecei = req.params.idRecei;
    const novaReceita = {id: parseInt(idRecei),descricao:req.body.descricao ,valor:req.body.valor, categoria:req.body.categoria};


    const objReceita = receitasList.find(receita => parseInt(receita.id) === parseInt(idRecei));

    if (objReceita && novaReceita) {
        objReceita.id = novaReceita.id;
        objReceita.descricao = novaReceita.descricao;
        objReceita.valor = novaReceita.valor;
        objReceita.categoria = novaReceita.categoria;
    }
    res.send();
});

//deletar uma receita
api.delete('/receita/deletar/:idRecei',(req,res) => {
    const idRecei = req.params.idRecei;
    const index = receitasList.findIndex(receita => parseInt(receita.id) === idRecei);

    receitasList.splice(index, 1);
    
    res.send();
});

//=======================================

//------------------------------//
//          DESPESAS            //
//------------------------------//

//======================================

// Develor lista de despesas 
api.get('/despesa',(req, res) => {
    let repostaDespesas = '';
    if(!despesasList.length){
        res.status(500).send();
        return;
    }
    for(const despesa of despesasList){
        repostaDespesas += '<p>';
        repostaDespesas += "Id: "+despesa.id+"<br>";
        repostaDespesas += "Descricao: "+despesa.descricao+"<br>";
        repostaDespesas += "Valor: "+despesa.valor+"<br>";
        repostaDespesas += "Categoria: "+despesa.categoria+"<br>";
        repostaDespesas += '</p>\n';
    }
    res.send(repostaDespesas);
});

//buscar uma despesa especifica
api.get('/despesa/visualizar/:idDesp',(req, res) => {
    let repostaDespesas = '';

    const idDesp = req.params.idDesp;
    const ObjDespesa = funcionarioList.find(despesa => parseInt(despesa.id) === parseInt(idDesp));

    if (!ObjDespesa) {
        res.status(500).send();
        return;
    }
    repostaDespesas += '<p>';
    repostaDespesas += "Id: "+ObjDespesa.id+"<br>";
    repostaDespesas += "Descricao: "+ObjDespesa.descricao+"<br>";
    repostaDespesas += "Valor: "+ObjDespesa.valor+"<br>";
    repostaDespesas += "Categoria: "+ObjDespesa.categoria+"<br>";
    repostaDespesas += '</p>\n';
    res.send(repostaDespesas);
});

//adicionar uma nova despesa
api.post('/despesa/add',(req,res) => {
    let maiorID = Math.max(...despesasList.map(({ id }) => id));

    if (!despesasList.length) maiorID=0;
    const objDespesa = {id: maiorID+1,descricao:req.body.descricao ,valor:req.body.valor, categoria:req.body.categoria};

    despesasList.push(objDespesa);
    res.send('Despesa adicionada');
    return;
});

//atualizar uma despesa já existente
api.put('/despesa/atualizar/:idDesp',(req,res) => {
    const idDesp = req.params.idDesp;
    const novaDespesa = {id: parseInt(idDesp),descricao:req.body.descricao ,valor:req.body.valor, categoria:req.body.categoria};


    const objDespesa = despesasList.find(despesa => parseInt(despesa.id) === parseInt(idDesp));

    if (objDespesa && novaDespesa) {
        objDespesa.id = novaDespesa.id;
        objDespesa.descricao = novaDespesa.descricao;
        objDespesa.valor = novaDespesa.valor;
        objDespesa.categoria = novaDespesa.categoria;
    }
    res.send();
});

//deletar uma despesa
api.delete('/despesa/deletar/:idDesp',(req,res) => {
    const idDesp = req.params.idDesp;
    const index = despesasList.findIndex(despesa => parseInt(despesa.id) === idDesp);

    despesasList.splice(index, 1);
    
    res.send();
});
api.listen(porta, () => {console.log('Minha Primeira API na porta:'+porta)});