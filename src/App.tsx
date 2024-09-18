import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import MinionsPage from "./pages/MinionsPage";
import MountDetailPage from "./pages/MountDetailPage";
import MountsPage from "./pages/MountsPage";
import DeveloperPage from "./pages/DeveloperPage";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <Routes>
        <Route element={<HomePage />}>
          <Route path="/*" element={<MountsPage />} />
          <Route path="/mount/:id" element={<MountDetailPage />} />
          <Route path="/minion" element={<MinionsPage />} />
          <Route path="/madeby" element={<DeveloperPage />} />
        </Route>
      </Routes>
    </RecoilRoot>
  );
}

export default App;
