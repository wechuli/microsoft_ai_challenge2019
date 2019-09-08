import React, { Component } from "react";
import axios from "axios";

class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      fileName: null,
      url: "",
      error: false,
      loading: false
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleUrlInputChange = this.handleUrlInputChange.bind(this);
    this.handleUrlSubmit = this.handleUrlSubmit.bind(this);
  }
  onFormSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("photo", this.state.file);
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    axios
      .post("/api/uploadfile", formData, config)
      .then(response => {
        alert("The file is successfully uploaded");
      })
      .catch(error => {});
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
    const config = {
      headers: {
        "content-type": "application/json"
      }
    };
    axios
      .post("/api/urlupload", { url: this.state.url }, config)
      .then(response => {
        console.log(response.data);
        alert("The file is successfully uploaded");
      })
      .catch(error => {});
  }

  render() {
    return (
      <>
        <p className="m-t-md">
          You can upload a photo from your computer or input a url with a photo,
          kindly ensure the upload is an image or the url points to an image
          (.jpeg,.jpg,.svg,.png). Once the image has successfully been uploaded,
          go back to the image to see the upload.
        </p>
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
                      Upload
                    </button>
                  ) : (
                    <button
                      className="button m-t-md is-primary is-outlined is-rounded"
                      type="submit"
                      disabled
                    >
                      Upload
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
