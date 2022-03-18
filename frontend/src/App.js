import "./App.css";
import "./bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./components/screens/HomeScreen";
import RegisterScreen from "./components/screens/RegisterScreen";
import LoginScreen from "./components/screens/LoginScreen";
import ProfileScreen from "./components/screens/ProfileScreen";
import { Provider } from "react-redux";
import store from "./store";
import { Container } from "react-bootstrap";
import CategoryScreen from "./components/adminScreens/CategoryScreen";
import UsersScreen from "./components/adminScreens/UsersScreen";
import ComplaintsScreen from "./components/adminScreens/ComplaintsScreen";
import ComplaintScreen from "./components/screens/ComplaintScreen";
import EditUserScreen from "./components/adminScreens/EditUserScreen";
import ComplaintViewScreen from "./components/adminScreens/ComplaintViewScreen";
import ComplaintResponseViewScreen from "./components/screens/ComplaintResponseViewScreen";
import ContactScreen from './components/contact/ContactScreen'
function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Header />
        <section style={{ minHeight: "80vh", overflow: "hidden" }}>
          <Container className="py-3">
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/register" element={<RegisterScreen />} />
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/profile" element={<ProfileScreen />} />
              <Route path="/contact" element={<ContactScreen />} />
              <Route path="/admin/category" element={<CategoryScreen />} />
              <Route path="/admin/users" element={<UsersScreen />} />
              <Route path="/admin/complaints" element={<ComplaintsScreen />} />
              <Route
                path="/admin/complaint"
                element={<ComplaintViewScreen />}
              />
              <Route path="/admin/users/update" element={<EditUserScreen />} />
              <Route path="/complaint/create" element={<ComplaintScreen />} />
              <Route path="/complaint/view" element={<ComplaintResponseViewScreen />} />
            </Routes>
          </Container>
        </section>
        <Footer />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
