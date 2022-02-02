const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')

const Blog = require('../models/blog')
const User = require('../models/user')

let token //make global

beforeEach(async ()=>{   
    //create a user
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })
    await user.save() 

    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
    //login
    const userLogin = {
      username: 'root',
      password: 'sekret'
    }
    const response = await api
      .post('/api/login')
      .send(userLogin)
    
    token = response.body.token;
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
  
      expect(author).toContain('Michael Chan')
    })

    test('id is returned not as _id', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[0].id).toBeDefined()
    })
  })

  describe('when a blog is added', () => {
    test('blog count increases by 1', async () => {
      const newBlog = {
        title: "How To Add a New Blog",
        author: "Gary Arzumanyan",
        url: "https://blogsRus.com/",
        likes: 79,
      }
      const curLength = await helper.blogsInDb()
      await api
        .post('/api/blogs')
        .send(newBlog)
        .set('authorization', `bearer ${token}`)
        .expect(201)
        .expect('Content-Type', /application\/json/)
      const endLength = await helper.blogsInDb()
      expect(endLength.length).toBe(curLength.length+1)
      }) 
      
    test('blog added without likes defaults to 0', async () => {
      const newBlog = {
        title: "A Bad Blog",
        author: "Gary Arzumanyan",
        url: "https://badBlogs.com/",
      }
      const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .set('authorization', `bearer ${token}`)
        .expect(201)
        .expect('Content-Type', /application\/json/)
      
      expect(response.body.likes).toBe(0)
  })

  test('blog added without title returns with 400 Bad Request', async () => {
    const newBlog = {
      author: "Gary Arzumanyan",
      url: "https://badBlogs.com/",
    }
    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .set('authorization', `bearer ${token}`)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

  test('blog added without url returns with 400 Bad Request', async () => {
    const newBlog = {
      title: 'I have no url',
      author: "Gary Arzumanyan",
    }
    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .set('authorization', `bearer ${token}`)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

  test('blog added without token returns with 401 Bad Request', async () => {
    const newBlog = {
      title: 'I have no token!',
      author: "Gary Arzumanyan",
      url: "Notokens.com"
    }
    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)
  })
})

describe('when a blog is deleted', () => {
  test('blog count decreases by 1', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
    const response = await api
      .post('/api/blogs')
      .set('authorization', `bearer ${token}`)
      .send(blogToDelete)
      .expect(201)
    
    idToDelete = response.body.id
 
    await api
      .delete(`/api/blogs/${idToDelete}`)
      .set('authorization', `bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length) 
  }) 
})

describe('when a blog is updated', () => {
  test('like count increases by 1', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = {...blogsAtStart[0]}

    blogToUpdate.likes++

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)

    const blogAtEnd = await helper.blogsInDb()
    expect(blogAtEnd[0].likes).toBe(blogsAtStart[0].likes + 1)
  }) 
})

afterAll(() => {
  mongoose.connection.close()
})