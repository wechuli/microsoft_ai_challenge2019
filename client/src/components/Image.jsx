import React, { useState } from "react";
import Description from "./Description";


const languages= {
    "en":"English",
    "ar":"Arabic",
    "de":"German",
    "it":"Italian",
    "sw":"Swahili",
    "ko":"Korean",
    "fr":"French",
    "es":"Spanish",
    "zh-Hans":"Chinese"
}
const Image = props => {
  const [modalStatus, setStatus] = useState("");
  const [language, changeLanguage] = useState("en");

  const onLanguageChange = (e)=>{
    let lang = e.target.value;
    for(var key in languages){
        if(languages[key] === lang ){
            changeLanguage(key);
        }
    }
      
  }
  const openModal = () => {
    setStatus("is-active");
  };
  const { description, description_confidence, tags, url } = props;

  const closeModal = () => {
    setStatus("");
  };
  const tagColors = [
    "black",
    "success",
    "danger",
    "dark",
    "light",
    "primary",
    "link",
    "info",
    "white",
    "warning"
  ];
  return (
    <React.Fragment>
      <div style={{ minHeight: "400px" }} className="card cardpont">
        <div
          onClick={openModal}
          className="card-image"
          style={{ height: "200px" }}
        >
          <figure className="image is-square">
            <img
              style={{ height: "100%", width: "100%" }}
              src={url}
              alt={`${props.description[0].text} image`}
            />
          </figure>
        </div>
        <div className="card-content">
          <div className="media">
            <div className="media-content">
              <p className="title is-4">Name</p>
            </div>
          </div>

          <div className="content m-t-lg">
          <Description description={description} language={language}/>
          </div>
       
        </div>
      </div>

      {/* Modal */}
      <div className={`modal ${modalStatus}`}>
        <div onClick={closeModal} className="modal-background" />
        <div className="modal-content">
          <div
            style={{ padding: "10px" }}
            className="has-background-light content"
          >
            <img src={url} alt={props.description} />
            <h2 className="subtitle">Description</h2>

            <div className="select m-b-md">
              <select onChange={onLanguageChange}>
               
              {description.map((desc)=>{
                  return (
                      <option key={desc._id}>{languages[desc.language]}</option>
                  )
              })}
              </select>
            </div>
           
            <Description description={description} language={language}/>

            <h2 className="subtitle">Tags</h2>
            <div className="box">
              {tags ? (
                tagColors.map((color, index) => {
                  return (
                    <span
                      style={{ marginRight: "3px" }}
                      key={index}
                      className={`tag is-${color}`}
                    >
                      {tags[index] ? (
                        tags[index]
                      ) : (
                        <p>There are no tags for this image</p>
                      )}
                    </span>
                  );
                })
              ) : (
                <p>No tags available</p>
              )}
            </div>
            <h2 className="subtitle">Confidence Score</h2>
            <p className="box">
              {description_confidence ? (
                <progress
                  className="progress is-primary"
                  value={description_confidence}
                  max="1"
                />
              ) : (
                <p>Confidence Score Unaivalable</p>
              )}
            </p>
          </div>
        </div>
        <button
          onClick={closeModal}
          className="modal-close is-large"
          aria-label="close"
        />
      </div>
    </React.Fragment>
  );
};

export default Image;
