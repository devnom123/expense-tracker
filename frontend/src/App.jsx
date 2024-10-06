import { Route, Routes } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import HomePage from "./pages/HomePage"
import Transaction from "./pages/Transaction"
import NotFound from "./pages/NotFound"
import Header from "./components/ui/Header"

function App() {
  const authUser = false;
  return (
    <>
    {authUser && <Header />}
     <Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/login' element={<LoginPage />} />
				<Route path='/signup' element={<SignupPage />} />
				<Route path='/transaction/:id' element={<Transaction />} />
				<Route path='*' element={<NotFound />} />
			</Routes>
    </>
  )
}

export default App
