import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "../components/Image";
import loader from "../images/loading.svg";

const Home = props => {
  const [images, setImages] = useState([]);
  const [page,changePage] = useState(1);

  useEffect(() => {
    axios
      .get(`/api/getimages/${1}`)
      .then(response => {
        console.log(response.data);
        setImages(response.data.photos);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <>
      <div className="columns is-multiline is-mobile m-t-xl">
        {images.length === 0 ? (
          <div className="column is-half" style={{width:"200px",margin:"auto"}}>
            <p className="has-text-centered title">Wait for it...</p>
            <img className="has-text-centered" src={loader} alt="loading" />
          </div>
        ) : (
          images.map(image => {
            return (
              <div key={image._id} className="column is-one-quarter-desktop is-full-mobile">
                <Image {...image} />
             
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default Home;
