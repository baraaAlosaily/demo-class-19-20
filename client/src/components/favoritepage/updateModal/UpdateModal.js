import React,{useRef, useState} from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import "./updateModale.css"
import axios from "axios";
const UpdateModale = ({show,handleClose,favInfo,getAllRecipes}) => {
  const [titleInput,setTitleInput]=useState(favInfo.title);
  const [imageInput,setImageInput]=useState(favInfo.image);
  const [commentInput,setCommentInput]=useState(favInfo.comment);

  const updateRecipesInfo=async(id)=>{
    let newTitle=titleInput;
    let newImage=imageInput;
    let newComment=commentInput;

    let updatedRecipeData=({
      title:newTitle, readyInMinutes:favInfo.readyInMinutes, summary:favInfo.summary, vegetarian:favInfo.vegetarian, instructions:favInfo.instructions, sourceUrl:favInfo.sourceurl, image:newImage, comment:newComment
    })
    console.log(updatedRecipeData);
    await axios.put(`https://me-recipe.herokuapp.com/updateFavRecipe/${id}`,updatedRecipeData)
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
           <input value={titleInput}  onChange={(e)=>setTitleInput(e.target.value)}/>
           <input value={imageInput}  onChange={(e)=>setImageInput(e.target.value)}/>
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