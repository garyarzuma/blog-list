const { max } = require("lodash")

const dummy = (blogs) => {
    return 1
  }
  
const totalLikes = (blogs) => {
    const addLikes = (prev, curr) => {
        return prev + Number(curr.likes)
    }
    return blogs.reduce(addLikes,0)
}

const mostLiked = (blogs) => {
    let max = {likes:0}
    blogs.forEach( (blog) => {
        if (blog.likes >= max.likes) max = blog  
    })
    return maxFiltered = {
        title: max.title,
        author: max.author,
        likes: max.likes,
    }
}

const mostBlogs = (blogs) => {
    let authors = {}
    blogs.forEach(blog => {
        if(authors[blog.author]===undefined){
            authors[blog.author] = 1
        }
        else authors[blog.author]++
    })
    let max = 0
    let maxAuthor = "None"
    for (const key in authors) {
        if (authors[key] >= max) {
            max = authors[key]
            maxAuthor = key
        }
    }
    return {"author" : maxAuthor, "blogs": max}
}

const mostLikedAuthor = (blogs) => {
    let authors = {}
    blogs.forEach(blog => {
        if(authors[blog.author]===undefined){
            authors[blog.author] = blog.likes
        }
        else authors[blog.author] += blog.likes
    })
    let max = 0
    let maxAuthor = "None"
    for (const key in authors) {
        if (authors[key] >= max) {
            max = authors[key]
            maxAuthor = key
        }
    } 
    return {"author" : maxAuthor, "likes": max}  
}

  module.exports = {
    dummy, totalLikes, mostLiked, mostBlogs, mostLikedAuthor
  }