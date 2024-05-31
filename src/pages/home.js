import React ,{useState}from "react";
import SearchBar from "../components/searchbar/Searchbar";
import DashboardMap from "../components/DashboardMap";
import Predict from "./predictt";
import Range from "./range";
import Footer from "./footer";


export const Home = ({user, setUser, setLoader}) => {

  const [searchLocationCoordinates, setSearchLocationCoordinates] = useState({
    label: '',
    coordinates:null
  })
  console.log(searchLocationCoordinates)

  return (
    <>
      <SearchBar user={user} setUser={setUser} setLoader={setLoader} setSearchLocationCoordinates={setSearchLocationCoordinates}/>
      <DashboardMap searchLocationCoordinates={searchLocationCoordinates} />
      <Range />
      <Predict/>
      <Footer/>
    </>
  );
};
