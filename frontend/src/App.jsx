import { Container } from "react-bootstrap";
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import './App.css'

function App() {

  return (
    <>
      <Header />
      <ToastContainer />
      <main className="py-3">
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
    </>
  )
}

export default App
