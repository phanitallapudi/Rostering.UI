import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedComponent = ({ component: Component, ...rest }) => {
 const isAuthenticated = localStorage.getItem('authToken');
 const navigate = useNavigate();

 React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/', { replace: true });
    }
 }, [isAuthenticated, navigate]);

 return isAuthenticated ? <Component {...rest} /> : null;
};

export default ProtectedComponent;
