import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import { Container, Placeholder } from "react-bootstrap";
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
const App = () => {
  return (
    <Router>
      <Header />
      <Container>
        <main className="py-3">
          <Routes>
            <Route path='/placeorder' element={<PlaceOrderScreen />}></Route>
            <Route path='/payment' element={<PaymentScreen />}></Route>
            <Route path='/shipping' element={<ShippingScreen />}></Route>
            <Route path='/register' element={<RegisterScreen />}></Route>
            <Route path='/login' element={<LoginScreen />}></Route>
            <Route path='/profile' element={<ProfileScreen />}></Route>
            <Route path='/product/:id' element={<ProductScreen />}></Route>
            <Route path='/cart' element={<CartScreen />}></Route>
            <Route path='/cart/:id' element={<CartScreen />}></Route>
            <Route path='/' element={<HomeScreen />} exact></Route>
          </Routes>
        </main>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
