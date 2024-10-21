import AppRoutes from "./Routes";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    AOS.init({
      delay: 0, // values from 0 to 3000, with step 50ms
      duration: 400, // values from 0 to 3000, with step 50ms
      easing: "ease", // default easing for AOS animations
      once: false,
    });
    AOS.refresh();
  }, []);

  return (
    <div>
      <AppRoutes />
    </div>
  );
};

export default App;
