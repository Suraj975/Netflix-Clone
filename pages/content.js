import { DATA_ACCESS_POINTS, BASE_IMAGE_URL } from "../constant";
import { useEffect, useState } from "react";
import styles from "../styles/NetflixContent.module.css";
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer'

export default function NetflixContent({apiDatas, apiKeys}) {
  const [show, setShow] = useState(false);
  const [showSection, setSection] = useState("");
  const  [url,setUrl] = useState("");

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
    return () => window.removeEventListener("scroll", null);
  }, []);

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };

  const handleYoutubeContent = (title, data) => {
    if(url){
      setUrl("")
      setSection("")
    }
    movieTrailer(title || "").then(url => {
        const urlParams = new URLSearchParams(new URL(url).search);
        setUrl(urlParams.get('v'));
        setSection(data)
    }).catch((error) => console.log(error))
}

  const showBanner = bannerIndex => {
    let bannerData = apiDatas["NETFLIX_ORIGINALS"].results[bannerIndex];
    const bannerImage = (
      <div>
        <style jsx>{`
          height: 100%;
          background-size: cover;
          background-image: url(${BASE_IMAGE_URL}${bannerData && bannerData.backdrop_path});
          background-position: center center;
        `}</style>
      </div>
    );
    return (
      <div className={styles.bannerWrapper}>
        {bannerImage}
        <div className="bannerContent">
        <div className="textContent">
        <h1 className="title">{bannerData && bannerData.name}</h1>
          <div>
            <button className={styles.bannerButton}>Play</button>
            <button className={styles.bannerButton}>View</button>
          </div>
          <div className={styles.summaryText}>
            {bannerData && bannerData.overview}
          </div>
          </div>
          <div className="blurBox"></div>
      <style jsx>{`
        .bannerContent {
          position: absolute;
          width: 100%;
          height: 65vh;
          top: 0px;
          color: white;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .blurBox{
          width: 100%;
          position: absolute;
          bottom: 0;
          height: 7.4rem;
          background-image: linear-gradient(180deg,transparent,rgba(37,37,37,.61),#111);
      }
      .textContent{
        margin-left:20px;
      }

        @media only screen and (max-width: 650px) {
          .bannerContent {
          align-items:center;
          }
          .textContent{
            margin-left:0px;
          }
        }

      `}</style>
        </div>
      </div>
    );
  };
  return (
    <div className={styles.mainWrapper}>
      <div className={show ? styles.navScrollBar : styles.navNormalBar}>
        <div>
          <img src="/netflix.png" width="80px" />
        </div>
        <div>
          <img src="/user.png" width="30px" />
        </div>
      </div>
      <div>
        {apiDatas &&
          showBanner(
            Math.floor(
              Math.random() * apiDatas["NETFLIX_ORIGINALS"].results.length
            ) + 1
          )}
        {apiKeys &&
          apiKeys.map(data => {
            return (
              <div key={data}>
                <h2 id={data} className={styles.heading}>
                  {data && data.replace("_", " ")}
                </h2>
                <div className={styles.posters} style={{ display: "flex" }}>
                  {apiDatas[data] &&
                    apiDatas[data]["results"].map(lists => {
                      return (
                        <div key={lists.id} className={styles.posterWrapper} >
                          <div className={styles.imagePosters} >
                            <img
                              src={`${BASE_IMAGE_URL}${lists.poster_path}`}
                              className={styles.image}
                              id="img"
                              onClick={() => handleYoutubeContent(lists.title || lists.name, data)}
                            />
                          </div>
                        </div>
                      );
                    })}
                    {/* <div className={styles.youtube}>
                   </div> */}
                </div>
                {url && showSection === data && <YouTube videoId={url} opts={opts}/>}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  let apiKeys = Object.keys(DATA_ACCESS_POINTS);
  let count = 0;
  let apiDatas = {};
  while (count < apiKeys.length) {
    const res = await fetch(DATA_ACCESS_POINTS[apiKeys[count]]);
    apiDatas[apiKeys[count]] = await res.json();
    count++;
  }
  return {
    props: {
      apiDatas,
      apiKeys
    }
  };
}
