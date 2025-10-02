

export default function Values({ value, description, image }) {
  return (
    <div className=" bg-green-100 p-6 rounded-lg shadow-md text-center">
      {/* Image Section */}
      {image && (
        <div
          className="value-pic w-24 h-24 bg-cover bg-center mx-auto rounded-full"
          style={{ backgroundImage: `url(${image})` }}
        ></div>
      )}
      
      {/* Value Title */}
      <h2 className="value-num text-xl font-bold text-green-900 mt-4">{value}</h2>
      
      {/* Description */}
      <p className="value-text text-gray-700 mt-2 leading-relaxed">
        {description || "الزكاة تعزز العدالة الاجتماعية وتساهم في دعم المحتاجين وتحقيق التوازن الاقتصادي في المجتمع."}
      </p>
    </div>
  );
}
