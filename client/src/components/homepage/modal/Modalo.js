import React,{useRef} from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import "./modal.css"
import axios from "axios";
const Modalo = ({show,handleClose,cardInfo}) => {
  const commentInput=useRef();
  const addtoFavorite=async()=>{
    let comment= commentInput.current.value;
    let fav=({
      title:cardInfo.title, readyInMinutes:cardInfo.readyInMinutes, summary:cardInfo.summary, vegetarian:cardInfo.vegetarian, instructions:cardInfo.instructions, sourceUrl:cardInfo.sourceUrl, image:cardInfo.image, comment
    })
    await axios.post(`${process.env.REACT_APP_BASE_URL}/addFavRecipe`,fav)
    .then(()=>{
      console.log("posted");
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
           <h3>{cardInfo.title}</h3>
           <img alt="" src={cardInfo.image}/>
           <div>
           <label htmlFor="op">Write Your Opinion</label>
           <input ref={commentInput} placeholder="Write Your Opinion" type="text" id="op"/>
           </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" 
          onClick={()=>{
            addtoFavorite();
            handleClose()
          }}>
            Add To Favorite
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Modalo;
