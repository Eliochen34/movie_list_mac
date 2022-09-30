const express = require('express')
const app = express()
const port = 3000

// require express-handlebars here
const exphbs = require('express-handlebars')
const movieList = require('./movies.json')


// setting template engine
app.engine('handlebars', exphbs({defaultLayout: 'main'})) 
app.set('view engine', 'handlebars')

//setting static files
app.use(express.static('public'))

app.get('/', (req, res) => {
  const numberList = [1, 2, 3, 4, 5]
  res.render('index', {movies: movieList.results, numbers: numberList})
})

app.get('/movies/:movie_id', (req, res) => {
  console.log(req.params.movie_id)
  const movie = movieList.results.find(item => item.id.toString() === req.params.movie_id)
  res.render('show', {movie: movie})
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const movies = movieList.results.filter(item => item.title.toLocaleLowerCase().includes(keyword))
  res.render('index', {movies: movies, keyword: keyword})
})

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})