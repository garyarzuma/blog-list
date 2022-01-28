const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async ()=>{
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

describe('when there is initially some blogs saved', () => {
    test('blogs are returned as json', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })
  
    test('all blogs are returned', async () => {
      const response = await api.get('/api/blogs')
  
      expect(response.body).toHaveLength(helper.initialBlogs.length)
    })
  
    test('a specific blog is within the returned blog list', async () => {
      const response = await api.get('/api/blogs')
  
      const author = response.body.map(r => r.author)
  
      expect(author).toContain(
        'Michael Chan'
      )
    })
  })

afterAll(() => {
  mongoose.connection.close()
})