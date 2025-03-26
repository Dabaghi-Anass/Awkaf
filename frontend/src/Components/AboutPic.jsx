import '../CSS/AboutPic.css';
import '../index.css';

export default function AboutPic() {
  return (
    <div className="big-pic flex items-center justify-center bg-green-900 text-white py-20">
      <div className="about text-center max-w-2xl">
        {/* Title */}
        <h1 className="text-4xl font-bold text-yellow-400 mb-4">عن الزكاة</h1>

        {/* Description */}
        <p className="about-text text-lg leading-relaxed">
          الزكاة هي أحد أركان الإسلام الخمسة، تهدف إلى تعزيز التكافل الاجتماعي وتحقيق العدالة الاقتصادية. 
          يتم استخدامها لدعم الفقراء والمحتاجين، ولها دور كبير في تنمية المجتمع وتقليل الفجوة بين الطبقات.
        </p>
      </div>
    </div>
  );
}
