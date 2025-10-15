import BacEffect from './CircleEffect.jsx';
import Weclome from './WelcomePart.jsx';



import "./Home.css" 

function Home() {


  return (

    <div dir='rtl' className="App my-0 mx-auto ">

      

        <Weclome 
          
          isRTL={true}
          title={('welcome')} 
          detail={('welcome')}
        />
      
          <div className="w-full h-[11px] top-[997px] bg-green-500"></div>
          
          <BacEffect />

          <div className="w-full h-[11px] top-[997px] bg-green-500"></div>

      

    </div>
  );
}

export default Home;