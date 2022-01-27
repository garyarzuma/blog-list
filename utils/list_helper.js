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
    return max 
}




  module.exports = {
    dummy, totalLikes, mostLiked
  }