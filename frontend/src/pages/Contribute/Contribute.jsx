import React, { useContext, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { StoreContext } from '../../Context/StoreContext'
import './Contribute.css'

const initialFoodData = {
    name: '',
    description: '',
    price: '',
    category: 'Salad'
}

const initialRestaurantData = {
    name: '',
    description: '',
    cuisine: '',
    address: '',
    deliveryTime: ''
}

const Contribute = ({ setShowLogin }) => {
    const { url, token } = useContext(StoreContext)
    const [activeTab, setActiveTab] = useState('restaurant')
    const [foodImage, setFoodImage] = useState(false)
    const [restaurantImage, setRestaurantImage] = useState(false)
    const [foodData, setFoodData] = useState(initialFoodData)
    const [restaurantData, setRestaurantData] = useState(initialRestaurantData)

    const onFoodChange = (event) => {
        const { name, value } = event.target
        setFoodData((prev) => ({ ...prev, [name]: value }))
    }

    const onRestaurantChange = (event) => {
        const { name, value } = event.target
        setRestaurantData((prev) => ({ ...prev, [name]: value }))
    }

    const ensureLoggedIn = () => {
        if (token) {
            return true
        }

        toast.info('Please sign in to add food or restaurants')
        setShowLogin(true)
        return false
    }

    const submitFood = async (event) => {
        event.preventDefault()

        if (!ensureLoggedIn()) {
            return
        }

        if (!foodImage) {
            toast.error('Please upload a food image')
            return
        }

        try {
            const formData = new FormData()
            formData.append('name', foodData.name)
            formData.append('description', foodData.description)
            formData.append('price', Number(foodData.price))
            formData.append('category', foodData.category)
            formData.append('image', foodImage)

            const response = await axios.post(`${url}/api/food/add`, formData)
            if (response.data.success) {
                toast.success(response.data.message)
                setFoodData(initialFoodData)
                setFoodImage(false)
                return
            }

            toast.error(response.data.message)
        } catch (error) {
            toast.error('Unable to add food item')
        }
    }

    const submitRestaurant = async (event) => {
        event.preventDefault()

        if (!ensureLoggedIn()) {
            return
        }

        if (!restaurantImage) {
            toast.error('Please upload a restaurant image')
            return
        }

        try {
            const formData = new FormData()
            formData.append('name', restaurantData.name)
            formData.append('description', restaurantData.description)
            formData.append('cuisine', restaurantData.cuisine)
            formData.append('address', restaurantData.address)
            formData.append('deliveryTime', restaurantData.deliveryTime)
            formData.append('image', restaurantImage)

            const response = await axios.post(`${url}/api/restaurant/add`, formData)
            if (response.data.success) {
                toast.success(response.data.message)
                setRestaurantData(initialRestaurantData)
                setRestaurantImage(false)
                return
            }

            toast.error(response.data.message)
        } catch (error) {
            toast.error('Unable to add restaurant')
        }
    }

    return (
        <div className='contribute-page'>
            <div className='contribute-hero'>
                <div>
                    <span>Community submissions</span>
                    <h1>Users can add restaurants and food too</h1>
                    <p>Share a favorite dish or a restaurant you love. Add photos and details so other users can discover more places to order from.</p>
                </div>
                <div className='contribute-tabs'>
                    <button
                        className={activeTab === 'restaurant' ? 'active' : ''}
                        onClick={() => setActiveTab('restaurant')}
                    >
                        Add Restaurant
                    </button>
                    <button
                        className={activeTab === 'food' ? 'active' : ''}
                        onClick={() => setActiveTab('food')}
                    >
                        Add Food
                    </button>
                </div>
            </div>

            {activeTab === 'restaurant' ? (
                <form className='contribute-form' onSubmit={submitRestaurant}>
                    <div className='contribute-image-block'>
                        <p>Restaurant image</p>
                        <label className='contribute-upload'>
                            <span>{restaurantImage ? restaurantImage.name : 'Choose image'}</span>
                            <input
                                type='file'
                                accept='image/*'
                                hidden
                                onChange={(event) => setRestaurantImage(event.target.files[0])}
                            />
                        </label>
                    </div>

                    <div className='contribute-grid'>
                        <input name='name' value={restaurantData.name} onChange={onRestaurantChange} type='text' placeholder='Restaurant name' required />
                        <input name='cuisine' value={restaurantData.cuisine} onChange={onRestaurantChange} type='text' placeholder='Cuisine type' required />
                    </div>

                    <textarea name='description' value={restaurantData.description} onChange={onRestaurantChange} rows={5} placeholder='Restaurant description' required />
                    <textarea name='address' value={restaurantData.address} onChange={onRestaurantChange} rows={4} placeholder='Restaurant address' required />
                    <input name='deliveryTime' value={restaurantData.deliveryTime} onChange={onRestaurantChange} type='text' placeholder='Delivery time, for example 20-30 min' required />

                    <button type='submit' className='contribute-submit'>Submit Restaurant</button>
                </form>
            ) : (
                <form className='contribute-form' onSubmit={submitFood}>
                    <div className='contribute-image-block'>
                        <p>Food image</p>
                        <label className='contribute-upload'>
                            <span>{foodImage ? foodImage.name : 'Choose image'}</span>
                            <input
                                type='file'
                                accept='image/*'
                                hidden
                                onChange={(event) => setFoodImage(event.target.files[0])}
                            />
                        </label>
                    </div>

                    <div className='contribute-grid'>
                        <input name='name' value={foodData.name} onChange={onFoodChange} type='text' placeholder='Food name' required />
                        <select name='category' value={foodData.category} onChange={onFoodChange}>
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Deserts">Deserts</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure Veg">Pure Veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                            <option value="Main Course">Main Course</option>
                        </select>
                    </div>

                    <textarea name='description' value={foodData.description} onChange={onFoodChange} rows={5} placeholder='Food description' required />
                    <input name='price' value={foodData.price} onChange={onFoodChange} type='number' min='1' placeholder='Price' required />

                    <button type='submit' className='contribute-submit'>Submit Food</button>
                </form>
            )}
        </div>
    )
}

export default Contribute
