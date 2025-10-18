import BacEffect from "./CircleEffect.jsx";
import Weclome from "./WelcomePart.jsx";

import "./Home.css";

function Home() {
  return (
    <div dir="rtl" className="min-h-screen bg-gray-50">
      <div className="bg-white mt-15">
        <Weclome isRTL={true} title={"welcome"} detail={"welcome"} />
      </div>

      <BacEffect />
    </div>
  );
}

export default Home;
