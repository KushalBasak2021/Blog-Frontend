import { Routes, Route } from "react-router-dom";

import Topbar from "./components/topbar/Topbar";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Home from "./pages/home/Home";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import { useContext } from "react";
import { Context } from "./context/Context";

function App() {
  const { user } = useContext(Context);

  return (
    <div>
      <Topbar />
      <Routes>
        {user ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Home />} />
            <Route path="/login" element={<Home />} />
            <Route path="/write" element={<Write />} />
            <Route path="/post/:postId" element={<Single />} />
            <Route path="/settings" element={<Settings />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/write" element={<Login />} />
            <Route path="/post/:postId" element={<Single />} />
            <Route path="/settings" element={<Settings />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
