import '../CSS/Values.css'


export default function Values(props){
    return(
        <>
            <div className="container-values">
                <div className="value-pic"  ></div>
                <h2 className='value-num'>{props.value}</h2>
                <div className='test'>
                <p className="value-text">
                Swift as thought and sharp as steel, our network pulses, oh so real. Through countless nodes and endless ways, information travels, never stays. Like starlight scattered through the night, each message finds its path just right.
                Deep in servers' humming heart, where logic flows and codes impart their wisdom to the waiting screen, algorithms dance, unseen, serene. Through protocols both old and new, data streams in morning dew.
                </p>
                </div>
                
            </div>
        </>
    )
}