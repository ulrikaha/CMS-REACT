import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import ProductAdd from '../components/ProductAdd';
import ProductList from '../components/ProductList';



const Admin = ({ user }) => {
const [showAddForm, setShowAddForm] = useState(false);


  if (!user) {
    return <Navigate to="/login" />
  }

const handleAddButtonClick = () => {
      setShowAddForm(!showAddForm); // Toggle + button
    };

 
   

return (
  <div>
      <div className="row">
        <div className="col text-center">
          <h1>Welcome Admin</h1>
            </div>
                <div className="col-auto">
                  <button className="btn btn-primary" type="submit" onClick={handleAddButtonClick}>Add a new product</button>
                  {showAddForm && <ProductAdd />}
            <br></br>
            <br></br>
            <ProductList />
          </div>
             </div>
                </div>

   
   );
};

export default Admin;
