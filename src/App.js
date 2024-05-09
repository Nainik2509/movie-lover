
import { Routes, Route } from "react-router-dom";
import Home from './pages/home/Home';
import Detail from "./pages/detail/Detail";
import Explore from "./pages/explore/Explore";
import Page404 from "./pages/Page404/Page404";
import SearchResult from "./pages/searchResult/SearchResult";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { fetchDataFromApi } from "./utils/api";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getApiConfig, getGenres } from "./store/homeSlice";
import './App.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchApiConfig()
    fetchGenres()
  }, [])

  const fetchApiConfig = () => {
    fetchDataFromApi("/configuration").then((res) => {
      const image_url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      };

      dispatch(getApiConfig(image_url));
    }).catch((err) => {
      console.log(err)
    })
  };

  const fetchGenres = async () => {
    try {
      let promises = [];
      let endPoints = ["tv", "movie"];
      let allGenres = {};

      endPoints.forEach((url) => {
        promises.push(fetchDataFromApi(`/genre/${url}/list`));
      });

      const data = await Promise.all(promises);
      data.map(({ genres }) => {
        return genres.map((item) => (allGenres[item.id] = item));
      });

      dispatch(getGenres(allGenres));
    } catch (error) {
      console.log("Error fetching genres:", error);
    }
  };


  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Detail />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
