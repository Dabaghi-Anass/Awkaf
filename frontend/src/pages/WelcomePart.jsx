import { Link } from 'react-router-dom';
import './Home.css'


function Welcome() {
    return (
        <>
            <div className="w-full mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-10 md:py-12 lg:py-16 mt-12 md:mt-14">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col-reverse lg:flex-row-reverse items-center gap-6 sm:gap-8 md:gap-10 lg:gap-12">
                        {/* Text Content */}
                        <div className="w-full lg:flex-1 text-right">
                            <div className="space-y-4 md:space-y-6">
                                <h1 className="font-bold text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl leading-tight text-green-800">
                                    المنصة الموثوقة والمخصصة لمساعدة الشركات في حساب زكاتها المستحقة بسهولة ودقة.
                                </h1>
                                
                                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed">
                                    نهدف إلى تسهيل عملية احتساب الزكاة للشركات وفقًا لأحكام الشريعة الإسلامية، وذلك لدعم التكافل الاجتماعي والمساهمة في التنمية المستدامة للمجتمع.
                                </p>

                                {/* CTA Button */}
                                <div className="pt-2 md:pt-4">
                                    <button className="w-full sm:w-auto px-6 sm:px-8 py-3 md:py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg text-sm md:text-base">
                                       <Link to="/zakatCalculator"> ابدأ الآن</Link>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Image Container */}
                        <div className="w-full lg:w-1/2 flex-shrink-0">
                            {/* Mobile: Full-width background image */}
                            <div className="lg:hidden h-64 sm:h-80 rounded-lg overflow-hidden shadow-lg">
                                <div
                                    className="w-full h-full bg-cover bg-center"
                                    style={{
                                        backgroundImage: "url(/images/building.jpg)"
                                    }}
                                />
                            </div>

                            {/* Desktop: Blob shape */}
                            <div className="hidden lg:block">
                                <svg
                                    className="w-full h-auto drop-shadow-lg"
                                    viewBox="0 0 376 383"
                                    xmlns="http://www.w3.org/2000/svg"
                                    preserveAspectRatio="xMidYMid meet"
                                >
                                    <defs>
                                        <clipPath id="blobClip">
                                            <path 
                                                d="M202.092 2.60579C258.253 -0.883556 325.386 -4.7951 360.107 41.983C393.916 87.5338 364.112 151.838 355.262 208.969C348.529 252.433 346.063 298.862 315.651 328.975C285.953 358.382 242.379 354.544 202.092 360.638C150.054 368.508 93.3795 401.348 50.5996 369.063C5.65766 335.147 -0.96659 267.288 1.11779 208.969C3.11813 153.001 23.6163 99.558 61.6269 60.5282C99.0998 22.0505 149.934 5.84651 202.092 2.60579Z" 
                                            />
                                        </clipPath>
                                    </defs>
                                    
                                    <image
                                        href="/images/building.jpg"
                                        width="376"
                                        height="383"
                                        preserveAspectRatio="xMidYMid slice"
                                        clipPath="url(#blobClip)"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Welcome;

{/* */}