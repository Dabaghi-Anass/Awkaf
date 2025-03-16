import BacEffect from './CircleEffect.jsx';
import Weclome from './WelcomePart.jsx';
import { Header } from "../Components/Header";
import Footer from "../Components/Footer";


import "./Home.css" 

function Home() {


  return (

    <div className="App my-0 mx-auto ">

        <Header />

        <Weclome 
          
          isRTL={true}
          title={('welcome')} 
          detail={('welcome')}
        />
      
          <div className="w-full h-[11px] top-[997px] bg-[#F2CB05]"></div>
          
          <BacEffect />

          <div className="w-full h-[11px] top-[997px] bg-[#F2CB05]"></div>

        <Footer />


    </div>
  );
}

export default Home;