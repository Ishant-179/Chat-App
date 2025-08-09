import { Navigate, Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import SettingPage from "./pages/SettingPage"
import ProfilePage from "./pages/ProfilePage"
import SignUpPage from "./pages/SignUpPage"
import LoginPage from "./pages/LoginPage"
import HomePage from "./pages/HomePage"
import { Toaster } from "sonner"
import { useAuthStore } from "./store/useAuthStore"
import { useEffect } from "react"
import { Loader } from "lucide-react"
import { useThemeStore } from "./store/useThemeStore"


function App() {
  
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  const { theme } = useThemeStore();

  console.log({onlineUsers});

  useEffect(() => {

     document.documentElement.setAttribute("data-theme", theme);
    checkAuth();
  }, [checkAuth, theme]);


  if(isCheckingAuth && !authUser) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    )
  }

  return (
    <div className="">
      <Toaster richColors position="top-right"/>
        <Navbar />
        <Routes>
          <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
          <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
          <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
          <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
          <Route path="/settings" element={<SettingPage />} />
        </Routes>
      </div>
  )
}

export default App
