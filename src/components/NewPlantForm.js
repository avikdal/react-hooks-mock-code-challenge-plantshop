import React, { useState } from "react";

function NewPlantForm({ AddNewPlant }) {
  const [newPlant, setNewPlant] = useState({
    name: "",
    image: "",
    price: "",
  })

  function handleChange(e){
    setNewPlant({
      ...newPlant,
      [e.target.name]: e.target.value,
    })
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(e)
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newPlant.name,
        image: newPlant.image,
        price: parseFloat(newPlant.price),
      }),
    })
    .then(r => r.json())
    .then(plant => setNewPlant(plant))
    AddNewPlant(newPlant)
  }

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Plant name" value={newPlant.name} onChange={handleChange} />
        <input type="text" name="image" placeholder="Image URL" value={newPlant.image} onChange={handleChange} />
        <input type="number" name="price" step="0.01" placeholder="Price" value={newPlant.price} onChange={handleChange} />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
