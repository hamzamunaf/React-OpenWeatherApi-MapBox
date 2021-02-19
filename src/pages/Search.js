/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import fetch from 'isomorphic-unfetch';
import { css } from '@emotion/react';
import Spinner from '../components/Spinner';
import ErrorContainer from '../components/ErrorContainer';
import WeatherDisplay from '../components/WeatherDisplay';
import MapGoogle from './MapGoogle';


function Search({ query }) {
  const [ inputQuery, setInputQuery ] = useState(query || "");
  const [ weathers, setWeather ] = useState([]);
  const [ locationup, setLoc ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ isError, setIsError ] = useState(false);
  const [ locationLat, setlocationLat] = useState(5);
  const [ locationLong, setlocationLong] = useState(34);
  const history = useHistory();
  const styles = css`
  ul{
    list-style-type:none;
    justify-content: center;
    margin-left: auto;
    text-align: center;
  }
  `;

const searchstyle= css`
  text-align: center;
  margin-top:10px;
  input{
    padding: 10px;
    background-color: lightblue;
    margin: 0 0 10px 0;
    border-radius: 12px;
  }
  button{
    padding: 10px;
    margin: 0 0 10px 0;
    background-color: lightblue;
    border-radius: 12px;
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)
  }
`;


  useEffect(() => {
     let ignore = false;
     const controller = new AbortController();
     async function fetchSearchResults() {
       let responseBody = {};
       setIsLoading(true);
       setIsError(false);
       try {
         const res = await fetch(
           `https://api.openweathermap.org/data/2.5/forecast?q=${query}&appid={appid}&units=metric`,
           { signal: controller.signal }
         );
         responseBody = await res.json();
         console.log("RESPONSE ==", responseBody)
       } catch (e) {
         if (e instanceof DOMException) {
           // console.log("HTTP request aborted");
         } else {
           setIsError(true);
           // console.log(e);
         }
       }
       if(responseBody.cod === "404"){
         setIsError(true);
       }

       if (!ignore) {
         setWeather(responseBody.list || []);
         setLoc(responseBody.city || []);
         console.log("City location", responseBody.city);
         setIsLoading(false);
         if(responseBody.city){
           setlocationLat(responseBody.city.coord.lat);
           setlocationLong(responseBody.city.coord.lon);
           console.log(locationLat);
           console.log(locationLong);
         }
         // console.log("== repos:", responseBody.list);
       }
     }
     if (query) {
       fetchSearchResults();
     }
     return () => {
       controller.abort();
       ignore = true;
     };
   }, [ query ]);

   return (
     <div css={searchstyle}>
       <form name='SearchForm' onSubmit={(e) => {
         e.preventDefault();
         history.push(`?q=${inputQuery}`);
       }}>
         <input value={inputQuery} onChange={e => setInputQuery(e.target.value)} />
         <button type="submit">Search</button>
       </form>
       <h2>Search query: {query}</h2>
       {isError && <ErrorContainer>Error message!</ErrorContainer>}
       {isLoading ? (
         <Spinner />
       ) : (
         <div css={styles}>
         <div>
         <MapGoogle setLat={locationLat} setLng={locationLong} />
         </div>
         <ul>
           {weathers.map(weather => (
             <li key={weather.id}>
             <WeatherDisplay date={weather.dt_txt} forecast={weather.weather[0].description} minTemp={weather.main.temp_min} feelslike={weather.main.feels_like} icon={"http://openweathermap.org/img/w/"+weather.weather[0].icon + ".png"} maxTemp={weather.main.temp_max}/>
             </li>
           ))}
         </ul>
         </div>
       )}
     </div>
   );
  }

  export default Search;
