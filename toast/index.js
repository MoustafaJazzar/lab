import $ from 'blingblingjs'
import Toast from './toast.js'


$('#actions').on('click', () => {
    Toast(randomAction())
})

const randomAction = () => {
    const actions = ['Saved', 'Added to cart', 'In cart', 'User removed', 'Timer set', 'Added to Favorites', `Multi-Line \n Support `, 'This is just really long and completely unnecessary']
    return `${actions[getRandomInt(0, actions.length-1)]}`
}

const getRandomInt = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}