import React, { useEffect, useState } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";
import Filter from "./Filter";

function PlantPage() {
  const [plants, setPlants] = useState([])
  const [searched, setSearched] = useState("")
  // const [filter,  setFilter] = useState("Popular")

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

  function changeFilter(value){
    if(value === "Price Low - High"){
      let sortPlantsLowToHigh = [...plants]
      sortPlantsLowToHigh.sort((a,b) => {
        const priceA = a.price
        const priceB= b.price
        if(priceA < priceB){
          return -1
        } 
        if(priceA > priceB){
          return 1
        }
        return 0
      })
      return setPlants(sortPlantsLowToHigh)
    } else if (value === "Price High - Low"){
      let sortPlantsHighToLow = [...plants]
      sortPlantsHighToLow.sort((a,b) => {
        const priceA = a.price
        const priceB= b.price
        if(priceA > priceB){
          return -1
        } 
        if(priceA < priceB){
          return 1
        }
        return 0
      })
      return setPlants(sortPlantsHighToLow)
    } else if( value === "Alphabetically"){
      let sortPlantsAlphabetically = [...plants]
      sortPlantsAlphabetically.sort((a,b) => {
        let nameA = a.name.toLowerCase()
        let nameB = b.name.toLowerCase()
        if( nameA < nameB){
          return -1
        }
        if ( nameA > nameB){
          return 1
        }
        return 0
      })
      return setPlants(sortPlantsAlphabetically)
    }
  }

  const dislpayedPlants = plants.filter(plant => plant.name.toLowerCase().includes(searched.toLowerCase()))

  return (
    <main>
      <NewPlantForm AddNewPlant={AddNewPlant} />
      <Search searched={searched} onSearch={setSearched}/>
      <Filter changeFilter={changeFilter} />
      <PlantList plants={dislpayedPlants} onDelete={handleDeletePlant} />
    </main>
  );
}

export default PlantPage;
