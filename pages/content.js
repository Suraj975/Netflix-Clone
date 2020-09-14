import { DATA_ACCESS_POINTS, BASE_IMAGE_URL } from "../constant";
import { useEffect, useState } from "react";
import styles from "../styles/NetflixContent.module.css";

export default function NetflixContent({ apiDatas, apiKeys }) {
  const [show, setShow] = useState(false);
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
        <h1 className="title">{bannerData && bannerData.name}</h1>
          <div>
            <button className={styles.bannerButton}>Play</button>
            <button className={styles.bannerButton}>View</button>
          </div>
          <div className={styles.summaryText}>
            {bannerData && bannerData.overview}
          </div>
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
          margin-left:30px;
        }
        @media only screen and (max-width: 650px) {
          .bannerContent {
          align-items:center;
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
                        <div key={lists.id} className={styles.posterWrapper}>
                          <div className={styles.imagePosters}>
                            <img
                              src={`${BASE_IMAGE_URL}${lists.poster_path}`}
                              className={styles.image}
                            />
                          </div>
                        </div>
                      );
                    })}
                </div>
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
