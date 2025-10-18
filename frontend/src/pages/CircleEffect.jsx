import {Link} from 'react-router-dom';
import './Aurora.css';

function BacEffect () {

  return (
    <>
      <div dir='rtl' className="relative min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900 overflow-hidden">
        {/* Unique Aurora Effect */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-1/4 w-80 h-80 bg-emerald-400 rounded-full mix-blend-screen filter blur-2xl animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-teal-300 rounded-full mix-blend-screen filter blur-3xl animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-cyan-400 rounded-full mix-blend-screen filter blur-2xl animate-pulse animation-delay-4000"></div>
          <div className="absolute top-2/3 right-1/3 w-64 h-64 bg-emerald-300 rounded-full mix-blend-screen filter blur-xl animate-pulse animation-delay-6000"></div>
        </div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">  
          <div className="flex flex-col gap-16 lg:gap-28">
            
            <div className="bg-black/40 backdrop-blur-md rounded-3xl p-6 lg:p-8 border border-emerald-500/20">
              <div className='text-center max-w-4xl mx-auto'>
              <h1 className="font-bold text-green3  text-sm sm:text-3xl lg:text-4xl mb-8">الزكاة: التزام ديني ودعم للتكافل الاجتماعي</h1>
              <p className="text-white/90 text-center text-xs sm:text-base lg:text-lg leading-[2.1em] mb-8  ">
                  على هذا الموقع، يمكن للشركات حساب قيمة الزكاة الواجبة عليها وفقًا للشريعة الإسلامية. وكما جاء في القرآن الكريم، فإن أداء الزكاة يعتبر من أركان الإسلام الأساسية، إذ يقول الله تعالى: "خُذْ مِنْ أَمْوَالِهِمْ صَدَقَةً تُطَهِّرُهُمْ وَتُزَكِّيهِمْ بِهَا" (سورة التوبة، الآية 103). ويقول تعالى أيضًا: "وَأَقِيمُوا الصَّلَاةَ وَآتُوا الزَّكَاةَ" (سورة البقرة، الآية 43).

                  كل الشركات ملزمة شرعاً بأداء الزكاة المستحقة على أموالها لدعم الفقراء والمحتاجين، وذلك تأكيدًا للتضامن والعدالة الاجتماعية التي يدعو إليها الإسلام. ووفقًا لأحكام الشريعة، يتم حساب نسبة الزكاة على أساس موجودات الشركات وأرباحها السنوية.

                  ستُستخدم أموال الزكاة التي تجمع من هذه الشركات كمساهمة في إنشاء أوقاف (WAKF) للمنافع العامة، وهي عبارة عن مشاريع استثمارية تدرّ عوائد مالية تُستخدم لخدمة المجتمع.
                  

              </p>
              <Link to="/About" className='inline-block bg-emerald-500/30 hover:bg-emerald-400/40 backdrop-blur-sm text-white py-3 px-6 lg:py-4 lg:px-8 text-sm lg:text-base rounded-full transition-all duration-300 border border-emerald-400/50 shadow-lg shadow-emerald-500/25'>اعرف المزيد</Link>
              </div>
            </div>

          <div className='flex flex-col gap-8 lg:gap-16'>
          

          <div className="flex flex-col lg:flex-row-reverse bg-black/40 backdrop-blur-md rounded-3xl overflow-hidden p-4 lg:p-6 gap-6 lg:gap-10 border border-emerald-500/20">
            <div className="flex-1">
              <h2 className="text-sm lg:text-2xl font-bold mb-4 text-green3 text-right leading-[2.1em]">
              نحو مجتمع أكثر تماسكًا: دور الشركات في دعم الفئات الأقل حظًا وتحقيق الأثر الإيجابي
              </h2>
              <p className="text-white/90 text-sm lg:text-base text-right leading-[2.1em] mb-6 lg:mb-10 ">
              تُعَدُّ هذه المبادرة خطوةً هامة تُحقّق العديد من الفوائد للمجتمع، من خلال تعزيز التضامن الاجتماعي وتلبية احتياجات الفئات الأقل حظًا. بالإضافة إلى ذلك، فإن لها تأثيرًا إيجابيًا مباشرًا على صورة الشركات المشاركة.

ومن خلال وضع علامة اعتماد لهذه الشركات، نوفر رمزًا يعكس التزامها بالمسؤولية الاجتماعية. كما نخطط لإنشاء مقاطع فيديو تُظهر التغيرات الإيجابية والمشاريع التي تم تمويلها بفضل هذه التبرعات، مما يُبرز الأثر الواقعي لهذه المساهمات.

وبذلك، يمكن للشركات تعزيز سياساتها في مجال المسؤولية الاجتماعية (CSR)، وإظهار اهتمامها الحقيقي بالمجتمع. علاوة على ذلك، يمكن لهذه الشركات الاستفادة من ميزة خصم هذه التبرعات من الضرائب، مما يشجعها أكثر على المشاركة الفعالة في هذا العمل النبيل.  </p>
              <Link to="/Awkaf"  className='inline-block bg-emerald-500/30 hover:bg-emerald-400/40 backdrop-blur-sm text-white py-3 px-6 lg:py-4 lg:px-8 text-sm lg:text-base rounded-full transition-all duration-300 border border-emerald-400/50 shadow-lg shadow-emerald-500/25'>اعرف المزيد</Link >
            </div>

             
              <div className="w-full lg:w-2/5 h-48 lg:h-auto">
                <img
                  src="src/assets/images/ZkatPics/water.jpg"
                  alt="Card Image"
                  className="h-full w-full object-cover rounded-xl"
                />
              </div>
          
          </div>
          <div className="flex flex-col lg:flex-row bg-black/40 backdrop-blur-md rounded-3xl overflow-hidden p-4 lg:p-6 gap-6 lg:gap-10 border border-emerald-500/20">
            <div className="flex-1 order-2 lg:order-1">
              <h2 className="text-lg lg:text-2xl font-bold mb-4 text-green3 text-right">
              سهولة ودقة في حساب زكاة الشركات وفق الشريعة الإسلامية
              </h2>
              <p className="text-white/90 text-sm lg:text-base text-right leading-[2.1em] mb-6 lg:mb-10">
              يعمل هذا الموقع بطريقة بسيطة وفعالة لمساعدة الشركات في حساب الزكاة المستحقة عليها وفقاً للمعايير الشرعية.  أولاً، يتعين على المستخدم تعريف نوع شركته واختيار القطاع الذي تنتمي إليه. ثم سيُطلب منه الإجابة على بعض الأسئلة المتعلقة بالشركة ووضعها المالي، مثل قيمة الأصول، حجم الإيرادات السنوية، وقيمة رأس المال العامل، وغيرها من المعلومات المالية المهمة.  استنادًا إلى هذه المعلومات المدخلة، سيقوم الموقع بتحديد الصيغة المناسبة لحساب الزكاة وفقًا لنوع الشركة ومعايير الشريعة الإسلامية. يقوم الموقع تلقائيًا بحساب المبلغ المستحق من الزكاة بناءً على البيانات المقدمة من المستخدم، ليتمكن المستخدم من معرفة المبلغ الواجب دفعه.  هذه العملية تسهل على الشركات الامتثال لأحكام الزكاة وتساعدها على أداء واجباتها الدينية بسهولة ودقة، مع ضمان توجيه الأموال إلى مستحقيها وفقاً لأحكام الشريعة الإسلامية.
              </p>
              <Link to="/ZakatCalculator" className='inline-block bg-emerald-500/30 hover:bg-emerald-400/40 backdrop-blur-sm text-white py-3 px-6 lg:py-4 lg:px-8 text-sm lg:text-base rounded-full transition-all duration-300 border border-emerald-400/50 shadow-lg shadow-emerald-500/25'>ابدأ الآن</Link>
            </div>

             
              <div className="w-full lg:w-2/5 h-48 lg:h-auto order-1 lg:order-2">
                <img
                  src="src/assets/images/ZkatPics/company.jpg"
                  alt="Card Image"
                  className="h-full rounded-xl w-full object-cover"
                />
              </div>
          
          </div>
        </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default BacEffect;