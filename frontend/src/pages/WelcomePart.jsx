import './Home.css'

function Welcome() {
    return (
        <>
            <div className="flex flex-row justify-between items-center flex-grow flex-shrink w-full center-padding max-w-[80rem] center-zoom  mx-auto p-4 my-28">
                <div className="flex flex-col z-10 flex-shrink w-1/2 relative">
                    <svg
                        width="500"
                        height="500"
                        viewBox="0 0 376 383"
                        xmlns="http://www.w3.org/2000/svg"
                        className="relative z-10"
                    >
                        <defs>
                            <clipPath id="blobClip">
                                <path 
                                    d="M202.092 2.60579C258.253 -0.883556 325.386 -4.7951 360.107 41.983C393.916 87.5338 364.112 151.838 355.262 208.969C348.529 252.433 346.063 298.862 315.651 328.975C285.953 358.382 242.379 354.544 202.092 360.638C150.054 368.508 93.3795 401.348 50.5996 369.063C5.65766 335.147 -0.96659 267.288 1.11779 208.969C3.11813 153.001 23.6163 99.558 61.6269 60.5282C99.0998 22.0505 149.934 5.84651 202.092 2.60579Z" 
                                />
                            </clipPath>
                        </defs>
                        
                        <image
                            href="https://res.cloudinary.com/dbqf0wq9s/image/upload/v1721743014/k8ad75fp3jgy9e235fmr.jpg"
                            width="376"
                            height="383"
                            preserveAspectRatio="xMidYMid slice"
                            clipPath="url(#blobClip)"
                        />
                    </svg>
                </div>

                <div className="text-right ">
                    <div className="font-bold text-primary mb-4 text-right text-4xl text-green-800">
                        <h1>المنصة الموثوقة والمخصصة لمساعدة الشركات في حساب زكاتها المستحقة بسهولة ودقة.</h1>                    
                    </div>
                    <div className="font-normal text-gray-800 leading-relaxed text-right text-2xl pt-10">
                        <p>نهدف إلى تسهيل عملية احتساب الزكاة للشركات وفقًا لأحكام الشريعة الإسلامية، وذلك لدعم التكافل الاجتماعي والمساهمة في التنمية المستدامة للمجتمع.</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Welcome;

