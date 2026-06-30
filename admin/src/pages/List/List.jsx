import React, { useEffect, useState } from 'react'
import './List.css'
import { url, currency } from '../../assets/assets'
import axios from 'axios';
import { toast } from 'react-toastify';

const List = () => {

  const [list, setList] = useState([]);
  const [editingFoodId, setEditingFoodId] = useState(null);
  const [editedPrice, setEditedPrice] = useState('');

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`)
    if (response.data.success) {
      setList(response.data.data);
    }
    else {
      toast.error("Error")
    }
  }

  const removeFood = async (foodId) => {
    const response = await axios.post(`${url}/api/food/remove`, {
      id: foodId
    })
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    }
    else {
      toast.error("Error")
    }
  }

  const startEditingPrice = (item) => {
    setEditingFoodId(item._id);
    setEditedPrice(item.price);
  }

  const cancelEditingPrice = () => {
    setEditingFoodId(null);
    setEditedPrice('');
  }

  const updatePrice = async (foodId) => {
    const price = Number(editedPrice);

    if (Number.isNaN(price) || price < 0) {
      toast.error("Please enter a valid price");
      return;
    }

    const response = await axios.post(`${url}/api/food/update-price`, {
      id: foodId,
      price
    })

    if (response.data.success) {
      toast.success(response.data.message);
      setEditingFoodId(null);
      setEditedPrice('');
      await fetchList();
    }
    else {
      toast.error(response.data.message || "Error")
    }
  }

  useEffect(() => {
    fetchList();
  }, [])

  return (
    <div className='list add flex-col'>
      <p>All Foods List</p>
      <div className='list-table'>
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className='list-table-format'>
              <img
                src={item.image && item.image.startsWith('http') ? item.image : `${url}/images/${item.image}`}
                alt={item.name}
              />
              <p>{item.name}</p>
              <p>{item.category}</p>
              {editingFoodId === item._id ? (
                <div className='price-edit'>
                  <span>{currency}</span>
                  <input
                    type="number"
                    min="0"
                    value={editedPrice}
                    onChange={(e) => setEditedPrice(e.target.value)}
                  />
                </div>
              ) : (
                <p>{currency}{item.price}</p>
              )}
              <div className='list-actions'>
                {editingFoodId === item._id ? (
                  <>
                    <button type="button" onClick={() => updatePrice(item._id)}>Save</button>
                    <button type="button" onClick={cancelEditingPrice}>Cancel</button>
                  </>
                ) : (
                  <button type="button" onClick={() => startEditingPrice(item)}>Edit</button>
                )}
                <p className='cursor' onClick={() => removeFood(item._id)}>x</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List
