import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { HelmetProvider } from 'react-helmet-async';
import {Provider} from 'react-redux';
import store from './store';
import App from './App.jsx';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import Home from './views/Home.jsx';
import Details from './views/Details.jsx';
import Cart from './views/Cart';
import Login from './views/Login';
import Register from './views/Register';
import Shipping from './views/Shipping';
import Payment from './views/Payment';
import PlaceOrder from './views/PlaceOrder';
import Order from './views/Order';
import Profile from './views/Profile';
import OrderList from './views/admin/OrderList';
import ProductList from './views/admin/ProductList';
import ProductEdit from './views/admin/ProductEdit';
import UserList from './views/admin/UserList';
import UserEdit from './views/admin/UserEdit';
import Search from './views/Search';
import './assets/styles/bootstrap.custom.css'
import './assets/styles/index.css';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/"element={<App />}>
      <Route index={true} path="/" element={<Home />} />
      <Route path="/search/:keyword" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/page/:pageNumber" element={<Home />} />
      <Route path="/search/:keyword/page/:pageNumber" element={<Home />} />
      <Route path="/product/:id" element={<Details />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path='' element={<PrivateRoute />}>
        <Route path='/shipping' element={<Shipping />} />
        <Route path='/payment' element={<Payment />} />
        <Route path='/placeorder' element={<PlaceOrder />} />
        <Route path='/order/:id' element={<Order />} />
        <Route path='/profile' element={<Profile />} />
      </Route>

      <Route path='' element={<AdminRoute />}>
        <Route path='/admin/orderlist' element={<OrderList />} />
        <Route path='/admin/productlist' element={<ProductList />} />
        <Route path='/admin/productlist/:pageNumber' element={<ProductList />} />
        <Route path='/admin/product/:id/edit' element={<ProductEdit />} />
        <Route path='/admin/userlist' element={<UserList />} />
        <Route path='/admin/user/:id/edit' element={<UserEdit />} />
      </Route>

    </Route>
    
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <PayPalScriptProvider deferLoading={true}>
          <RouterProvider router={router} />
        </PayPalScriptProvider>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>,
)
