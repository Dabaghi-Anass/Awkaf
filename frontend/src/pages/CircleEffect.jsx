import { useEffect, useRef } from 'react';
import {Link} from 'react-router-dom';
import { createNoise2D } from 'simplex-noise';
import './Background.css';

function BacEffect ({
  fadeInDuration = 300,
  fadeOutDuration = 500,
  circleSpeed = 2,
  movementType = 'random',
  title = "Default Title",
  detailText = "Default explanation text",
  isRTL = false
}) {
  
  const canvasRef = useRef(null);
  const circlePropsRef = useRef(null);
  const simplexRef = useRef(null);
  const animationFrameRef = useRef(null);

  const circleCount = 25;
  const circlePropCount = 8;
  const circlePropsLength = circleCount * circlePropCount;
  const baseSpeed = 0.1 * circleSpeed;
  const rangeSpeed = 0.3 * circleSpeed;
  const baseTTL = 1200;
  const rangeTTL = 400;
  const baseRadius = 200;
  const rangeRadius = 500;
  const backgroundColor = '#4ade80';

  const colors = [
    'hsla(146, 64%, 36%, 1)',     // deep green
    'hsla(142, 76%, 50%, 0.8)',   // medium green
    'hsla(134, 45%, 85%, 0.3)',   // very light green tint
    'hsla(100, 100%, 90%, 0.15)', // soft green mist
    'hsla(0, 0%, 100%, 0.5)',     // semi-transparent white
    'hsla(0, 0%, 100%, 0.9)',     // solid white
  ];
  
  
  

  const fadeInOut = (life, ttl) => {
    const fadeInTime = fadeInDuration / ttl; // Normalize fade-in
    const fadeOutTime = fadeOutDuration / ttl; // Normalize fade-out
    const normalizedLife = life / ttl;

    if (normalizedLife < fadeInTime) {
      return normalizedLife / fadeInTime; // Fade in
    }
    if (normalizedLife > 1 - fadeOutTime) {
      return (1 - normalizedLife) / fadeOutTime; // Fade out
    }
    return 1; // Fully visible
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    function rand(max) {
      return Math.random() * max;
    }

    function initCircles() {
      circlePropsRef.current = new Float32Array(circlePropsLength);
      simplexRef.current = createNoise2D();

      for (let i = 0; i < circlePropsLength; i += circlePropCount) {
        initCircle(i);
      }
    }

    function initCircle(i) {
      const x = rand(canvas.width);
      const y = rand(canvas.height);
      const t = rand(Math.PI * 2);
      const speed = baseSpeed + rand(rangeSpeed);
      const vx = speed * Math.cos(t);
      const vy = speed * Math.sin(t);
      const life = 0;
      const ttl = baseTTL + rand(rangeTTL);
      const radius = baseRadius + rand(rangeRadius);
      const colorIndex = Math.floor(rand(colors.length));

      circlePropsRef.current.set([x, y, vx, vy, life, ttl, radius, colorIndex], i);
    }

    function updateCircles() {
      for (let i = 0; i < circlePropsLength; i += circlePropCount) {
        updateCircle(i);
      }
    }

    function updateCircle(i) {
      const props = circlePropsRef.current;
      const x = props[i];
      const y = props[i + 1];
      const vx = props[i + 2];
      const vy = props[i + 3];
      let life = props[i + 4];
      const ttl = props[i + 5];
      const radius = props[i + 6];
      const colorIndex = props[i + 7];

      drawCircle(x, y, life, ttl, radius, colorIndex);

      life++;

      if (movementType === 'random') {
        props[i] = x + vx * circleSpeed;
        props[i + 1] = y + vy * circleSpeed;
      } else if (movementType === 'circular') {
        const angle = Math.atan2(y - canvas.height / 2, x - canvas.width / 2);
        const speedFactor = circleSpeed * 0.05;
        props[i] = canvas.width / 2 + Math.cos(angle + speedFactor) * 150;
        props[i + 1] = canvas.height / 2 + Math.sin(angle + speedFactor) * 150;
      }

      props[i + 4] = life;

      // Fade out and linger before resetting
      if (life > ttl + fadeOutDuration / 16) {
        initCircle(i);
      }
    }

    function drawCircle(x, y, life, ttl, radius, colorIndex) {
      ctx.save();
      const opacity = fadeInOut(life, ttl);
      const color = colors[colorIndex];
      ctx.fillStyle = color.replace('1)', `${opacity})`);
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.closePath();
      ctx.restore();
    }

    function resize() {
      const { innerWidth, innerHeight } = window;
      canvas.width = innerWidth;
      canvas.height = innerHeight;
    }

    function render() {
      ctx.drawImage(canvas, 0, 0);
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      updateCircles();
      render();
      animationFrameRef.current = requestAnimationFrame(draw);
    }

    function setup() {
      resize();
      initCircles();
      draw();
    }

    window.addEventListener('resize', resize);
    setup();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [movementType, circleSpeed, fadeInDuration, fadeOutDuration, colors]);

  return (
    <>
      <div dir='rtl' className="canvas-container relative h-fit pt-36 pb-60">
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full z-[-1]" 
        />
        
        <div className="flex min-h-screen relative z-10 max-w-[80rem] my-0 mx-auto p-4 ">  
          <div className="Main-container center-padding flex flex-col gap-28">
            
            <div className="pic1  rounded-lg py-5 h-[40em] ">
              <div className='pic1-text mt-1 w-4/5 mx-auto  rounded-lg'>
              <h1 className="font-bold text-green-300 text-3xl text-center mb-10">الزكاة: التزام ديني ودعم للتكافل الاجتماعي</h1>
              <p className=" text-white text-md leading-10 text-center mb-10  ">
                  على هذا الموقع، يمكن للشركات حساب قيمة الزكاة الواجبة عليها وفقًا للشريعة الإسلامية. وكما جاء في القرآن الكريم، فإن أداء الزكاة يعتبر من أركان الإسلام الأساسية، إذ يقول الله تعالى: "خُذْ مِنْ أَمْوَالِهِمْ صَدَقَةً تُطَهِّرُهُمْ وَتُزَكِّيهِمْ بِهَا" (سورة التوبة، الآية 103). ويقول تعالى أيضًا: "وَأَقِيمُوا الصَّلَاةَ وَآتُوا الزَّكَاةَ" (سورة البقرة، الآية 43).

                  كل الشركات ملزمة شرعاً بأداء الزكاة المستحقة على أموالها لدعم الفقراء والمحتاجين، وذلك تأكيدًا للتضامن والعدالة الاجتماعية التي يدعو إليها الإسلام. ووفقًا لأحكام الشريعة، يتم حساب نسبة الزكاة على أساس موجودات الشركات وأرباحها السنوية.

                  ستُستخدم أموال الزكاة التي تجمع من هذه الشركات كمساهمة في إنشاء أوقاف (WAKF) للمنافع العامة، وهي عبارة عن مشاريع استثمارية تدرّ عوائد مالية تُستخدم لخدمة المجتمع. هذا الوقف يتم إدارته من قبل جمعية يرأسها الدكتور عويدات، المختص في المالية الإسلامية وإدارة الأوقاف، لضمان استثمار هذه الأموال في مشاريع تعود بالنفع على الجميع وتحقق مبدأ التكافل الاجتماعي.
                            بتقديم الزكاة، تساهم الشركات في دعم استدامة المجتمع وبناء قاعدة اقتصادية متينة تساعد في تحقيق التنمية والعدالة الاجتماعية.
                  

              </p>
              <Link to="/About" className='mt-10 bg-green-400 hover:bg-green-500 text-white  py-4 px-8 text-[1em] rounded-3xl'>اعرف المزيد</Link>
              </div>
              
            </div>

          <div className='flex flex-col gap-10'>
          

          <div className="flex flex-row-reverse bg-green-950 rounded-3xl mix-blend-plus-darker overflow-hidden h-[30rem] p-4 gap-10">
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-4 text-green-300 text-right">
              نحو مجتمع أكثر تماسكًا: دور الشركات في دعم الفئات الأقل حظًا وتحقيق الأثر الإيجابي
              </h2>
              <p className="text-white text-right leading-relaxed mb-10">
              تُعَدُّ هذه المبادرة خطوةً هامة تُحقّق العديد من الفوائد للمجتمع، من خلال تعزيز التضامن الاجتماعي وتلبية احتياجات الفئات الأقل حظًا. بالإضافة إلى ذلك، فإن لها تأثيرًا إيجابيًا مباشرًا على صورة الشركات المشاركة.

ومن خلال وضع علامة اعتماد لهذه الشركات، نوفر رمزًا يعكس التزامها بالمسؤولية الاجتماعية. كما نخطط لإنشاء مقاطع فيديو تُظهر التغيرات الإيجابية والمشاريع التي تم تمويلها بفضل هذه التبرعات، مما يُبرز الأثر الواقعي لهذه المساهمات.

وبذلك، يمكن للشركات تعزيز سياساتها في مجال المسؤولية الاجتماعية (CSR)، وإظهار اهتمامها الحقيقي بالمجتمع. علاوة على ذلك، يمكن لهذه الشركات الاستفادة من ميزة خصم هذه التبرعات من الضرائب، مما يشجعها أكثر على المشاركة الفعالة في هذا العمل النبيل.  </p>
              <Link to="/Awkaf"  className='mt-10 bg-green-400 hover:bg-green-500 text-white  py-4 px-8 text-[1em] rounded-3xl'>اعرف المزيد</Link >
            </div>

             
              <div className="w-3/7">
                <img
                  src="src\assets\images\ZkatPics\water.jpg"
                  alt="Card Image"
                  className="h-full w-full object-cover rounded-2xl"
                />
              </div>
          
          </div>
          <div className="flex flex-row mx-auto bg-green-950 mix-blend-plus-darker rounded-3xl overflow-hidden h-[30rem]  p-4 gap-10 mb-15">
            <div className="flex-1  ">
              <h2 className="text-2xl font-bold mb-4 text-green-300 text-right">
              سهولة ودقة في حساب زكاة الشركات وفق الشريعة الإسلامية
              </h2>
              <p className="text-white text-right leading-relaxed mb-10">
              يعمل هذا الموقع بطريقة بسيطة وفعالة لمساعدة الشركات في حساب الزكاة المستحقة عليها وفقاً للمعايير الشرعية.  أولاً، يتعين على المستخدم تعريف نوع شركته واختيار القطاع الذي تنتمي إليه. ثم سيُطلب منه الإجابة على بعض الأسئلة المتعلقة بالشركة ووضعها المالي، مثل قيمة الأصول، حجم الإيرادات السنوية، وقيمة رأس المال العامل، وغيرها من المعلومات المالية المهمة.  استنادًا إلى هذه المعلومات المدخلة، سيقوم الموقع بتحديد الصيغة المناسبة لحساب الزكاة وفقًا لنوع الشركة ومعايير الشريعة الإسلامية. يقوم الموقع تلقائيًا بحساب المبلغ المستحق من الزكاة بناءً على البيانات المقدمة من المستخدم، ليتمكن المستخدم من معرفة المبلغ الواجب دفعه.  هذه العملية تسهل على الشركات الامتثال لأحكام الزكاة وتساعدها على أداء واجباتها الدينية بسهولة ودقة، مع ضمان توجيه الأموال إلى مستحقيها وفقاً لأحكام الشريعة الإسلامية.
              </p>
              <Link to="/ZakatCalculator" className='mt-10 bg-green-400 hover:bg-green-500 text-white  py-4 px-8 text-[1em] rounded-3xl'>ابدأ الآن</Link>
            </div>

             
              <div className="w-3/7">
                <img
                  src="src\assets\images\ZkatPics\company.jpg"
                  alt="Card Image"
                  className="h-full rounded-2xl w-full object-cover"
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