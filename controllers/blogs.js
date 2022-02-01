const blogRouter = require('express').Router()
const Blog = require("../models/blog")
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs) 
})
  
blogRouter.post('/', async (request, response) => {
    const body = request.body
    const user = await User.findById(body.userId)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url:  body.url,
      likes: body.likes,
      user: user._id
    })

    const result = await blog.save()
    user.blogs = user.blogs.concat(result._id)
    await user.save()
    response.status(201).json(result)
})

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})  

blogRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    name: body.name,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })

  response.json(updatedBlog)
})

module.exports = blogRouter