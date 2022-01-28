const listHelper = require('../utils/list_helper')
const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Edsger W. Dijkstra",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }  
]

test('dummy returns one', () => {
  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test(' all likes for all blog posts', () => {
    expect(listHelper.totalLikes(blogs)).toBe(36)
  })

  emptyBlog = [];

  test(' 0 likes for empty blog array', () => {
    expect(listHelper.totalLikes(emptyBlog)).toBe(0)
  })
})

describe('most liked', () => {
  test(' most liked for all blog posts', () => {
    expect(listHelper.mostLiked(blogs)).toEqual({
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    })
  })

  emptyBlog = [];

  test(' 0 likes for empty blog array', () => {
    expect(listHelper.mostLiked(emptyBlog)).toEqual({"likes": 0})
  })
})


describe('most authored', () => {
  test(' most authored blog posts for all blog posts', () => {
    expect(listHelper.mostBlogs(blogs)).toEqual({
      author: "Edsger W. Dijkstra",
      blogs: 3,
    })
  })

  emptyBlog = [];

  test(' 0 for empty blog array', () => {
    expect(listHelper.mostBlogs(emptyBlog)).toEqual({
      "author": "None",
       "blogs": 0
      })
  })
})

describe('most liked author', () => {
  test(' for all blog posts', () => {
    expect(listHelper.mostLikedAuthor(blogs)).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 27,
    })
  })

  emptyBlog = [];

  test(' 0 for empty blog array', () => {
    expect(listHelper.mostLikedAuthor(emptyBlog)).toEqual({
      "author": "None",
      "likes": 0
      })
  })
})