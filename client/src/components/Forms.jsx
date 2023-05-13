import React, { useEffect, useState } from 'react';
import axios from 'axios';


const Forms = (props) => {
  const {product, setProduct} = props;
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

const [errors, setErrors] = useState({}); 

  const onSubmitHandler = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/products/', {
      title,
      price,
      description
    })
      .then (res => {
        console.log(res);
        console.log(res.data);
        setProduct ([...product, res.data]);

        setTitle("")
        setPrice("")
        setDescription("")
      }
      )
      .catch (err => {console.log(err)
      setErrors(err.response.data.errors
        )})
  }

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <h1>Product Manager</h1>
        { errors.title ?
        <p>{errors.title.message}</p>
        : ""
        }
                <p>
                  
                    <label className="mx-3"  >Title</label>
                    <input type="text" onChange = {(e) => setTitle(e.target.value)} value={title}/>
                </p>
        { errors.price ?
        <p>{errors.price.message}</p>
        : ""
        }
                <p>
                    <label className="mx-3">Price</label>
                    <input type="text" onChange = {(e) => setPrice(e.target.value)} value={price} />
                </p>

        { errors.description ?
        <p>{errors.description.message}</p>
        : ""
        }
                <p>
                    <label className="mx-3">Description</label>
                    <input type="text" onChange = {(e) => setDescription(e.target.value)} value={description}/>
                </p>
                <input type="submit" />
            </form>
        
    </div>
  )
}

export default Forms