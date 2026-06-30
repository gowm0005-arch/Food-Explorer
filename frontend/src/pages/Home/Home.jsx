import React, { useRef, useState } from 'react'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import AppDownload from '../../components/AppDownload/AppDownload'
import RestaurantShowcase from '../../components/RestaurantShowcase/RestaurantShowcase'

const Home = () => {

  const [category, setCategory] = useState("All")
  const [showRestaurants, setShowRestaurants] = useState(false)
  const restaurantRef = useRef(null)

  const handleRestaurantsClick = () => {
    setShowRestaurants(true)
    setTimeout(() => {
      restaurantRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  return (
    <>
      <Header onRestaurantsClick={handleRestaurantsClick} />
      {showRestaurants ? <div ref={restaurantRef}><RestaurantShowcase /></div> : null}
      <ExploreMenu setCategory={setCategory} category={category} />
      <FoodDisplay category={category} />
      <AppDownload />
    </>
  )
}

export default Home