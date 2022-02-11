import React, { useEffect, useState } from 'react';
import axios from "axios";
import {Card,Button,Container,Row,Col} from "react-bootstrap";
import "./favorite.css";
import UpdateModale from "./updateModal/UpdateModal";


const Favoritepage = () => {

  const[favInfo,setFavInfo]=useState({})
  const[data,setData]=useState([]);

  const [show, setShow] = useState(false);

  const [titleInput,setTitleInput]=useState("");
  const [imageInput,setImageInput]=useState("");
  const [commentInput,setCommentInput]=useState("");
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const getAllRecipes=async()=>{
    await axios.get(`${process.env.REACT_APP_BASE_URL}/favRecipes`)
    .then((res)=>{
      console.log(res);
      setData(res.data);
    }).catch((err)=>{
      console.log(err.message);
    })
  }
  
  const deleteFromFavorite=async(id)=>{
    await axios.delete(`${process.env.REACT_APP_BASE_URL}/deleteFavRecipe/${id}`)
    .then(()=>{
      getAllRecipes();
      console.log("recipe deleted");
    })
    .catch((err)=>{
      console.log(err.message);
    })
  }
  
 
  useEffect(() => {   
     getAllRecipes();
    },[]);

  return(<div>
  <div className='title'>
  <h1>Favorite Recipes</h1>
  </div>
  <div className='div'>
    <Container className='div-container'>
      <Row md={3}>
      {
       data && data.map((ele)=>(
        <Col key={ele.id}  md={4}>
        <Card className='div-card'>
        <Card.Img className='div-card-img' variant="top" src={ele.image}/>
        <Card.Body>
          <Card.Title className='div-card-title'>{ele.title}</Card.Title>
         <Card.Link className='div-card-link'>
            {ele.sourceurl}
          </Card.Link>
          <Card.Title style={{"padding":"10px 0px"}} className='div-card-title'>{ele.comment}</Card.Title>
          <div className='buttons'>
          <Button className='div-card-button'  variant="primary"
          onClick={()=>{
            handleShow();
            setFavInfo(ele);
            setTitleInput(ele.title);
            setImageInput(ele.image);
            setCommentInput(ele.comment);
          }
        }
          >Update</Button>
          <Button className='div-card-button'  variant="danger"
          onClick={
            ()=>{
              deleteFromFavorite(ele.id);
            }
          }
          >Delete</Button>
          </div>
        </Card.Body>
      </Card>
        </Col>
       ))
      }
      </Row>
      </Container>
      {
        <UpdateModale  
        getAllRecipes={getAllRecipes} 
        favInfo={favInfo}
         show={show} 
         handleClose={handleClose} 
         handleShow={handleShow}
         titleInput={titleInput}
         setTitleInput={setTitleInput}
         imageInput={imageInput}
         setImageInput={setImageInput}
         commentInput={commentInput}
         setCommentInput={setCommentInput}
         />
      }
  </div>
  </div>);
};

export default Favoritepage;

