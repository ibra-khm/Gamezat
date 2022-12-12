import { Route, Routes } from "react-router-dom";
import Posts from "./pages/website/Posts";
import { AuthProvider } from "./context/AuthContext";
import MainNav from "./pages/website/MainNav";
import { ThemeProvider } from "@material-tailwind/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import MainOutlet from "./outlet/MainOutlet";
import DashLayout from "./outlet/DashLayout";
import Home from "./pages/website/Home";
import axios from "axios";
import Profile from "./pages/website/Profile";
import Games from "./pages/website/Games";
import SingleGame from "./pages/website/SingleGame";
import { useEffect } from "react";
import Affiliate from "./pages/website/Affiliate";

import { ProductProvider } from "./context/ProductContext";

import TicTacToe from "./pages/website/TicTacToe";
import OfflineXo from "./components/website/tictactoe/OfflineXo";
import AiXo from "./components/website/tictactoe/AiXo";

import { FreeGamesProvider } from "./context/FreeGamesContext";

import Dashboard from "./pages/dashboard/Dashboard";
import { AdminProvider } from "./context/AdminContext";
import About from "./pages/website/About";
import SingleProfile from "./pages/website/SingleProfile";
import DPosts from "./pages/dashboard/DPosts";
import DReports from "./pages/dashboard/DReports";
import DUsers from "./pages/dashboard/DUsers";

import Contact from "./pages/website/Contact";
import DProducts from "./pages/dashboard/DProducts";

axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.headers.post["Content-Type"] = "application/vnd.api+json";
axios.defaults.headers.post["Accept"] = "application/vnd.api+json";
axios.defaults.withCredentials = true;
function App() {
  return (
    <>
      <GoogleOAuthProvider clientId="766290884424-if3sip56qtto151e6623p5s1vi6ui6n7.apps.googleusercontent.com">
        <AuthProvider>
          <AdminProvider>
            <ProductProvider>
              <FreeGamesProvider>
                <ThemeProvider>
                  <Routes>
                    <Route path="/" element={<MainOutlet />}>
                      <Route path="/" element={<Home />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/profile/:id" element={<SingleProfile />} />
                      <Route path="/games" element={<Games />} />
                      <Route path="/games/:id" element={<SingleGame />} />
                      <Route path="/affiliate" element={<Affiliate />} />
                      <Route path="/community" element={<Posts />} />
                      <Route path="/xo" element={<TicTacToe />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/about" element={<About />} />

                      <Route
                        path={"/multiplayer-offline"}
                        element={<OfflineXo />}
                      />
                      <Route path={"/vs-ai"} element={<AiXo />} />
                    </Route>
                    <Route path="/dashboard" element={<DashLayout />}>
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/dashboard/posts" element={<DPosts />} />
                      <Route path="/dashboard/reports" element={<DReports />} />

                      <Route path="/dashboard/users" element={<DUsers />} />

                      <Route
                        path="/dashboard/products"
                        element={<DProducts />}
                      />
                    </Route>
                  </Routes>
                </ThemeProvider>
              </FreeGamesProvider>
            </ProductProvider>
          </AdminProvider>
        </AuthProvider>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
