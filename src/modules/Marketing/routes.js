import { Routes, Route } from "react-router-dom";
import Main from ".";
import FacebookAds from "./pages/FacebookAds";
import GoogleAds from "./pages/GoogleAds";
import TiktokAds from "./pages/TiktokAds";
import LayoutMarketing from "./components/Layout";
import NotFoundPage from "../../pages/NotFoundPage";

function MarketingRoutes() {
  return (
    <Routes>
      <Route
        index
        element={
          <LayoutMarketing>
            <Main />
          </LayoutMarketing>
        }
      />
      <Route
        path="/googleads"
        element={
          <LayoutMarketing>
            <GoogleAds />
          </LayoutMarketing>
        }
      />
      <Route
        path="/tiktokads"
        element={
          <LayoutMarketing>
            <TiktokAds />
          </LayoutMarketing>
        }
      />
      <Route
        path="/facebookads"
        element={
          <LayoutMarketing>
            <FacebookAds />
          </LayoutMarketing>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default MarketingRoutes;
