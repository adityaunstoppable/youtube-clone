import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Body = () => {
  let tiles = [
    "Kakashi",
    "Naruto",
    "Data Structures",
    "Javascript",
    "Bollywood Music",
    "Trending",
    "Jobs",
    "Comedy",
    "Sad Songs",
    "Akshay Saini",
    "Namastey JS",
    "Imitiaz Ali",
  ];

  let API_KEY_YOUTUBE = "AIzaSyCa1NroQ39Pz23u6aZXqSRzvOELFuZ_U8c";
  // https://www.googleapis.com/youtube/v3/search?key=${apiKey}&part=snippet&type=video&maxResults=${maxResults}&q=YOUR_QUERY

  const [searchQuery, setSearchQuery] = useState("Javascript and reactjs");
  const [videosData, setVideosData] = useState([]);
  const searchStringFromRedux = useSelector(state => state.search.searchResultFromThisString)
  console.log("ADITYA" , searchStringFromRedux)
  
  useEffect(() => {
    setSearchQuery("Lump sum");
    getRecommendedVideos();
  }, []);

  useEffect(() => {
    console.log("ADITYA2" , searchStringFromRedux)
    setSearchQuery(searchStringFromRedux)
    getRecommendedVideos();
  },[searchStringFromRedux])

  
  const getRecommendedVideos = async () => {
      let maxResults = 20;
      console.log("ADITYA3" , searchQuery)
      let data = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${API_KEY_YOUTUBE}&part=snippet&type=video&maxResults=${maxResults}&q=${searchStringFromRedux}`
    );
    let json = await data.json();
    if (json?.items) {
      setVideosData(json.items);
    }
  };

  return (
    <>
      {/* <div className="m-2 p-2  sticky top-16 bg-white">
                <ul className="flex flex-wrap" style={{position:"relative" , zIndex:"-1"}}>
                    {tiles.map(eachTile => (
                        <li className='rounded-lg bg-slate-200 px-2 py-1 m-1 border-none'>{eachTile}</li>
                    ))}
                </ul>
            </div> */}

      {/* main body with thumbnails */}
      <div
        className="flex flex-wrap"
        style={{ position: "relative", zIndex: "-10" }}
      >
        {/* card */}
        {videosData?.map((eachVideoData , i) => {
          let title = eachVideoData?.snippet?.title;
          title = title.length > 50 ? title.substring(0, 100) + "..." : title;
          return (
            <div key={i} style={{cursor:"pointer !important"}} className=" mt-4 ">
              <img
                src={eachVideoData?.snippet?.thumbnails?.medium?.url}
                className=" h-40  rounded-lg m-2"
              />
              <p className="ml-2  w-72 font-semibold text-sm">{title}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Body;
