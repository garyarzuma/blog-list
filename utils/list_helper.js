const dummy = (blogs) => {
    return 1
  }
  
const totalLikes = (blogs) => {
    const addLikes = (prev, curr) => {
        return prev + Number(curr.likes)
    }
    return blogs.reduce(addLikes,0)
}
  module.exports = {
    dummy, totalLikes
  }