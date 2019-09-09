import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "../components/Image";
import loader from "../images/loading.svg";
import Notifications from "../components/Notifications";
import {productionServer} from '../utils/server';

const Home = props => {
  const [images, setImages] = useState([]);
  const [page, changePage] = useState(1);
  const [serverPhotoCount, changeServerCount] = useState(0);
  const [loadingDataError, changeLoadingDataError] = useState(false);
  const [secureStringText, changeSecureStringText] = useState("");
  const [deleteError, changeDeleteError] = useState(false);
  const [successOnDelete, changeSuccessOnDelete] = useState(false);

  useEffect(() => {
    axios
      .get(`${productionServer}/api/getimages/${page}`)
      .then(response => {
        setImages([...images, ...response.data.photos]);
        changeServerCount(response.data.photoCount);
        changeLoadingDataError(false);
      })
      .catch(error => {
        changeLoadingDataError(true);
      });
  }, [page]);

  const handleDeleteSubmit = e => {
    e.preventDefault();
    const config = {
      headers: {
        "content-type": "application/json"
      }
    };
    console.log(secureStringText);
    axios
      .post(`${productionServer}/api/single/delete`, { unique_string: secureStringText }, config)
      .then(response => {
        changeDeleteError(false);
        changeSuccessOnDelete(true);
      })
      .catch(error => {
        changeDeleteError(true);
        changeSuccessOnDelete(false);

      });
  };

  return (
    <>
      <div className="m-t-md">
        <p>
          This is a simple app to upload and analyse images and get that
          analysis translated to different languages. Click on an image to view
          full size with different languages for the description, choose what
          language you want to view the description in. If you want to analyse you
          own photos, click the <strong>Upload Photo</strong> link.
        </p>
      </div>

      <div className="columns is-multiline is-mobile m-t-xl">
        {images.length === 0 ? (
          <div
            className="column is-half"
            style={{ width: "200px", margin: "auto" }}
          >
            <p className="has-text-centered title">Wait for it...</p>
            <img className="has-text-centered" src={loader} alt="loading" />
          </div>
        ) : (
          images.map(image => {
            return (
              <div
                key={image._id}
                className="column is-one-quarter-desktop is-full-mobile"
              >
                <Image {...image} />
              </div>
            );
          })
        )}
      </div>

      {serverPhotoCount > images.length ? (
        <div className="columns is-mobile m-t-md m-b-xl">
          <div
            className="column is-half "
            style={{ width: "200px", margin: "auto" }}
          >
            <button
              onClick={() => changePage(page + 1)}
              className="button is-primary"
              style={{ marginBottom: "2rem" }}
            >
              Load More Photos
            </button>
          </div>
        </div>
      ) : null}

      {deleteError ? (
        <div className="m-t-md">
          <Notifications type="is-danger">
            <p>
              Oops, it appears the secure string you entered is not correct.
            </p>
          </Notifications>
        </div>
      ) : null}
      
      {successOnDelete ? (
        <div className="m-t-md">
          <Notifications type="is-primary">
            <p>
              Hooray, you have successfuly deleted the photo
            </p>
          </Notifications>
        </div>
      ) : null}
      <div className="m-t-md m-b-xl">
        <input
          className="input"
          type="text"
          placeholder="Enter secure string to delete"
          value={secureStringText}
          onChange={e => changeSecureStringText(e.target.value)}
          required
        ></input>
        <button
          onClick={handleDeleteSubmit}
          className="button is-danger m-t-md"
        >
          Delete
        </button>
      </div>
    </>
  );
};

export default Home;
