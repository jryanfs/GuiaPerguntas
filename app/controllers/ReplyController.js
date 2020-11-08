const Reply = require("../models/Resposta");

class ReplyController{
    async store(req,res) {
        try{
            const {body,questionId} = req.body;
            
            if( body == "") {
                return res.redirect(`question/${questionId}`);
            }
            await Reply.create({body,questionId});
            
            return res.redirect(`question/${questionId}`);
        }catch(error){
            return res.status(400).json({error:error});
        } 
    }
}

module.exports =  new ReplyController();
