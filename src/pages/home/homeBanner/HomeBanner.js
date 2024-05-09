import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import './style.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from '../../../hooks/useFetch';
import { useSelector } from "react-redux";
import LoadImg from '../../../components/lazyLoadImage/LoadImg';

export default function HomeBanner() {
  const [searchText, setSearchText] = useState("")
  const [backgroundImg, setBackgroundImg] = useState("")
  const navigate = useNavigate()
  const { image_url } = useSelector((state) => state.home)
  const { data, loading, error } = useFetch("/movie/upcoming")

  useEffect(() => {
    if (error === null && !loading) {
      const randomNum = Math.floor(Math.random() * 20)
      const backdropImg = data?.results[randomNum]?.backdrop_path
      const background = image_url.backdrop + backdropImg
      setBackgroundImg(background)
    }
  }, [data])

  function searchQueryHandler(event) {
    if (event.key === 'Enter') {
      searchHandler()
    }
  }
  function searchHandler() {
    if (searchText.trim() !== "") {
      navigate(`/search/${searchText.trim()}`)
    }
  }

  return (
    <>
      <div className='home-banner'>
        {backgroundImg !== "" && (
          <LoadImg src={backgroundImg} className="background-image" />
        )}
        <div
          className="custom-container">
          <Typography variant="h2" gutterBottom>
            Welcome
          </Typography>
          <Typography variant="h5" gutterBottom>
            Millions of movies, TV shows, and people to discover. Explore now.
          </Typography>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search movies, TV shows, people..."
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
              onKeyUp={(e) => searchQueryHandler(e)}
              className='searchbar'
              onFocus={(e) => e.target.classList.add('noBorder')}  // Add class when input is focused
              onBlur={(e) => e.target.classList.remove('noBorder')}
            />

            <Button
              variant="contained"
              onClick={searchHandler}
            >
              Search
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
