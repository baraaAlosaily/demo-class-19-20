import axios from "axios";

export const getAllRecipes=async()=>{
  return await axios.get(`${process.env.REACT_APP_BASE_URL}/recipes`)
    .then((res)=>{
      console.log(res);
      return res.data;
    }).catch((err)=>{
      console.log(err.message);
    })
  }