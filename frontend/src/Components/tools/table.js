export const zakatForm = [
  {name:"1",label:"النقود وما في حكمها",children:[
    {name: 'x1', label: 'نقدية بالصندوق', children: []},
    {name: 'x2', label: 'نقدية لدى المصارف (جارية/تحت الطلب)', children: []},
    {name: 'x3', label: 'شيكات مصادق عليها', children: []},   
    {name: 'x4', label: 'العملات الأجنبية', children: []},
    {name: 'x5', label: 'أصول رقمية/نقود مشفّرة متاحة', children: []},
    {name: 'x6', label: 'ودائع أمانة/حسابات ثابتة يمكن التصرف فيها', children: []},
    {name: 'x7', label: 'قرض حسن مُقرض (حتى يُقبض)', children: []},
    {name: 'x8', label: 'إيرادات مستحقة غير مقبوضة', children: []},
    {name: 'x9', label: 'نقود من بيع أصول غير زكوية', children: []},
  ]},

  {name: '2', label: 'الذمم المدينة (الديون المرجوّة)',children:[
    {name: 'y1', label: 'ديون حالّة مرجوّة على العملاء', children: []},
    {name: 'y2', label: 'ديون مؤجّلة مرجوّة', children: []},
    {name: 'y3', label: 'أوراق قبض', children: []},
    {name: 'y4', label: 'ديون لي مرجوّة (قرض حسن/بيع احتكاري)', children: []},
    {name: 'y5', label: 'ديون عن بيع أصول غير زكوية/غير تجارية', children: []},
    {name: 'y6', label: 'إيرادات إيجار/كراء حل أجلها', children: []},
    {name: 'y7', label: 'ديون مشكوك فيها/ميؤوس منها', children: []},
  ]},

  {name: '3', label: 'الاستثمارات الزكوية',children:[
    {name: 'z1', label: 'أسهم/صكوك/حصص للتجارة', children: []},
    {name: 'z2', label: 'حصص عقارية للتجارة', children: []},
    {name: 'z3', label: 'استثمارات سندات/أذون خزينة', children: []},
    {name: 'z4', label: 'أسهم بنية العائد (احتفاظ)', children: []},
  ]},

  {name: '4', label: 'عروض التجارة والمخزون',children:[
    {name: 'a1', label: 'بضاعة تامة الصنع', children: []},
    {name: 'a2', label: 'بضاعة تحت التشغيل', children: []},
    {name: 'a3', label: 'مواد أولية', children: []},
    {name: 'a4', label: 'بضاعة في الطريق', children: []},
    {name: 'a5', label: 'بضاعة أمانة لدى الغير', children: []},
    {name: 'a6', label: 'قطع غيار بقصد المتاجرة', children: []},
    {name: 'a7', label: 'عروض تجارة بهبة/إرث', children: []},
    {name: 'a8', label: 'عقارات محتكرة للتجارة', children: []},
    {name: 'a9', label: 'بضاعة كاسدة/غير معدّة للبيع', children: []},
  ]},

  

  {name: '6', label: 'الالتزامات واجبة الخصم',children:[
    {name: 'c1', label: 'قروض قصيرة الأجل مستحقة خلال الحول', children: []},
    {name: 'c2', label: 'أوراق دفع/دائنون', children: []},
    {name: 'c3', label: 'حقوق موظفين (أجور/إجازات)', children: []},
    {name: 'c4', label: 'ضرائب مستحقة خلال الحول', children: []},
    {name: 'c5', label: 'أرباح مضاربة للغير', children: []},
    {name: 'c6', label: 'تأمينات العملاء للرد', children: []},
    {name: 'c7', label: 'احتياطيات عامة/مخصصات تقديرية', children: []},
  ]},

  {name:"malikiAssets",label:"الذمات المالية",children:[
    {name:"SPA",label:"ذمة المالية للشركة"},
    {name:"SARL",label:"ذمة المالية للشخص المعني"},
    {name:"limit",label:"حد المفلس"}
  ]},
  /*{name: '5', label: 'البنود الزكوية الخاصة',children:[ {name: 'b1', label: 'للتجارة', 
  children: Array(0)}, {name: 'b2', label: 'المحتكرة', children: Array(0)},
   {name: 'b3', label: 'عروض كاسدة مخزنة', children: Array(0)}, {name: 'b4', label: 'محصل عليها بهبة أو إرث', children: Array(0)}, ]}, */
];
