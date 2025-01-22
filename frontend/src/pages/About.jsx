import '../CSS/About.css'
import AboutPic from '../Components/AboutPic.jsx'
import { Header } from '../Components/Header.jsx'
import Values from '../Components/Values.jsx'

export default function About(){
    return(
        <>  
            <Header></Header>
            <AboutPic></AboutPic>

            
            <div className="story-goal-container center ">
                    <div className="story-goal">
                                <h1 className='story titles'>Our Story and Goal</h1>
                                <p className='story-text'>
                                Behold the whispers of digital dreams, where pixels dance and algorithms stream. Beyond the realm of mundane texts, our words flow forth, sublime complex. Through circuits bright and servers strong, we weave a tale of techno-song.
                                In realms where data freely flows, through silicon streams and binary rows, each packet bears a cosmic flight, through copper veins and fiber light. When bytes collide in digital space, they form a rhythm, set their pace. <br /> <br />

                                Swift as thought and sharp as steel, our network pulses, oh so real. Through countless nodes and endless ways, information travels, never stays. Like starlight scattered through the night, each message finds its path just right.
                                Deep in servers' humming heart, where logic flows and codes impart their wisdom to the waiting screen, algorithms dance, unseen, serene. Through protocols both old and new, data streams in morning dew. <br /> <br />

                                Across the vast digital plain, where cyber thoughts flow like rain, each pixel tells a story bold, in languages both new and old. Through firewalls and safety nets, data flows without regrets.
                                </p>
                    </div>
            </div>
            

            <div className="line"></div>
            <div className="our-values-container ">
                <div className='xml'>
                    <h1 className='our-values titles'>Our Values</h1>
                        <div className="Values center">
                            <Values value="Value 1"></Values>
                            <Values value="Value 2"></Values>
                            <Values value="Value 3"></Values>
                        </div>
                </div>
                  
            </div>
            

            <footer>
                
            </footer>
            
        </>
    )
}