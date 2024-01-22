const {validationResult} = require('express-validator')
const Comment = require('../model/comment-model')
const Post = require('../model/post-model')
const _ = require('lodash')
const commentCltr = {}

commentCltr.create = async(req,res)=>{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            res.json(400).json({errors:errors.array()})
        } else {
            const body = _.pick(req.body,['content'])
             try{
            const comment = new Comment(body)
            comment.author = req.user.id
            comment.post = req.params.postId
            await comment.save()
            res.status(201).json(comment)
        } catch(e){
            res.status(500).json(e)
        }
        }      
}

commentCltr.retrieve = async(req,res) =>{
    const {postId} = req.params.postId
    try{   
        const comment = await Comment.find({post:postId})
        res.json(comment)
    } catch(e){
        res.status(400).json(e)
    }
}

commentCltr.update = async(req,res) =>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
         res.status(400).json({errors:errors.array()})
    }
    const commentId = req.params.commentId
    const postId = req.params.postId
    const body = _.pick(req.body,['content'])
    try{
        const comment = await Comment.findOneAndUpdate({_id:commentId, author: req.user.id}, body, {new:true})
        res.json(comment)
    } catch(e){
        res.status(500).json(e)
    }
   
}

commentCltr.delete = async (req,res) =>{
    const postId = req.params.postId
    const commentId = req.params.commentId
    try{
        const comment = await Comment.findOneAndDelete({author:req.user.id, _id:commentId, post:postId})
        await Post.findByIdAndUpdate(postId,{$pull:{comment:commentId}})
        res.status(200).json(comment)
    } catch(e){
        console.log(e)
        res.status(500).json(e)
    }
}
module.exports = commentCltr
