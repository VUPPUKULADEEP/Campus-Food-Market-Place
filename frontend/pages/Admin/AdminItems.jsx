import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import api from '../../src/api/api';

const AdminItems = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      const apiurl = import.meta.env.VITE_BACKEND_URL;
      let response;
      try {
        response = await api.get(`/items/admin`);
        console.log(response.data)
        setItems(response.data)
      }
      catch (error) {
        alert('fail to fetch');
        console.log(error)
      }
    }
    fetchdata();
  }, [])

  return (
    <>
      <div className='container-fluid mt-3'>
        <div className='header d-flex flex-row justify-content-between'>
          <h3 className='mb-2'>Your Items</h3>
          <button className='btn btn-primary' onClick={() => { navigate('/admin/additem') }}>Add Item</button>
        </div>

        <div className="container mt-4">
          <table className="table table-bordered table-hover align-middle text-center">

            <thead className="table-dark">
              <tr>
                <th>Image</th>
                <th>Item Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {items.length > 0 ? (
                items.map((item) => (
                  <tr key={item.item_id}>

                    <td>
                      <img
                        src={`http://localhost:8000/${item.image_url}`}
                        alt={item.item_name}
                        style={{
                          width: "70px",
                          height: "70px",
                          objectFit: "cover",
                          borderRadius: "8px"
                        }}
                      />
                    </td>

                    <td>{item.item_name}</td>

                    <td>₹ {item.price}</td>

                    <td>{item.quantity}</td>

                    <td>
                      <div className="d-flex justify-content-center gap-2">

                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() =>
                            navigate(`/admin/edit/${item.item_id}`)
                          }
                        >
                          Edit
                        </button>

                        <button
                          className="btn btn-danger btn-sm"
                        >
                          Delete
                        </button>

                      </div>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No items found
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>

      </div>

    </>)
}

export default AdminItems