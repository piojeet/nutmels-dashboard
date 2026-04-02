import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import SignUp from '../components/auth/SignUp'
import LogIn from '../components/auth/LogIn'
import ForgetPassword from '../components/auth/ForgetPassword'
import ConfirmEmail from '../components/auth/ConfirmEmail'
import Congratulation from '../components/auth/Congratulation'
import Order from '../components/order/Order'
import CRMCustomerProfile from '../components/CRMPage/CRMCustomerProfile'
import ProductPage from '../pages/ProductPage'
import Blog from '../components/blog/Blog'
import UiHome from '../components/ui-seo/UiHome'
import ReportsHome from '../components/reports/ReportsHome'
import SettingMain from '../components/setting/SettingMain'

function AppRoutes() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/forget-password' element={<ForgetPassword />} />
        <Route path='/confirm-email' element={<ConfirmEmail />} />
        <Route path='/congratulation' element={<Congratulation />} />
        <Route path='/order' element={<Order />} />
        <Route path='/crm-customer-profile' element={<CRMCustomerProfile />} />
        <Route path='/products' element={<ProductPage />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/seo' element={<UiHome />} />
        <Route path='/reports' element={<ReportsHome />} />
        <Route path='/setting' element={<SettingMain />} />
      </Routes>
    </div>
  )
}

export default AppRoutes