import React, { useEffect, useState } from "react";
import { hamIcon, notificationBell, searchIcon } from "../utils/icons";
import { useDispatch, useSelector } from "react-redux";
import { setSearchStringAction, setString } from "../utils/searchSlice";
import { toggleSideBar } from "../utils/sideBarToggleSlice";
import { Link, useNavigate } from "react-router-dom";
import { searchCache } from "../utils/suggestionCache";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const searchCacheFromRedux = useSelector(state => state.suggestionCache)
  const [searchString, setSearchString] = useState("");
  const [shouldShowSearchResults, setShouldShowSearchResult] = useState(false);
  const [suggetions , setSuggestions] = useState([])


  useEffect(() => {
    //debouncing to have effective search , time interval is 300ms
    let timer;
    if(searchCacheFromRedux[searchString] && searchCacheFromRedux[searchString] != ""){
      setSuggestions(searchCacheFromRedux[searchString])
    }else{

       timer = setTimeout(() => {
        getSuggestions();
    },300)

    }
    
    return () => {
        clearTimeout(timer)
    }
  },[searchString]);


  const getSuggestions = async () => {
    try {
        const response = await fetch(`https://projects-proxy.onrender.com/api/search?searchString=${searchString}`);
        const json = await response.json();
        setSuggestions(json[1]); // Assuming json[1] is the correct data you need

        dispatch(searchCache({ [searchString]: json[1] }));
    } catch (error) {
        console.error('Error fetching suggestions:', error);
    }
};

  const searchStringFn = (value) => {
    dispatch(setString(value));
    setShouldShowSearchResult(true);
    setSearchString(value)
  };

 

  const setSuggestionString = (value) => {
    navigate("/")
    setShouldShowSearchResult(false)  
    setSearchString(value)
    dispatch(setSearchStringAction(value))
  }

  return (
    <>
      <div className="bg-white flex shadow-lg items-center justify-between sticky top-0 z-50">
        {/* ham bar and logo */}
        <div className="flex items-center relative">
          <div onClick={() => dispatch(toggleSideBar())} className="p-2 m-2 cursor-pointer hover:bg-slate-100 hover:rounded-full">{hamIcon}</div>
          <Link to="/">
          <img
            src={
              "https://img.freepik.com/premium-vector/youtube-logotype-youtube-is-videosharing-website_686498-399.jpg"
            }
            className="h-11 cursor-pointer"
          />
          </Link>
        </div>

        {/* Search bar */}
        <div className="flex items-center m-2 relative z-50">
          <div className="flex flex-col">
            <input
            //   onBlur={() => setShouldShowSearchResult(false)}
              value={searchString}
              onChange={(e) => searchStringFn(e.target.value)}
              className="rounded-l-3xl w-96 bg-slate-50 border border-slate-300 p-2 focus:outline-none"
            />
            {shouldShowSearchResults && (
              <div className="z-50 w-96 top-[45px] absolute bg-slate-50 rounded-lg p-2 shadow-lg">
                <ul>
                  {suggetions?.map((each) => (
                    <li onClick={() => setSuggestionString(each)} className="cursor-pointer hover:bg-slate-100 mt-1 p-2 flex items-center justify-between">
                      {each} {searchIcon}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <button onClick={() => setSuggestionString(searchString)} className="p-3 rounded-r-3xl bg-slate-100 border border-slate-300">
            {searchIcon}
          </button>
        </div>

        <div className="flex items-center">
          <button className="m-1 p-1">{notificationBell}</button>
          <img
            src={require("../utils/img/adboi.png")}
            className="h-8 m-2 mr-4 rounded-full"
          />
        </div>
      </div>
    </>
  );
};

export default Header;
