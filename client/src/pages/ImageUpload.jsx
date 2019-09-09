import React, { Component } from "react";
import axios from "axios";
import loader from "../images/loading.svg";
import Notifications from "../components/Notifications";
import {productionServer} from '../utils/server';

class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      fileName: null,
      url: "",
      error: false,
      loading: false,
      response: {}
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleUrlInputChange = this.handleUrlInputChange.bind(this);
    this.handleUrlSubmit = this.handleUrlSubmit.bind(this);
  }
  onFormSubmit(e) {
    e.preventDefault();
    this.setState({
      loading: true
    });
    const formData = new FormData();
    formData.append("photo", this.state.file);
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      },
      timeout: 60 * 7 * 1000
    };
    axios
      .post(`${productionServer}/api/uploadfile`, formData, config)
      .then(response => {
        this.setState({
          loading: false,
          response: response.data,
          error: false
        });
      })
      .catch(error => {
        this.setState({
          error: true,
          loading: false
        });
      });
  }
  onChange(e) {
    this.setState({
      file: e.target.files[0],
      fileName: e.target.files[0].name
    });
  }
  handleUrlInputChange(e) {
    this.setState({
      url: e.target.value
    });
  }
  handleUrlSubmit(e) {
    this.setState({
      loading: true
    });
    const config = {
      headers: {
        "content-type": "application/json"
      }
    };
    axios
      .post(`${productionServer}/api/urlupload`, { url: this.state.url }, config)
      .then(response => {
        console.log(response.data);
        this.setState({
          loading: false,
          response: response.data,
          error: false
        });
      })
      .catch(error => {
        this.setState({
          error: true,
          loading: false
        });
      });
  }

  render() {
    let successNotif = null;
    let errorNotif = null;
    if (this.state.response.newImage && !this.state.error) {
      successNotif = (
        <Notifications type="is-primary">
          <p>
            Success. Your image has been analysed and is ready. Got to the home
            page to view it. Please copy the unique string:
            <strong>{this.state.response.newImage.unique_string}</strong> incase
            you would want to delete it. This is your only chance.
          </p>
        </Notifications>
      );
    }
    if (this.state.error) {
      errorNotif = (
        <Notifications type="is-danger">
          <p>
            Oops, something went wrong, make sure you are uploading an image or
            pointing to an actual image url. Max file size -5MB
          </p>
        </Notifications>
      );
    }
    return (
      <>
        <p className="m-t-md">
          You can upload a photo from your computer or input an image url,
          kindly ensure the upload is an image or the url points to an image
          (.jpeg,.jpg,.svg,.png). Don't upload files larger than{" "}
          <strong>3MB</strong>. Once the image has successfully been uploaded,
          go back to the home page to see the upload. You my need to load more
          photos to see it.
        </p>
        {successNotif}
        {errorNotif}

        {this.state.loading ? (
          <div
            className="column is-half"
            style={{ width: "200px", margin: "auto" }}
          >
            <p className="has-text-centered ">
              Crunching the Image analysis and translation for you, hang
              tight...
            </p>
            <img className="has-text-centered" src={loader} alt="loading" />
          </div>
        ) : null}
        <div className="columns is-centered m-t-xl">
          <div className="column is-half">
            <h2 className="title">Use Photo Url</h2>
            <div className="field">
              <div className="control">
                <input
                  className="input is-primary"
                  type="text"
                  placeholder="Image URL"
                  required
                  name="url"
                  onChange={this.handleUrlInputChange}
                  value={this.state.url}
                />
              </div>
            </div>
            <button
              onClick={this.handleUrlSubmit}
              className="is-primary is-outlined button"
            >
              Analyse Image
            </button>
          </div>
          <div
            style={{ borderLeft: "1px solid black" }}
            className="column  is-half"
          >
            <h2 className="title">Upload Raw</h2>
            <div className="file has-name is-boxed is-centered">
              <form style={{ width: "300px" }} onSubmit={this.onFormSubmit}>
                <label className="file-label">
                  <input
                    className="file-input"
                    type="file"
                    name="photo"
                    onChange={this.onChange}
                  />

                  <span className="file-cta">
                    <span className="file-icon">
                      <i className="fas fa-upload" />
                    </span>
                    <span className="file-label">Choose an Image</span>
                  </span>
                  <span className="file-name has-text-centered">
                    {this.state.fileName ? (
                      <span className="has-text-primary">
                        {this.state.fileName}
                      </span>
                    ) : (
                      <span className="has-text-danger">No File Selected</span>
                    )}
                  </span>
                  {this.state.fileName ? (
                    <button
                      className="button m-t-md is-primary is-outlined is-rounded"
                      type="submit"
                    >
                      Upload and Analyse
                    </button>
                  ) : (
                    <button
                      className="button m-t-md is-primary is-outlined is-rounded"
                      type="submit"
                      disabled
                    >
                      Upload and Analyse
                    </button>
                  )}
                </label>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ImageUpload;
