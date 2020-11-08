const Question = require('../models/Pergunta');
const Reply = require('../models/Resposta')

class QuestionController{

    async store(req,res) {
        try{
            var title = req.body.title;
            var description = req.body.description;
            
            if(title == "" || description == ""){
                return res.render("question")
            }
            
            await Question.create({title,description});
            return res.redirect('/home');

        }catch(error){
            return res.status(400).json({error:error});
        } 
    }

    async indexById(req,res) {
        try{
                let id = req.params.id;
                const question = await Question.findOne({where:{
                        id:id
                    }
                });
            
            if(question == undefined){
                return res.redirect('/home');
            }
            
            const replys = await Reply.findAll({
                where:{
                    questionId: id
                },
                order:[
                    ['id','DESC']
                ]
            });
            return res.render("replyQuestion",{question,replys});
        
        }catch(error){
            return res.status(400).json({error:error});
        }
    }

    async index(req,res) {
        try{
            return res.render("question");
        }catch(error){
            return res.status(400).json({error:error});
        }
    }

}

module.exports =  new QuestionController();