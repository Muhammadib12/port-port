import { useEffect } from "react";
import PremiumPortfolio from "./components/PremiumPortfolio.jsx";

const API_BASE = "https://backtoport.onrender.com";

function App() {
  useEffect(() => {
    const url = new URL("/api/track", API_BASE);
    url.searchParams.set(
      "path",
      window.location.pathname + window.location.search,
    );
    url.searchParams.set("ref", document.referrer || "-");
    url.searchParams.set("ua", navigator.userAgent || "-");

    // طلب خفيف؛ keepalive حتى لو أغلق المستخدم التبويب بسرعة
    fetch(url.toString(), {
      method: "GET",
      mode: "no-cors",
      keepalive: true,
      cache: "no-store",
    }).catch(() => {});
  }, []);

  return <PremiumPortfolio />;
}

export default App;
