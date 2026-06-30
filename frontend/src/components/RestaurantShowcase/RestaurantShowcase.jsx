import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { StoreContext } from '../../Context/StoreContext'
import './RestaurantShowcase.css'

const RestaurantShowcase = () => {
    const { url } = useContext(StoreContext)
    const [restaurants, setRestaurants] = useState([])
    const [feedbackList, setFeedbackList] = useState([])
    const [openFeedbackForm, setOpenFeedbackForm] = useState({})
    const [feedbackData, setFeedbackData] = useState({})

    const fetchRestaurants = async () => {
        try {
            const [restaurantResponse, feedbackResponse] = await Promise.all([
                axios.get(`${url}/api/restaurant/list`),
                axios.get(`${url}/api/restaurant/feedback/list`)
            ])

            if (restaurantResponse.data.success) {
                setRestaurants(restaurantResponse.data.data)
            }

            if (feedbackResponse.data.success) {
                setFeedbackList(feedbackResponse.data.data)
            }
        } catch (error) {
            toast.error('Unable to load restaurants')
        }
    }

    useEffect(() => {
        fetchRestaurants()
    }, [])

    const toggleFeedbackForm = (restaurantId) => {
        setOpenFeedbackForm((prev) => ({ ...prev, [restaurantId]: !prev[restaurantId] }))
        setFeedbackData((prev) => ({
            ...prev,
            [restaurantId]: prev[restaurantId] || { name: '', feedback: '', image: null }
        }))
    }

    const onChangeHandler = (restaurantId, field, value) => {
        setFeedbackData((prev) => ({
            ...prev,
            [restaurantId]: {
                ...prev[restaurantId],
                [field]: value
            }
        }))
    }

    const submitFeedback = async (event, restaurantId) => {
        event.preventDefault()

        const currentFeedback = feedbackData[restaurantId]
        if (!currentFeedback?.name || !currentFeedback?.feedback) {
            toast.error('Please enter your name and feedback')
            return
        }

        try {
            const formData = new FormData()
            formData.append('restaurantId', restaurantId)
            formData.append('name', currentFeedback.name)
            formData.append('feedback', currentFeedback.feedback)
            if (currentFeedback.image) {
                formData.append('image', currentFeedback.image)
            }

            const response = await axios.post(`${url}/api/restaurant/feedback/add`, formData)
            if (response.data.success) {
                toast.success(response.data.message)
                setFeedbackData((prev) => ({
                    ...prev,
                    [restaurantId]: { name: '', feedback: '', image: null }
                }))
                setOpenFeedbackForm((prev) => ({ ...prev, [restaurantId]: false }))
                fetchRestaurants()
                return
            }

            toast.error(response.data.message)
        } catch (error) {
            toast.error('Unable to submit feedback')
        }
    }

    return (
        <section className='restaurant-showcase' id='restaurants'>
            <div className='restaurant-showcase-heading'>
                <span>New on home</span>
                <h2>Restaurants near you</h2>
                <p>Browse restaurants, read customer feedback, and share your own photos and experience before ordering.</p>
            </div>

            <div className='restaurant-list'>
                {restaurants.map((restaurant) => {
                    const restaurantFeedback = feedbackList.filter((item) => item.restaurantId === restaurant._id)
                    const currentFeedback = feedbackData[restaurant._id] || { name: '', feedback: '', image: null }

                    return (
                        <article className='restaurant-card' key={restaurant._id}>
                            <img className='restaurant-card-image' src={`${url}/images/${restaurant.image}`} alt={restaurant.name} />
                            <div className='restaurant-card-content'>
                                <div className='restaurant-card-top'>
                                    <div>
                                        <h3>{restaurant.name}</h3>
                                        <p>{restaurant.description}</p>
                                    </div>
                                    <button className='restaurant-feedback-toggle' onClick={() => toggleFeedbackForm(restaurant._id)}>
                                        {openFeedbackForm[restaurant._id] ? 'Close Feedback' : 'Give Feedback'}
                                    </button>
                                </div>

                                <div className='restaurant-meta'>
                                    <span>{restaurant.cuisine}</span>
                                    <span>{restaurant.deliveryTime}</span>
                                    <span>{restaurant.address}</span>
                                </div>

                                {openFeedbackForm[restaurant._id] ? (
                                    <form className='restaurant-feedback-form' onSubmit={(event) => submitFeedback(event, restaurant._id)}>
                                        <input
                                            type='text'
                                            placeholder='Your name'
                                            value={currentFeedback.name}
                                            onChange={(event) => onChangeHandler(restaurant._id, 'name', event.target.value)}
                                            required
                                        />
                                        <textarea
                                            rows={4}
                                            placeholder='Share your feedback'
                                            value={currentFeedback.feedback}
                                            onChange={(event) => onChangeHandler(restaurant._id, 'feedback', event.target.value)}
                                            required
                                        />
                                        <label className='restaurant-upload-box'>
                                            <span>{currentFeedback.image ? currentFeedback.image.name : 'Upload photo (optional)'}</span>
                                            <input
                                                type='file'
                                                accept='image/*'
                                                hidden
                                                onChange={(event) => onChangeHandler(restaurant._id, 'image', event.target.files[0])}
                                            />
                                        </label>
                                        <button type='submit'>Submit Feedback</button>
                                    </form>
                                ) : null}

                                <div className='restaurant-feedback-list'>
                                    <h4>Customer feedback</h4>
                                    {restaurantFeedback.length ? restaurantFeedback.slice(0, 3).map((item) => (
                                        <div className='restaurant-feedback-item' key={item._id}>
                                            <div className='restaurant-feedback-copy'>
                                                <strong>{item.name}</strong>
                                                <p>{item.feedback}</p>
                                            </div>
                                            {item.image ? <img src={`${url}/images/${item.image}`} alt={item.name} /> : null}
                                        </div>
                                    )) : <p className='restaurant-feedback-empty'>No feedback yet. Be the first to add one.</p>}
                                </div>
                            </div>
                        </article>
                    )
                })}
            </div>
        </section>
    )
}

export default RestaurantShowcase
