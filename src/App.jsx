
import React, { useEffect, useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import PokemonCard from './components/PokemonCard';
import { useNavigate } from 'react-router-dom';
import PokemonDetails from './components/PokemonDetails';
import Pages from './components/Pages';

const App = () => {
  const [pokemons, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon/');
  const [nextUrl, setNextUrl] = useState();
  const [prevUrl, setPrevUrl] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(65);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        const pokemonDataPromises = data.results.map((pokemon) =>
          fetch(pokemon.url)
            .then((response) => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json();
            })
        );

        Promise.all(pokemonDataPromises)
          .then((pokemonDataArray) => {
            const sortedPokemonData = pokemonDataArray.sort((a, b) =>
              a.id > b.id ? 1 : -1
            );
            setPokemon(sortedPokemonData);
            setNextUrl(data.next);
            setPrevUrl(data.previous);
            setLoading(false);
          })
          .catch((error) => {
            console.error('Error fetching Pokemon data:', error);
            setLoading(false);
          });
      })
      .catch((error) => {
        console.error('Error fetching Pokemon data:', error);
        setLoading(false);
      });
  }, [url]);

  const handlePreviousBtn = () => {
    setPokemon([]);
    setUrl(prevUrl);
    setCurrentPage(currentPage - 1);

    navigate(`/page_${currentPage - 1}`);
  };

  const handleNextBtn = () => {
    setPokemon([]);
    setUrl(nextUrl);
    setCurrentPage(
      currentPage === totalPages ? currentPage : currentPage + 1
    );

    navigate(`/page_${currentPage + 1}`);
  };

  const closeModal = () => {
    
    setIsModalOpen(false);
    navigate(-1)
    
  };

  const openModal = (pokemon) => {
    setSelectedPokemon(pokemon);
    
    setIsModalOpen(true);
    navigate(`/page_${currentPage}/${pokemon.id}`);
  };

  
// for Types
const [typeUrl, setTypeUrl] = useState('https://pokeapi.co/api/v2/type/')
const [types, setType] = useState([])


useEffect(() => {

  fetch(typeUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
       // Sorting alphabetically
       const sortedTypes = data.results.sort((a, b) =>
       a.name.localeCompare(b.name)
     );
      
      setType(sortedTypes)})
    .catch((error) => {
      setError(error.message);
    
    });
}, [typeUrl]);


// for filter

const [selectedType, setSelectedType] = useState('');
const [searchInput, setSearchInput] = useState('');

const handleTypeChange = (event) => {
  setSelectedType(event.target.value);
  console.log(event.target.value);
};

const handleSearchInputChange = (event) => {
  setSearchInput(event.target.value);

};

const filteredPokemons = pokemons.filter((pokemon) => {
  
//Filter code
  const pokemonType = pokemon.types.map((typeObj) => typeObj.type.name);
  const isTypeMatch = selectedType === 'All'||!selectedType || pokemonType.includes(selectedType);
  
    // for search
  const isNameMatch =
    !searchInput ||
    pokemon.name.toLowerCase().includes(searchInput.toLowerCase());

  //console.log('isNameMatch:', isNameMatch);

  return isTypeMatch && isNameMatch;
});


 
  return (
    <>
    
      <SearchBar types={types} handleSearchInputChange={handleSearchInputChange}
      handleTypeChange={handleTypeChange}
/>
      <Pages
        handlePreviousBtn={handlePreviousBtn}
        handleNextBtn={handleNextBtn}
        prevUrl={prevUrl}
        nextUrl={nextUrl}
        currentPage={currentPage}
        totalPages={totalPages}
      />

      <div className="landing-page">
        <PokemonCard
          pokemons={filteredPokemons}
          loading={loading}
          setSelectedPokemon={setSelectedPokemon}
          openModal={openModal}
          
          

        />

        {isModalOpen && (
          
          <PokemonDetails
          pokemon={selectedPokemon}
          closeModal={closeModal}
          />
        )}
      </div>
    </>
  );
};

export default App;
