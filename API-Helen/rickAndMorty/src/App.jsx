import React, { useState, useEffect } from 'react'
import Character from './character.js'
import Pagination from './pagination.jsx'

const [loading, setLoading] = useState(true)
const [characters, setCharacters] = useState([])
const [currentPageUrl, setCurrentPageUrl] = useState("https://rickandmortyapi.com/api/character")
const [nextPageUrl, setNextPageUrl] = useState()
const [prevPageUrl, setPrevPageUrl] = useState()
const [pages, setPages] = useState()


useEffect(() => {
  const url = currentPageUrl
  setLoading(true)
  const fetchData = async () => {
    const res = await fetch(url);
    const data = await res.json();
    setCharacters(data.results)
    setLoading(false);
    setNextPageUrl(data.info.next);
    setPrevPageUrl(data.info.prev);
    setPages(data.info.pages)
  }
  fetchData();
},[currentPageUrl])

function nextPage() {
    setCurrentPageUrl(nextPageUrl)
}
function prevPage() {
    setCurrentPageUrl(prevPageUrl)
}
function goToPage(num) {
    setCurrentPageUrl(`https://rickandmortyapi.com/api/character?page=${num}`)
}
if (loading) return "Loading..."
const charList = characters.map(char => <Character key={Math.floor(Math.random() * 10000)} name={char.name} img={char.image} />)

return (
  <div className="App">
    <Pagination
      // Se nextPageUrl existe, passa a função nextPage, senão passa null (desativa o botão)
      nextPage={nextPageUrl ? nextPage : null}
      // Se prevPageUrl existe, passa a função prevPage, senão passa null (desativa o botão)
      prevPage={prevPageUrl ? prevPage : null}
      goToPage={goToPage}
      pages={pages}
    />

    <div className="char-cards">
      {/* Aqui é onde o array de componentes Character é renderizado */}
      {charList} 
    </div>

    {/* Você adicionou a paginação no topo e no rodapé */}
    <Pagination
      nextPage={nextPageUrl ? nextPage : null}
      prevPage={prevPageUrl ? prevPage : null}
      goToPage={goToPage}
      pages={pages}
    />
  </div>
);