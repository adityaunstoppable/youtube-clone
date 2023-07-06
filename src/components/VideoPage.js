import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { quotes } from "../utils/Constants";
import { likeIcon, unlikeIcon } from "../utils/icons";

const VideoPage = () => {
  const { id } = useParams();

  const [liveChatData, setLiveChatData] = useState([]);
  const [customQuote, setCustomQuote] = useState("");

  useEffect(() => {
    const quotesData = quotes;
    let timer;
    for (let i = 0; i < quotesData.length; i++) {
      timer = setTimeout(() => {
        setLiveChatData((prevState) => [...prevState, quotesData[i]]);
      }, i * 1000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleSend = () => {
    if (customQuote != "") {
      setLiveChatData((prevState) => [
        ...prevState,
        { author: "You", quote: customQuote },
      ]);
      setCustomQuote("");
    }
  };

  const handleCustomQuote = (value) => {
    setCustomQuote(value);
  };


  return (
    <div>

        {/* Video  */}
      <div className="m-2 mt-5 p-2 flex">
        <div className=" flex-[0.6]">
          <iframe
            width="95%"
            className=" rounded-xl"
            height="515"
            src={`https://www.youtube.com/embed/${id}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />

          {/* like and subscribe */}
          <div className="m-2 p-2 flex justify-between w-[90%]">
            <div>
                <button className="p-2 px-5 rounded-l-3xl bg-slate-100 border border-slate-300">{likeIcon}</button>
                <button className="p-2 px-5 rounded-r-3xl bg-slate-100 border border-slate-300">{unlikeIcon}</button>

            </div>

            <div>
                <button className="rounded-full text-xs text-white bg-slate-950 w-24 font-normal p-3">Subscribe</button>
            </div>
          </div>
        </div>


        {/*  live chat */}
        <div className="flex-[0.4]">
          <div className=" h-[550px] bg-slate-100 rounded-lg border border-slate-300">
            <p className=" text-lg m-2 p-2 text-orange-950 text-center">
              Live Chat !
            </p>
            {/* showing live chat  */}
            <div className=" m-2 p-2 h-[400px] w-90 overflow-auto scroll-smooth">
              <ul className="flex flex-col-reverse">
                {liveChatData?.map((eachQuote) => {
                  let quote = eachQuote.quote;
                  let author = eachQuote.author;

                  return (
                    <li>
                      <div
                        className={
                          `m-1 p-1 flex` +
                          `${author == "You" ? " bg-green-200 rounded-lg" : ""}`
                        }
                      >
                        <p className="p-1 text-xs  text-left font-semibold">
                          {author}
                        </p>
                        <p className="p-1 text-left text-xs">{quote}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="flex justify-between items-center">
              <input
                value={customQuote}
                onChange={(e) => handleCustomQuote(e.target.value)}
                style={{ width: "95%" }}
                className=" m-5 p-2 rounded-lg bg-slate-100 border-[2px] border-slate-500"
                placeholder="Write your own Quote !"
              />
              <button
                onClick={handleSend}
                className="p-2 m-1 mr-2 border-[2px] border-slate-500 bg-green-200 rounded-lg h-11"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>

    
    </div>
  );
};

export default VideoPage;
