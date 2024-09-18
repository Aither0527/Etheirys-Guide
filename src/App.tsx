import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import MinionsPage from "./pages/MinionsPage";
import MountDetailPage from "./pages/MountDetailPage";
import MountsPage from "./pages/MountsPage";
import DeveloperPage from "./pages/DeveloperPage";
// import AddDataPage from "./pages/addDataPage";

function App() {
  return (
    <Routes>
      <Route element={<HomePage />}>
        <Route path="/*" element={<MountsPage />} />
        <Route path="/mount/:id" element={<MountDetailPage />} />
        <Route path="/minion" element={<MinionsPage />} />
        <Route path="/madeby" element={<DeveloperPage />} />
        {/* <Route path="/addData" element={<AddDataPage />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
