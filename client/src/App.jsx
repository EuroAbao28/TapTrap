import Background from "./components/Background";
import "aos/dist/aos.css";
import InGame from "./pages/InGame";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile";
import { UserProvider } from "./contexts/UserContextProvider";
import Leaderboard from "./pages/Leaderboard";

function App() {
  return (
    <>
      <UserProvider>
        <div className="w-screen h-svh text-white/70">
          <Background />
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/easy" element={<InGame />} />
              <Route path="/medium" element={<InGame />} />
              <Route path="/hard" element={<InGame />} />
            </Routes>
          </Router>
        </div>
      </UserProvider>
    </>
  );
}

export default App;
