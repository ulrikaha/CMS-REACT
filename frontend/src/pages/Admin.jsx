import { Navigate } from 'react-router-dom';
import ProductList from '../components/ProductList';


const Admin = ({ user }) => {

    if (!user) {
    return <Navigate to="/login" />
  }


return (
  <div>
      <div className="row">
        <div className="col text-center">
          <h1>Welcome Admin</h1>
            </div>
                <div className="col-auto my-5">
            <ProductList />
          </div>
             </div>
                </div>

   
   );
};

export default Admin;
