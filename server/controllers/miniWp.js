const articleModel = require('../models/article')
class Article {
    static getAll(req,res,next){
        articleModel.find()
        .then(datas=>{
            res.status(200).json(datas)
        })
        .catch(next)
    }

    static getArticle(req,res,next){
        articleModel.find({
            title : new RegExp(req.body.search,'i')
        })
        .then(data=>{
            console.log(data)
            res.status(200).json(data)
        })
        .catch(next)
    }

    static getMyArticle(req,res,next){
        articleModel.find({
            user : req.decode.id
        })
        .then(data=>{
            console.log(data)
            res.status(200).json(data)
        })
        .catch(next)
    }

    static createArticle(req,res,next){
        let {
            id
        } = req.decode
        const {title,content} = req.body
        articleModel.create({title,content, user: id})
        .then(data => {
            res.status(201).json({data})
        })
        .catch(next)
    }

    static deleteArticle(req,res,next){
        articleModel.findOneAndDelete({
            _id : req.params.id
        })
        .then(data=>{
            if(data!==null){
                res.status(200).json({
                    message: "Success Remove",
                    data: data
                })
            } else {
                res.status(404).json({
                    message: "Data is not found"
                })
            }
        })
        .catch(next)        
    }

    static updateArticle(req,res,next){
        let updatedData = {}
        req.body.title && (updatedData.title = req.body.title)
        req.body.content && (updatedData.content = req.body.content)
        articleModel.findOneAndUpdate({_id : req.params.id}, updatedData)
        .then(data=>{
            if(data!==null){
                res.status(200).json({
                    message: "Success Update"
                })
            } else {
                res.status(404).json({
                    message: "Data is not found"
                })
            }
        })
        .catch(next)
    }
}

module.exports = Article