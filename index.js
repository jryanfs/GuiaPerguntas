const express = require('express')
const bodyParser = require('body-parser')
const connection =  require('./Database/database')
const perguntaModel = require('./Database/Pergunta');
const pergunta = require('./Database/Pergunta');
const resposta = require('./Database/Resposta')
const app = express();


// Database

connection
        .authenticate()
        .then(()=>{
            console.log("Conexão feita com o banco de dados")
        })
        .catch((erro)=>{
            console.log(erro)
        })
// Estou dizendo para o express usar a "view engine" --> EJS
app.set('view engine', 'ejs')

app.use(express.static('public'))
// BodyParser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());





app.get('/',(req,res)=>{   
    perguntaModel.findAll({ raw: true, order:[
        ['id','DESC']
    ]}).then(perguntas =>{
        res.render("page",{
            perguntas: perguntas
        });
    })
})

app.get('/perguntar',(req,res)=>{
    return res.render("perguntar")
})


app.post('/salvarpergunta',(req,res)=>{
    var title = req.body.title;
    var description = req.body.description

    if(title == "" || description == ""){
        return res.render("perguntar")
    }
    pergunta.create({
        title: title,
        description: description
    }).then(()=>{
        res.redirect('/');
    })
})

app.get('/pergunta/:id', (req,res)=>{

    let id = req.params.id;

    perguntaModel.findOne({
        where:{
            id:id
        }
    }).then(pergunta=>{
        if(pergunta!=undefined){
            
            resposta.findAll({
                where:{
                    perguntaId: id,           
                },
                order:[['id','DESC']]
                
            }).then((resposta)=>{

                return res.render("respergunta",{
                    pergunta:pergunta,
                    resposta:resposta
                })
            })
        }else{
            return res.redirect("/")
        }
    })

})






app.post('/responder',(req,res)=>{
    let corpo = req.body.corpo;
    let perguntaId = req.body.perguntaId;

    if(corpo == ""){
        return res.redirect('pergunta/'+perguntaId)
    }
    
    resposta.create({
        corpo:corpo,
        perguntaId:perguntaId
    }).then(()=>{
        return res.redirect('/pergunta/'+perguntaId)
    })

})































app.listen(3333,function(erro){

    if(erro){
        console.log("Server contains one error!!!!")
    }else{
        console.log("Server is running")
    }

})