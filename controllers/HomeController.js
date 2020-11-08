const Question =  require('../models/Pergunta');

class HomeController{
    async index(req,res){
        try{
            const questions = await Question.findAll({ 
                raw:true,
                order:[
                    [ 'id','DESC']
                ]
            });
            
            return res.render('home',{questions});
        }catch(error){
            return res.status(400).json({error:error});
        }
    }
}

module.exports = new HomeController();
