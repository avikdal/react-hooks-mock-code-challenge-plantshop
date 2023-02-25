import React, { useEffect, useState } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([])
  const [searched, setSearched] = useState("")

  useEffect(() => {
    fetch('http://localhost:6001/plants')
    .then(r => r.json())
    .then(plantsArray => setPlants(plantsArray))
  }, [])

  function AddNewPlant(newPlant){
    const allThePlants = [...plants, newPlant]
    setPlants(allThePlants)
  }

  function handleDeletePlant(id){
    const updatedPlants = plants.filter(plant => plant.id !== id)
    setPlants(updatedPlants)
  }

  const dislpayedPlants = plants.filter(plant => plant.name.toLowerCase().includes(searched.toLowerCase()))

  return (
    <main>
      <NewPlantForm AddNewPlant={AddNewPlant} />
      <Search searched={searched} onSearch={setSearched}/>
      <PlantList plants={dislpayedPlants} onDelete={handleDeletePlant} />
    </main>
  );
}

export default PlantPage;
