
import React from 'react';
import './PokemonCard.css';
const PokemonCard = ({ pokemons, loading,openModal }) => {


  return (
    <>
      {loading ? (
        <div className="Error">Loading...</div>
      ) : (
        <div className="container">
          {pokemons.map((pokemon) => {
            const imgSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
            return (
              <div
                className="pokemon-card"
                key={pokemon.id}
                
                onClick={() => openModal(pokemon)}
              >
                {!!imgSrc ? (
                  <>
                    <div className="pokemon-img">
                      <img src={imgSrc} alt={'Pokemon Picture'} />
                    </div>
                    <div className="pokemon-info">
                      <div>
                        <p>#{pokemon.id}</p>
                        <h2>{pokemon.name}</h2>
                      </div>
                      <div className="pokemon-type">
                        <p>Type:</p>
                        <div className="Ptype">
                          {pokemon.types.map((typeData, typeIndex) => (
                            <div
                              className={
                                typeData.type.name.charAt(0).toUpperCase() +
                                typeData.type.name.slice(1)
                              }
                              key={typeIndex}
                            >
                              {typeData.type.name.charAt(0).toUpperCase() +
                                typeData.type.name.slice(1)}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
               
                  </>
                ) : (
                  <img src={pokemonCardDefault} alt="Default" />
                )}
              </div>
            );
          })}
        </div>
      )}
      
    </>
  );
};

export default PokemonCard;
