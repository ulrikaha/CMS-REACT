import { useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';


const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  

  useEffect(() => {
    fetchProducts();
  }, []);


  //Get all products
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/products');
      setProducts(response.data.allProducts);
    } catch (error) {
      console.log('Error fetching products', error);
    }
  };


  const handleEdit = (productId) => {
    //Navigate to the product details page with the selected product's ID
    navigate(`/ProductDetails/${productId}`);
  };

  
 //Modal for delete confirmation
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
    console.log('modal opened')
  };

  const closeModal = () => {
    setShowModal(false)
  };


const [productId, setProductId] = useState('');

const handleDelete = (productId) => {
    openModal();
    setProductId(productId);
};




const handleDeleteConfirmed = async () => {
  try {
    const token = localStorage.getItem('token');
    await axios.delete(`http://localhost:8080/api/products/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('Product deleted successfully');
    closeModal();
    // Fetch the updated list of products after deleting a product
    fetchProducts();
  } catch (error) {
    console.log('Error deleting product', error);
  }
};





  return (
    <div>
    <h2 className='text-center'>Product List</h2>
    <div className="list-group">
      {products &&
        products.map((item) => (
          <div className="list-group-item" key={item._id}>
            <div className="row">
              <div className="col-sm-3">
                <img src={item.imgURL} className="img-thumbnail" alt={item.name} />
              </div>
              <div className="col-sm-9">
                <h5>{item.name}</h5>
                <p>Category: {item.category}</p>
                <p>Description: {item.description}</p>
                <p>Price: €{item.price}</p>
                <button onClick={() => handleEdit(item._id)} className="btn btn-primary me-2">
                  Edit Product
                </button>
                <button onClick={() => handleDelete(item._id)} className="btn btn-danger">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
    {showModal && (
      <div className="modal" tabIndex="-1" role="dialog" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999,
    }}>
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirm Delete</h5>
              <button type="button" className="btn-close" onClick={() => closeModal()} aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete this product?</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => closeModal()}>Cancel</button>
              <button type="button" className="btn btn-danger" onClick={() => handleDeleteConfirmed()}>Delete</button>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
);

};


export default ProductList;







