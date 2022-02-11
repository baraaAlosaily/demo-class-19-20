import React,{useRef, useState} from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import "./updateModale.css"
import axios from "axios";
const UpdateModale = ({show,handleClose,favInfo,getAllRecipes,
titleInput,
setTitleInput,
imageInput,
setImageInput,
commentInput,
setCommentInput}) => {

  const updateRecipesInfo=async(id)=>{
    let newTitle=titleInput;
    let newImage=imageInput;
    let newComment=commentInput;

    let updatedRecipeData=({
      title:newTitle, readyInMinutes:favInfo.readyInMinutes, summary:favInfo.summary, vegetarian:favInfo.vegetarian, instructions:favInfo.instructions, sourceUrl:favInfo.sourceurl, image:newImage, comment:newComment
    })
    console.log(updatedRecipeData);
    await axios.put(`${process.env.REACT_APP_BASE_URL}/updateFavRecipe/${id}`,updatedRecipeData)
    .then(()=>{
      getAllRecipes();
      console.log("updated");
    })
    .catch((err)=>{
      console.log(err.message);
    })
  }
  return (
    <>
        <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add It To Favorite</Modal.Title>
        </Modal.Header>
        <Modal.Body className="body">
          <div>
           <p>Edite Title</p>
           <input value={titleInput}  onChange={(e)=>setTitleInput(e.target.value)}/>
           <p style={{"marginTop":"10px"}}>Edit Image</p>
           <textarea value={imageInput}  onChange={(e)=>setImageInput(e.target.value)}/>
           </div>
           <div>
           <label htmlFor="op">Write Your Opinion</label>
           <textarea value={commentInput}  onChange={(e)=>setCommentInput(e.target.value)}  placeholder="Write Your Opinion" type="text" id="op"/>
           </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" 
          onClick={()=>{
            handleClose()
            updateRecipesInfo(favInfo.id);
          }}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdateModale;