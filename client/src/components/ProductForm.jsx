import { useState } from 'react';
import axios from 'axios';

const ProductForm = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: ''
  });

  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token'); // Assume user is logged in

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await axios.post(
        'http://localhost:5000/api/products',
        product,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      setMessage('✅ Product created successfully');
      setProduct({ name: '', description: '', price: '', imageUrl: '' });
    } catch (err) {
      setMessage('❌ Error creating product');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Create New Product</h2>
      {message && <p className="mb-4 text-sm">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" value={product.name} onChange={handleChange} placeholder="Name" required className="w-full p-2 border rounded" />
        <input type="text" name="description" value={product.description} onChange={handleChange} placeholder="Description" className="w-full p-2 border rounded" />
        <input type="number" name="price" value={product.price} onChange={handleChange} placeholder="Price" required className="w-full p-2 border rounded" />
        <input type="text" name="imageUrl" value={product.imageUrl} onChange={handleChange} placeholder="Image URL" className="w-full p-2 border rounded" />
        <button type="submit" className="w-full bg-black text-white p-2 rounded">Create Product</button>
      </form>
    </div>
  );
};

export default ProductForm;
