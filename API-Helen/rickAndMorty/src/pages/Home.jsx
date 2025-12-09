import React, { useEffect, useState} from "react";
import Card from "../components/Card";
import axios from "axios";

export default function Home(){
    const [characters, setCharacters] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");



    useEffect(() => {
            fetchCharacters(page);
        }, [page]);

    async function fetchCharacters(page){
        setLoading(true);
        setErrorMsg("");

        try{
            const response = await  axios.get(
                `https://rickandmortyapi.com/api/character?page=${page}`
            );
                setCharacters(response.data.results);
            
        }catch(error){
            setErrorMsg("Erro ao buscar personagens!")
        }
        setLoading(false);
    }

    function handleSearch(){
        if (!searchTerm.trim()) {
            fetchCharacters(page);
            return;
        }

        const filtered = characters.filter(char =>
            char.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (filtered.length === 0) {
            setErrorMsg("Nenhum personagem encontrado");
            setCharacters([]);
        } else {
            setErrorMsg("");
            setCharacters(filtered);
        }
    }

    return(
        <div className="container">
            <h1>Rick and Morty</h1>

            <div className="search-box">
                <input 
                    type="number" 
                    placeholder="Digite uma página" 
                    value={page}
                    onChange={(e) => setPage(e.target.value)} 
                />
            </div>

            {loading && <p className="loading">Carregando...</p>}
            {errorMsg && <p className="loading">{errorMsg}</p>}

            <div className="cards-grid">
                {characters?.map((char) => (
                    <Card
                        key={char.id}
                        name={char.name}
                        image={char.image}
                        species={char.species}
                        status={char.status}
                    />
                ))}
            </div>
        </div>
    );
}