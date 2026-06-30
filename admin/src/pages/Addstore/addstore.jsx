import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets, url } from '../../assets/assets'
import './addstore.css'

const Addstore = () => {
    const [image, setImage] = useState(false)
    const [restaurants, setRestaurants] = useState([])
    const [data, setData] = useState({
        name: '',
        description: '',
        cuisine: '',
        address: '',
        deliveryTime: ''
    })

    const onChangeHandler = (event) => {
        const { name, value } = event.target
        setData((prevData) => ({ ...prevData, [name]: value }))
    }

    const fetchRestaurants = async () => {
        try {
            const response = await axios.get(`${url}/api/restaurant/list`)

            if (response.data.success) {
                setRestaurants(response.data.data)
                return
            }

            toast.error(response.data.message || 'Unable to load restaurants')
        } catch (error) {
            toast.error(error.response?.data?.message || 'Unable to load restaurants')
        }
    }

    const removeRestaurant = async (restaurantId) => {
        if (!window.confirm('Remove this restaurant?')) {
            return
        }

        try {
            const response = await axios.post(`${url}/api/restaurant/remove`, {
                id: restaurantId
            })

            if (response.data.success) {
                toast.success(response.data.message)
                await fetchRestaurants()
                return
            }

            toast.error(response.data.message || 'Unable to remove restaurant')
        } catch (error) {
            toast.error(error.response?.data?.message || 'Unable to remove restaurant')
        }
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault()

        if (!image) {
            toast.error('Restaurant image not selected')
            return
        }

        try {
            const formData = new FormData()
            formData.append('name', data.name)
            formData.append('description', data.description)
            formData.append('cuisine', data.cuisine)
            formData.append('address', data.address)
            formData.append('deliveryTime', data.deliveryTime)
            formData.append('image', image)

            const response = await axios.post(`${url}/api/restaurant/add`, formData)

            if (response.data.success) {
                toast.success(response.data.message)
                setData({
                    name: '',
                    description: '',
                    cuisine: '',
                    address: '',
                    deliveryTime: ''
                })
                setImage(false)
                await fetchRestaurants()
                return
            }

            toast.error(response.data.message)
        } catch (error) {
            toast.error(error.response?.data?.message || 'Unable to add restaurant')
        }
    }

    useEffect(() => {
        fetchRestaurants()
    }, [])

    return (
        <div className='add-store'>
            <form className='flex-col' onSubmit={onSubmitHandler}>
                <div className='add-store-img-upload flex-col'>
                    <p>Upload restaurant image</p>
                    <input
                        id='restaurant-image'
                        type='file'
                        accept='image/*'
                        hidden
                        onChange={(e) => {
                            setImage(e.target.files[0])
                            e.target.value = ''
                        }}
                    />
                    <label htmlFor='restaurant-image'>
                        <img src={!image ? assets.upload_area : URL.createObjectURL(image)} alt='' />
                    </label>
                </div>

                <div className='add-store-name flex-col'>
                    <p>Restaurant name</p>
                    <input
                        type='text'
                        name='name'
                        value={data.name}
                        onChange={onChangeHandler}
                        placeholder='Type here'
                        required
                    />
                </div>

                <div className='add-store-description flex-col'>
                    <p>Description</p>
                    <textarea
                        rows={6}
                        name='description'
                        value={data.description}
                        onChange={onChangeHandler}
                        placeholder='Write restaurant details here'
                        required
                    />
                </div>

                <div className='add-store-grid'>
                    <div className='flex-col'>
                        <p>Cuisine</p>
                        <input
                            type='text'
                            name='cuisine'
                            value={data.cuisine}
                            onChange={onChangeHandler}
                            placeholder='South Indian, Chinese'
                            required
                        />
                    </div>

                    <div className='flex-col'>
                        <p>Delivery time</p>
                        <input
                            type='text'
                            name='deliveryTime'
                            value={data.deliveryTime}
                            onChange={onChangeHandler}
                            placeholder='25-35 min'
                            required
                        />
                    </div>
                </div>

                <div className='add-store-address flex-col'>
                    <p>Address</p>
                    <textarea
                        rows={4}
                        name='address'
                        value={data.address}
                        onChange={onChangeHandler}
                        placeholder='Enter full restaurant address'
                        required
                    />
                </div>

                <button type='submit' className='add-store-btn'>ADD RESTAURANT</button>
            </form>

            <div className='restaurant-list'>
                <p>All Restaurants</p>
                <div className='restaurant-list-table'>
                    <div className='restaurant-list-format title'>
                        <b>Image</b>
                        <b>Name</b>
                        <b>Cuisine</b>
                        <b>Delivery</b>
                        <b>Action</b>
                    </div>
                    {restaurants.map((restaurant) => (
                        <div key={restaurant._id} className='restaurant-list-format'>
                            <img src={`${url}/images/` + restaurant.image} alt={restaurant.name} />
                            <p>{restaurant.name}</p>
                            <p>{restaurant.cuisine}</p>
                            <p>{restaurant.deliveryTime}</p>
                            <button
                                type='button'
                                className='restaurant-remove-btn'
                                onClick={() => removeRestaurant(restaurant._id)}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Addstore
