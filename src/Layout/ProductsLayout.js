import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

const ProductsLayout = () => {
    return (
        <div className=''>
            <Outlet />
        </div >
    );
}

export default ProductsLayout;
