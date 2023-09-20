import React, { useEffect, useState } from "react";
import "./PokemonDetails.css";
import { useParams } from "react-router-dom";

const PokemonDetails = ({ closeModal }) => {
  // console.log(pokemon)

  const { pokemonId } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    // Fetch the details of the selected Pokemon using the ID
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setPokemon(data);
      })
      .catch((error) => {
        console.error("Error fetching Pokemon data:", error);
      });
  }, [pokemonId]);

  if (!pokemon) {
    return (
      <div className="modal-overlay">
        <div className="modal">
          <div className="button-container">
            <button type="submit" className="cancelbtn" onClick={closeModal}>
              X
            </button>
          </div>
          <div className="details-loading">
            <p>Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="button-container">
          <button type="submit" className="cancelbtn" onClick={closeModal}>
            X
          </button>
        </div>
        <div className="details-container" key={pokemon.id}>
          <div className="image-container">
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
              alt={`${pokemon.name} Official Artwork`}
            />
          </div>
          <div className="pokemon-infos">
            <p className="dex-no">#{pokemon.id}</p>
            <h1>{pokemon.name}</h1>
            <div className="stat-container">
              <p className="stats">Base Stats</p>
              {pokemon.stats.map((stat, index) => (
                <React.Fragment key={index}>
                  <p>{stat.stat.name} - {stat.base_stat}</p>

                  <div className={stat.stat.name}>
                    <div
                      className="animated-stat w3-container w3-center"
                      id={stat.stat.name}
                      style={{
                        width: `${stat.base_stat}%`,
                        borderRadius: "10px",
                      }}
                    >
                      
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetails;
