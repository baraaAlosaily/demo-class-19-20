import axios from "axios";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import "./searchbox.css"

const SearchBox = ({setData}) => {

  const[search,setSearch]=useState("");

  const handleFilter=async(e)=>{
      e.preventDefault();
      try {
        const res=await axios.get(`https://me-recipe.herokuapp.com/searchRecipes?search=${search}`);
        setData(res.data);
      } catch (error) {
          console.log(error);
      }
  }

  return (
    <div>
      <Form className="form" onSubmit={handleFilter}>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control value={search} type="text" placeholder="Search" onChange={(e)=>setSearch(e.target.value)}  />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default SearchBox;
