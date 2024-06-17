import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Productos() {
  const [productos, setProductos] = useState([]);
  const [newProduct, setNewProduct] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    cantidad: '',
    imagen: '',
  });

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    try {
      const response = await axios.get('/api/products');
      setProductos(response.data);
    } catch (error) {
      console.error('Error fetching products', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('/api/products', newProduct);
      fetchProductos();
    } catch (error) {
      console.error('Error creating product', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/products/${id}`);
      fetchProductos();
    } catch (error) {
      console.error('Error deleting product', error);
    }
  };

  return (
    <div>
      <h2>Productos</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input type="text" name="nombre" value={newProduct.nombre} onChange={handleChange} required />
        </div>
        <div>
          <label>Descripción:</label>
          <input type="text" name="descripcion" value={newProduct.descripcion} onChange={handleChange} required />
        </div>
        <div>
          <label>Precio:</label>
          <input type="number" name="precio" value={newProduct.precio} onChange={handleChange} required />
        </div>
        <div>
          <label>Cantidad:</label>
          <input type="number" name="cantidad" value={newProduct.cantidad} onChange={handleChange} required />
        </div>
        <div>
          <label>Imagen URL:</label>
          <input type="text" name="imagen" value={newProduct.imagen} onChange={handleChange} required />
        </div>
        <button type="submit">Crear Producto</button>
      </form>
      <div>
        <h3>Lista de Productos</h3>
        <ul>
          {productos.map((producto) => (
            <li key={producto.id}>
              <h4>{producto.nombre}</h4>
              <p>{producto.descripcion}</p>
              <p>Precio: ${producto.precio}</p>
              <p>Cantidad: {producto.cantidad}</p>
              <img src={producto.imagen} alt={producto.nombre} width="100" />
              <button onClick={() => handleDelete(producto.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Productos;
