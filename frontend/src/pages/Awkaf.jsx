import '../CSS/Awkaf.css'
import { Header } from '../Components/Header'
import Project from '../Components/Project'
import WakfPic  from '../Components/WakfPic'
export default function Awkaf(){
    return(
        <>
          <Header></Header>
          <WakfPic></WakfPic> 
        
        <div className="container">
        <Project></Project>
        <Project></Project>
        <Project></Project>
        </div>
        <div className="line-yellow-cont">
        <div className="line-yellow"></div>
        </div>
        
        
        </>
    )
}