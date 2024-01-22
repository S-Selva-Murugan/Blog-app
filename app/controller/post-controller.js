const _ = require('lodash')
const {validationResult} = require('express-validator')
// import { useParams } from 'react-router-dom'
const Post = require('../model/post-model') 
const postCltr = {}

postCltr.create = async (req,res) =>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.status(400).json({errors:errors.array()})
    } else {
        const body = _.pick(req.body,['title','content','author','comments','tags'])
        body.postImage = req.file.filename
        try{
            const post = new Post(body)
            post.author = req.user.id
            await post.save()
            res.status(201).json(post)
        } catch(e){
            res.status(500).json(e)
        }
    }
}

postCltr.retrieve = async(req,res)=>{
    try{
        const post = await Post.find({})
        res.status(200).json(post)
    }catch(e){
        res.status(500).json(e)
    }
}

postCltr.retrieveOne = async(req,res)=>{
     const postId = req.params.id;
    try{
       
        const post = await Post.findById(postId)
       res.status(400).json(post)
    }catch(e){
        res.status(500).json(e)
    }
}

postCltr.update = async(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.status(400).json({errors:errors.array()})
    } else {
        const body = _.pick(req.body,['title','content'])
        try{
            const post = await Post.findOneAndUpdate({_id:req.params.id,author:req.user.id},body,{new:true})
            res.status(200).json(post)
        } catch(e){
            res.status(500).json(e)
        }
    }
}

postCltr.delete = async(req,res) =>{
    try{
        const post = await Post.findByIdAndDelete(req.params.id)
        res.status(200).json(post)
    }catch(e){
        res.json(500).json(e)
    }
}

postCltr.getMyPosts = async(req,res)=>{
    try{
        const mypost = await Post.find({author:req.user.id})
        res.status(200).json(mypost)
    } catch(e){
        console.log(e)
        res.status(500).json(e)
    }
}

module.exports = postCltr