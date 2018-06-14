import React, {Component} from 'react';
import SingleImageView from './utils/SingleImageView';

import './image-editor.css';

/**
 * component to select images from local disk
 */
export default class ImageEditor extends Component {
  /**
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      files: [...props.initImages],
      idsToDelete: [],
    };
    this.removeFile = this.removeFile.bind(this);
    this.handleFilesUpload = this.handleFilesUpload.bind(this);
    this.notifyChangeToParent = this.notifyChangeToParent.bind(this);
    this.appendFiles = this.appendFiles.bind(this);
  }

  /**
   * determines if the component should update after the
   * props have changed
   *
   * @param {*} prevProps
   * @param {*} prevState
   */
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.initImages !== this.props.initImages) {
      this.appendFiles(this.props.initImages);
    }
    /*
    if (!this.compareArrays(prevProps.initImages, this.props.initImages)) {
      this.appendFiles(this.props.urls);
    }
    */
  }

  /**
   * @param {array} arr1
   * @param {array} arr2
   * @return {boolean}
   */
  compareArrays = (arr1, arr2) => {
    if (arr1.length !== arr2.length) {
      return false;
    }
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }
    return true;
  }


  /**
   * load the images urls passed from the parent
   * in the images view
   * @param {array} files
   */
  async appendFiles(files) {
    this.setState((prevState) => ({
      files: [...prevState.files, ...files],
    }));
  }

  /**
   * remove the selected file
   * @param {File} fileToRemove
   */
  removeFile(fileToRemove) {
    // add the file id to idsToDelete if the selected file
    // was passed through props
    let idsToDelete = this.state.idsToDelete;

    if (fileToRemove.constructor !== File) {
      const idToDelete =
        this.state.files
          .filter((file) => {
            return fileToRemove === file.url;
          })
          .map((file) => {
            return file.id;
          });
      idsToDelete = [...idsToDelete, ...idToDelete];
    }

    // remove the file and save the remainig files
    // in a new array
    const newFiles = this.state.files.filter((file) => {
      if (file.constructor === File) {
        return file !== fileToRemove;
      } else {
        return file.url !== fileToRemove;
      }
    });

    this.setState((prevState) => ({
      files: newFiles,
      idsToDelete: idsToDelete,
    }), this.notifyChangeToParent);
  }

  /**
   * notify to the parent the changes in the selected images
   */
  notifyChangeToParent() {
    // filter the new images from the original images
    // passed from the parent component
    const newFiles = this.state.files.filter((file) => {
      return file.constructor === File;
    });
    this.props.onImagesLoaded(newFiles, this.state.idsToDelete);
  }

  /**
   * this event is triggered once the user has selected
   * the images
   */
  handleFilesUpload() {
    // concatenate the current files with the files from the input.
    this.setState((prevState) => ({
      files: [...prevState.files, ...this.$files.files],
    }), this.notifyChangeToParent);
  }

  /**
   *  @return {ReactNode}
   */
  render() {
    // jsx
    const images = this.state.files.map((file, index) => {
      const image = file.constructor === File ? file : file.url;
      return (
        // Card to show each image
        <div className="column is-2" key={index}>
          <SingleImageView
            file={image}
            onImageRemoved={this.removeFile}>
          </SingleImageView>
        </div>
      );
    });

    return (
      <div className="image-picker">

        {/* Input element that is hidden for styles purposes */}
        <div className="file">
          <label className="file-label">
            <input
              className="file-input"
              type="file"
              name="resume"
              ref={(input) => {
                this.$files = input;
              }}
              accept="image/*"
              multiple onChange={this.handleFilesUpload}
            />
            <span className="file-cta">
              <span className="file-icon">
                <i className="fa fa-upload"></i>
              </span>
              <span className="file-label">
                Choose a file…
              </span>
            </span>
          </label>
        </div>

        {/* Preview the images loaded */}
        <div className="columns is-multiline image-cards">
          {images}
        </div>

      </div>
    );
  }
}
