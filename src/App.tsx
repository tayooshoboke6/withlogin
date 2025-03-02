import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProductDetailPage from './pages/ProductDetailPage'
import CartPage from './pages/CartPage'
import CategoryProductsPage from './pages/CategoryProductsPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import { CartProvider } from './contexts/CartContext'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/auth/ProtectedRoute'
import './App.css'

// Admin pages
import DashboardPage from './pages/admin/DashboardPage'
import ProductsPage from './pages/admin/ProductsPage'
import ProductFormPage from './pages/admin/ProductFormPage'
import CategoriesPage from './pages/admin/CategoriesPage'
import OrdersPage from './pages/admin/OrdersPage'
import SettingsPage from './pages/admin/SettingsPage'
import UsersPage from './pages/admin/UsersPage'

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Routes>
            {/* Auth routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            
            {/* Customer routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/category/:slug" element={<CategoryProductsPage />} />
            
            {/* Protected Admin routes */}
            <Route path="/admin" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
            <Route path="/admin/products" element={<ProtectedRoute><ProductsPage /></ProtectedRoute>} />
            <Route path="/admin/products/new" element={<ProtectedRoute><ProductFormPage /></ProtectedRoute>} />
            <Route path="/admin/products/edit/:id" element={<ProtectedRoute><ProductFormPage /></ProtectedRoute>} />
            <Route path="/admin/categories" element={<ProtectedRoute><CategoriesPage /></ProtectedRoute>} />
            <Route path="/admin/orders" element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} />
            <Route path="/admin/users" element={<ProtectedRoute><UsersPage /></ProtectedRoute>} />
            <Route path="/admin/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
