import React, { useState, useEffect } from 'react';
import KeyboardEventHandler from 'react-keyboard-event-handler';

function GalleryModal(props) {
  const [caption, setCaption] = useState(props.states.modalFileName);
  
  // Blurs the background and blocks scrolling if modal is opened. Removes if closed.
  useEffect(() => {
    addHeaderFooterBlur();
    props.states.setGalleryMainStyle({filter: "blur(6px)"});
    document.body.style.setProperty("overflow-y", "hidden");
    // console.log("Modal mounted");
    return () => {
      removeHeaderFooterBlur();
      props.states.setGalleryMainStyle({filter: "none"});
      document.body.style.setProperty("overflow-y", "auto");
      // console.log("Modal unmounted");
    }
  }, []);


  
  // For blurring elements outside the React root / removing blur
  function addHeaderFooterBlur() {
    let header = document.getElementsByTagName("header")[0];
    if (header !== undefined) {
      header.style.setProperty("filter", "blur(6px)")
    } else {
      // console.log("No header found");
    }
    let footer = document.getElementsByTagName("footer")[0];
    if (footer !== undefined) {
      footer.style.setProperty("filter", "blur(6px)")
    } else {
      // console.log("No footer found");
    } 
  };

  function removeHeaderFooterBlur() {
    let header = document.getElementsByTagName("header")[0];
    if (header !== undefined) {
      header.style.setProperty("filter", "none")
    } else {
      // console.log("No header found");
    }
    let footer = document.getElementsByTagName("footer")[0];
    if (footer !== undefined) {
      footer.style.setProperty("filter", "none")
    } else {
      // console.log("No footer found");
    } 
  };
  
  // Steps to the previous or next image while modal is open
  function prevNextImg(n){
    props.states.setModalImgIndex(props.states.modalImgIndex + n);
    // console.log("props.states.modalImgIndex: ", props.states.modalImgIndex);
  };

  // Key handler for arrow keys. Invokes prevNextImg
  function navigationKeys(key, event) {
    switch (key){
      case 'left':
        event.preventDefault();
        // console.log("Left key pressed");
        prevNextImg(-1);
        break;
      case 'right':
        event.preventDefault();
        // console.log("Right key pressed");
        prevNextImg(1);
        break;
      default:
        console.log("Unexpected keyboard event");
    };
  };

  // Copies the relative URL so it can be used in the news editor site
  // Known bug: if the modal steps to another image, it will change the caption to the caption of the image where the clipboard was pressed.
  function copyToClipboard() {
    navigator.clipboard.writeText(props.states.modalImgPath);
    setCaption("Relative URL of the image copied to clipboard");
    setTimeout(() => {
      setCaption(props.states.modalFileName);
    }, 1500);
  };
  
  // Sets caption to the filename of the displayed image.
  useEffect(() => {
    setCaption(props.states.modalFileName);
  }, [props.states.modalFileName]);

  return (
  	<div id = "gallery-modal" className = "gallery-modal">
      <div className = "gallery-modal-content">
        <div>
          <a href = {props.states.modalImgPath} target = "_blank" rel = "noreferrer">
            <img id = "modal-img"src = {props.states.modalImgPath} alt = "Enlarged image" />
          </a>
        </div>

        <div title = {caption}>{caption}</div>

        <div>
          <KeyboardEventHandler handleKeys={['left', 'right']} onKeyEvent={(key, event) => navigationKeys(key, event)} handleFocusableElements = {true} />
          <button title = "Previous image" className = "modal-btn-bottom" onClick = {() => prevNextImg(-1)}><span className = "material-symbols-outlined">navigate_before</span></button>
          <button title = "Next image" className = "modal-btn-bottom" onClick = {() => prevNextImg(1)}><span className = "material-symbols-outlined">navigate_next</span></button>
          <button title = "Copy relative URL to Clipboard for News Editor" className = "modal-btn-bottom" onClick = {copyToClipboard}><span className = "material-symbols-outlined">content_paste</span></button>
          <button title = "Close" className = "modal-btn-bottom" onClick = {() => props.states.setModalVisible(false)}>&times;</button>
        </div>
      </div>

      <KeyboardEventHandler handleKeys={['esc']} onKeyEvent={(key, event) => props.states.setModalVisible(false)} handleFocusableElements = {true} />
    </div>
  )
};

export default GalleryModal;

          // <button id = "modal-navleft-side" className = "modal-navbtn-side" title = "Previous image" onClick = {() => prevNextImg(-1)}><span className = "material-symbols-outlined">navigate_before</span></button>
          // <button id = "modal-navright-side" className = "modal-navbtn-side" title = "Next image" onClick = {() => prevNextImg(1)}><span className = "material-symbols-outlined">navigate_next</span></button>