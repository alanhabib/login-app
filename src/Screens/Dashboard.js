import axios from "axios";
import React, { useState } from "react";
import StoreList from "../Components/StoreList";
import { cacheQuery, getCachedQuery, removeUserSession } from "../Utils/Common";
import styled from "styled-components";

const ACCESS_TOKEN =
  "861f32547c29ed10b652bc5268373f33dba2032375a435c600a40b1d1353d7ccccee58917fe04041";

function Dashboard({ history }) {
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [hits, setHits] = useState([]);

  const handleSearch = (event) => {
    setQuery(event.target.value);
  };

  const onSearchStoreList = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (query === "") {
      return;
    }
    const cachedHits = getCachedQuery(query);

    if (cachedHits) {
      setHits(JSON.parse(cachedHits));
    } else {
      axios
        .get(`https://www.refunder.se/app/search/stores?query=${query}`, {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        })
        .then((response) => {
          onSearchResult(response.data.data.stores, query);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log("ERROR: ", error);
          setIsLoading(false);
          setError("Something went wrong. Please try again later.");
        });
    }
  };

  const onSearchResult = (res, key) => {
    cacheQuery(key, JSON.stringify(res));
    setHits(res);
  };

  const handleLogout = () => {
    removeUserSession();
    history.push("/login");
  };

  return (
    <div>
      {isloading ? (
        <div>Loading...</div>
      ) : (
        <>
          {error && <div>{error}</div>}
          <h1>Search Refunder Stores</h1>
          <p>Welcome User!</p>
          <form onSubmit={onSearchStoreList}>
            <input type="text" onChange={handleSearch} />
            <button type="submit">Search</button>
          </form>
          <input type="button" onClick={handleLogout} value="Logout" />
          <CardWrapper>
            {Array.isArray(hits) && hits.length ? (
              hits?.map((store) => (
                <StoreList
                  key={store.id}
                  text={store.short_description}
                  name={store.name}
                  cashback={store.cashback}
                  logo={store.logo}
                />
              ))
            ) : (
              <div>There are no stores...</div>
            )}
          </CardWrapper>
        </>
      )}
    </div>
  );
}

export default Dashboard;

const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`;
