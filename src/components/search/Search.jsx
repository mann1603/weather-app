import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApioptions } from "../../Api";

const Search = ({onSearchChange}) => {

  const [search, setSearch] = useState(null);

  const handleOnChhange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  }

  const loadOptions = async (inputValue) => {
   return fetch(
    `${GEO_API_URL}/cities?minPopulation=100000&namePrefix=${inputValue}`,
    geoApioptions
   )
    .then((response) => response.json())
    .then((response) => {
        return{
            options: response.data.map((city) => {
                return{
                    value: `${city.latitude} ${city.longitude}`,
                    label: `${city.name}, ${city.countryCode}`,
                }
            })
        }
   })
    .catch((err) => console.log(err));
  }

  return (
    <AsyncPaginate
      placeholder="search for city"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChhange}
      loadOptions={loadOptions}
    />
  );
  }
export default Search;
