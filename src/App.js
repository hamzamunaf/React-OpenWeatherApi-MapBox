/** @jsxImportSource @emotion/react */
import React from 'react';
import {   NavLink,Switch, Route, Redirect, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import Search from './pages/Search';
import { css, Global } from '@emotion/react';
function useQueryString() {
  return queryString.parse(useLocation().search);
}

const globalFont=css`
body{
  font-family: "Agency FB", sans-serif;
  font-size: x-large;
  background-color: lightblue;
}  `;

const menuFunction = css`

ul {
    padding: 2px;
     margin: 2px;
     text-align: center;
     float: left;
     background: lightblue;
}
  li {
  list-style-type: none;
  padding: 0px;
  height: 24px;
  margin-top: 10px;
  margin-bottom: 10px;
  display: inline;
}
li a {
  color: black;
  font-size: 30px;
  text-decoration: none;
  line-height: 70px;
  padding: 10px 15px;
  opacity: 1;
}
li a:hover {
  background-color: white;
}
.active {
  background-color: white;
}

li {
  border-right: 1px solid #bbb;
}

li:last-child {
  border-right: none;
}

img{
  float: left;
  width: 100px;
  background-color: lightblue;
}

#NavigationCenter {
  width: 1200px;
  margin: 0 auto;
  height: 70px;
}
`;

const pageSetup=css`
  position: relative;
  min-height: 100vh;
`;

const searchset=css`
  padding-top: 3.5rem;
  padding-bottom: 3.5rem;
  h1{
    text-align: center;
  }
`;


function MenuBar(){
  return(
  <>
  <div css={menuFunction}>
  <div id="NavigationCenter">
   <img class="logo" src="https://weatherextension.com/img/Weather%20Extension%20Logo.png" />
  <ul>
    <li><NavLink to="/">Home</NavLink></li>
    <li><NavLink to="/search">Search</NavLink></li>
  </ul>
  </div>
  </div>
</>
);
}


function MainPage(){
  return(
    <h1>Welcome to our weather App</h1>
  );
}

function App() {
  return (
    <div>
    <Global styles={globalFont} />
    <MenuBar />
    <div css={searchset}>
      <Switch>
        <Route path="/search">
          <Search query={useQueryString().q} />
        </Route>
        <Route exact path="/">
        <MainPage />
        </Route>
      </Switch>
      </div>
    </div>
  );
}
export default App;
