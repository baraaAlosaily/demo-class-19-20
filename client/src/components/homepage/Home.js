import React, { useEffect, useRef, useState } from 'react';
import axios from "axios";
import {Card,Button,Container,Row,Col} from "react-bootstrap";
import "./home.css";
import Modalo from './modal/Modalo';


const Home = () => {
  const[data,setData]=useState([]);
  const [cardInfo, setCardInfo] = useState({});
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {   
     const getAllRecipes=async()=>{
       await axios.get(`https://me-recipe.herokuapp.com/recipes`)
       .then((res)=>{
         console.log(res);
         setData(res.data);
       }).catch((err)=>{
         console.log(err.message);
       })
     }
     getAllRecipes();
    },[]);

  return(<div>
  <div className='title'>
  <h1>Home Page</h1>
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
            {ele.sourceUrl}
          </Card.Link>
          <div>
          <Button className='div-card-button'  variant="primary"
          onClick={()=>{
            handleShow();
            setCardInfo(ele)
          }
          }
          >Add To Favorite</Button>
          </div>
        </Card.Body>
      </Card>
        </Col>
       ))
      }
      </Row>
      </Container>
      {
        <Modalo cardInfo={cardInfo} show={show} handleClose={handleClose} handleShow={handleShow} />
      }
  </div>
  </div>);
};

export default Home;
