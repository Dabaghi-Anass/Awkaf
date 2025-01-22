import '../CSS/project.css'

export default function  Project ({picUrl,title,text}){
    return(
       <div className="project-container">
                <div className="project-pic" styles={{backgroundImage: `url(${picUrl})`}}></div>
                <div className="project-text">
                     <h1>{title}قطاع المشروع</h1>
                     <p> {text}الطلب في الأسواق: يرغب الكثير من أصحاب المنازل الحاليين والمستقبليين في امتلاك هذه التقنيات في منازلهم نظرًا لتأثير وسائل التواصل الاجتماعي، وأصبحت هذه التقنيات معيارًا في العديد من المنازل الجديدة في أوروبا وأمريكا الشمالية. إن القدرة على توفيرها بتكلفة منخفضة سيزيد من الطلب عليها، بالإضافة إلى أن القدرة على توفير فواتير الكهرباء والمياه بفضل نظام المراقبة ستجذب اهتمام معظم الناس. 4o</p>
                </div>
                <div className="join-button-container">
                    <button className="join-button">تعرف أكثر</button>
                </div>
       </div>
    )

}