import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

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
  
  useEffect(() => {
    setSearchQuery("Lump sum");
    getRecommendedVideos();
  }, []);

  useEffect(() => {
    setSearchQuery(searchStringFromRedux)
    getRecommendedVideos();
  },[searchStringFromRedux])

  
  
  const getRecommendedVideos = async () => {
      let maxResults = 20;
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
      <div className="mt-1  sticky top-0 bg-white" style={{zIndex:"5"}}>
                <ul className="flex flex-wrap" >
                    {tiles.map(eachTile => (
                        <li className='rounded-lg bg-slate-200 px-2 py-1 m-1 border-none'>{eachTile}</li>
                    ))}
                </ul>
            </div>

      {/* main body with thumbnails */}
      <div
        className="flex flex-wrap"
        style={{ position: "relative", zIndex: "1" }}
      >
        {/* card */}
        {videosData?.map((eachVideoData , i) => {
          let title = eachVideoData?.snippet?.title;
          title = title.length > 50 ? title.substring(0, 100) + "..." : title;
          return (
            <div key={i} className=" mt-4 ">
              <Link to={`/videopage/${eachVideoData?.id?.videoId}`}>
              <img
                src={eachVideoData?.snippet?.thumbnails?.medium?.url}
                className=" h-40 cursor-pointer rounded-lg m-2"
              />
              </Link>
              <p className="ml-2  w-72 font-semibold text-sm">{title}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Body;
