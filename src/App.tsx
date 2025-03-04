import "./assets/styles/styles.scss";
import Campaign from "./pages/Campaign/Campaign";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home";
import { MockProvider } from "./lib/contexts/mock-context";

function App() {
  return (
    <MockProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="campaign/:campaignId" element={<Campaign />}></Route>
          <Route path="campaign" element={<Campaign />}></Route>
        </Routes>
      </BrowserRouter>
    </MockProvider>
  );
}

export default App;
