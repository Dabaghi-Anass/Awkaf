import '../CSS/Awkaf.css'
import Project from '../Components/Project'
import WakfPic  from '../Components/WakfPic'
export default function Awkaf(){
    return(
        <>
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