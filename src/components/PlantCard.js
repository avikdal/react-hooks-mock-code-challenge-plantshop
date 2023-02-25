import React, { useState } from "react";

function PlantCard({ plantInfo, onDelete }) {
  const { name, image, price, id } = plantInfo
  const [stocked, setStocked] = useState(true)

  function handleDelete(){
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "DELETE",
    });

    onDelete(id)
  }

  return (
    <li className="card">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>Price: {price}</p>
      {stocked ? (
        <button onClick={() => setStocked(false)} className="primary">In Stock</button>
      ) : (
        <button onClick={() => setStocked(true)} >Out of Stock</button>
      )}
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
}

export default PlantCard;
