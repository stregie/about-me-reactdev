import React, { useState, useEffect } from 'react';
import placeholderImg from "./images/placeholder.jpg";

function GalleryListElement (props) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgDisplay, setImgDisplay] = useState({display: "none"});

  // Placeholder while images are loading
  useEffect(() => {
    setImgLoaded(false);
  }, [props.imgPath]);

  // Placeholder while images are loading
  useEffect(() => {
    imgLoaded ? setImgDisplay({display: "block"}) : setImgDisplay({display: "none"});
  }, [imgLoaded, ]);
  
  // Opens modal if an image is selected from the list
  function galleryPseudoButtonHandler() {
    props.states.setModalVisible(true);
    props.states.setModalImgIndex(props.fileInfo.fileindex);
  };
  
  return (
    <div className = "gallery-list-container">
      <div className = "gallery-list-thumbnail">          
        <button className = "gallery-pseudobutton" onClick = {() => galleryPseudoButtonHandler()}>
          {!imgLoaded && <img className = "img-fluid align-self-center" src = {placeholderImg} alt = {props.fileInfo.filename} />}
          <img className = "img-fluid align-self-center" src = {props.imgPath} alt = {props.fileInfo.filename} onLoad = {() => setImgLoaded(true)} style = {imgDisplay} />
        </button>
      </div>

      <div className = "gallery-list-description">
        <span>{props.fileInfo.filename}</span>
      </div>
    </div>
  );
};

export default GalleryListElement;
        // <span>Key: {props.fileInfo.fileindex}</span><br></br>