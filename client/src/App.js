import "./App.scss";
import { useState } from "react";
import citylinkLogoPath from './citylink.svg'

function App() {
  const [search, setSearch] = useState("lenovo tab m7");
  const [products, setProducts] = useState({});

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleClick = () => {
    searchProducts(search);
  };

  const searchProducts = (query) => {
    fetch("http://localhost:3001/products", {
      method: "POST",
      body: JSON.stringify({ query }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      response.json().then((data) => {
        setProducts(data);
      });
    });
  };
  // lenovo tab m8
  return (
    <div className="App">
      <div className="search-wrapper">
        <input
          className="search"
          placeholder="Название товара"
          value={search}
          onChange={handleSearch}
        />
        <button className="btn-search" onClick={handleClick}>
          Найти
        </button>
      </div>
      <div className="cards">
        <Card {...products.citylink} logo={citylinkLogo}></Card>
        <Card {...products.onlinetrade} logo={onlineLogo}></Card>
        <Card {...products.ozon} logo={ozonLogo}></Card>
      </div>
    </div>
  );
}

function Card({ name, link, price, logo }) {
  if (name) {
    return (
      <div className="card">
        <h3>
          <a target="_blank" rel="noreferrer" href={link}>
            {name}
          </a>
        </h3>
        <div className="logo">
          {logo}
        </div>
        <div className="price">
          <a className="toMagaz" target="_blank" rel="noreferrer" href={link}>
            В магазин
          </a>
          <span>{price} ₽</span>
        </div>
        
      </div>
    );
  }
  return null;
}

const onlineLogo = <img src="https://www.onlinetrade.ru/templates/images/logo_vector.svg?001" width="186" alt="ОнлайнТрейд" title="ОНЛАЙН ТРЕЙД.РУ — интернет-магазин бытовой техники и электроники"></img>

const citylinkLogo = <img src={citylinkLogoPath} alt="city Logo" />

const ozonLogo = <img src="https://cdn1.ozone.ru/s3/cms/7f/t44/wc200/doodle_1.png" srcset="https://cdn1.ozone.ru/s3/cms/7f/t44/wc400/doodle_1.png 2x" alt="Ozon"></img>

export default App;
