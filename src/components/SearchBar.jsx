
import "./SearchBar.css";
import logo from "../assets/Pokedex_logo.png";

const SearchBar = ({types,handleTypeChange,handleSearchInputChange}) => {



  // console.log(types);
  return (
    <>
      <div className="searchbar-container">
        <div className="logo">
          <img src={logo} alt="Pokedex logo" />
        </div>

        <div className="search-container">
          <input
            placeholder="Search Pokemon Name..."
            onChange={handleSearchInputChange}
          />
        </div>

        <div className="filter-container">
          <select onChange={handleTypeChange}>
        
            <option value ={'All'}>All</option>
            {types.map((type,index) => (
              
           <option key={index} value={type.name}>
                {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
              </option>

              

            )       
)}
          </select>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
