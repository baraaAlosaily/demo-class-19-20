import React, { useEffect,useState } from 'react';
import {Card,Button,Container,Row,Col} from "react-bootstrap";
import "./home.css";
import Modalo from './modal/Modalo';
import SearchBox from './searchbox/SearchBox';
import { getAllRecipes } from '../../service';


const Home = () => {
  const[data,setData]=useState([]);
  const [cardInfo, setCardInfo] = useState({});
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  

  useEffect(() => {  
    void(async()=>{
      let data=await getAllRecipes();
      setData(data);
    })()
  },[]);


  return(<div>
  <div className='title'>
  <h1>Home Page</h1>
  </div>
  <SearchBox setData={setData}/>
  <div className='div'>
    <Container className='div-container'>
      <Row md={3}>
      {
       data.length &&data.map((ele)=>(
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
    { 
        !data.length && <div className='errorMessage'><h1>No Such Results Match Please Try Again</h1></div>
    }
  </div>);
};

export default Home;
