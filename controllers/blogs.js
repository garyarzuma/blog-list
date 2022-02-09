const blogRouter = require('express').Router()
const Blog = require("../models/blog")
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user',{username: 1, name: 1})
  response.json(blogs) 
})
  
blogRouter.post('/', middleware.userExtractor, async (request, response) => {
    const body = request.body
    const user1 = request.user

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url:  body.url,
      likes: body.likes,
      user: user1._id
    })

    const test = await blog.save()
    const result = await test.populate('user',{username: 1, name: 1})

    user1.blogs = user1.blogs.concat(result._id)
    await user1.save()
    response.status(201).json(result)
})

blogRouter.delete('/:id',middleware.userExtractor, async (request, response) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)
  if(blog.user.toString() !== user._id.toString()) {
   return response.status(401).json({error: 'user is not authorized to delete this blog'})
  }

  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})  

blogRouter.put('/:id', middleware.userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user

  const blog = {
    name: body.name,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: body._id
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true }).populate('user',{username: 1, name: 1})

  response.json(updatedBlog)
})

module.exports = blogRouter