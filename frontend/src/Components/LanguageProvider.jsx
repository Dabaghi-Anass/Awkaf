// translations.js - Create this file for all translations
export const translations = {
  ar: {
    // Form labels
    forms: {
      "1": {
        label: "النقود وما في حكمها",
        fields: {
          x1: "نقدية بالصندوق",
          x2: "نقدية لدى المصارف (جارية/تحت الطلب)",
          x3: "شيكات مصادق عليها",
          x4: "العملات الأجنبية",
          x5: "أصول رقمية/نقود مشفّرة متاحة",
          x6: "ودائع أمانة/حسابات ثابتة يمكن التصرف فيها",
          x7: "قرض حسن مُقرض (حتى يُقبض)",
          x8: "إيرادات مستحقة غير مقبوضة",
          x9: "نقود من بيع أصول غير زكوية"
        }
      },
      "2": {
        label: "الذمم المدينة (الديون المرجوّة)",
        fields: {
          y1: "ديون حالّة مرجوّة على العملاء",
          y2: "ديون مؤجّلة مرجوّة",
          y3: "أوراق قبض",
          y4: "ديون لي مرجوّة (قرض حسن/بيع احتكاري)",
          y5: "ديون عن بيع أصول غير زكوية/غير تجارية",
          y6: "إيرادات إيجار/كراء حل أجلها",
          y7: "ديون مشكوك فيها/ميؤوس منها"
        }
      },
      "3": {
        label: "الاستثمارات الزكوية",
        fields: {
          z1: "أسهم/صكوك/حصص للتجارة",
          z2: "حصص عقارية للتجارة",
          z3: "استثمارات سندات/أذون خزينة",
          z4: "أسهم بنية العائد (احتفاظ)"
        }
      },
      "4": {
        label: "عروض التجارة والمخزون",
        fields: {
          a1: "بضاعة تامة الصنع",
          a2: "بضاعة تحت التشغيل",
          a3: "مواد أولية",
          a4: "بضاعة في الطريق",
          a5: "بضاعة أمانة لدى الغير",
          a6: "قطع غيار بقصد المتاجرة",
          a7: "عروض تجارة بهبة/إرث",
          a8: "عقارات محتكرة للتجارة",
          a9: "بضاعة كاسدة/غير معدّة للبيع"
        }
      },
      "6": {
        label: "الالتزامات واجبة الخصم",
        fields: {
          c1: "قروض قصيرة الأجل مستحقة خلال الحول",
          c2: "أوراق دفع/دائنون",
          c3: "حقوق موظفين (أجور/إجازات)",
          c4: "ضرائب مستحقة خلال الحول",
          c5: "أرباح مضاربة للغير",
          c6: "تأمينات العملاء للرد",
          c7: "احتياطيات عامة/مخصصات تقديرية"
        }
      },
      malikiAssets: {
        label: "الذمات المالية",
        fields: {
          SPA: "ذمة المالية للشركة",
          SARL: "ذمة المالية للشخص المعني",
          limit: "حد المفلس"
        }
      }
    },
    // UI text
    ui: {
      title: "حاسبة الزكاة الاحترافية",
      subtitle: "احسب زكاة أموالك وفقاً للمعايير الشرعية المعتمدة",
      calculationMethod: "طريقة الحساب",
      companyType: "نوع الشركة",
      calculate: "احسب الزكاة",
      addField: "إضافة حقل آخر",
      removeField: "حذف هذا الحقل",
      additionalField: "حقل إضافي",
      total: "المجموع",
      enterAmount: "أدخل المبلغ",
      enterAdditionalAmount: "أدخل المبلغ الإضافي",
      assetsData: "بيانات الأصول والممتلكات",
      assetsDescription: "يرجى إدخال جميع الأصول والممتلكات الخاضعة للزكاة",
      importantInfo: "معلومة مهمة",
      warningText: "يُرجى التأكد من دقة البيانات المدخلة قبل الحساب. النصاب محسوب على أساس سعر الذهب المُدخل من قبلكم (85 غرام من الذهب عيار 24 قيراط). يُنصح بالاطلاع على الأسعار الحالية في السوق الجزائرية قبل الإدخال.",
      note: "ملاحظة:",
      noteText: "يمكنكم إضافة حقول إضافية لأي عنصر بالنقر على زر الإضافة (+) بجانب كل حقل.",
      show: "إظهار",
      hide: "إخفاء"
    },
    methods: {
      Maliki: "معادلة حساب زكاة الشركات مالكي",
      AAOIFI: "معادلة حساب زكاة الشركات AAOIFI",
      Alioua: "معادلة باسم عليوة",
      Net: "معادلة طريقة صافي الغنى"
    },
    goldPrice: {
    title: "تحديد سعر الذهب لحساب النصاب",
    inputLabel: "سعر الغرام الواحد من الذهب (24 قيراط) بالدينار الجزائري:",
    placeholder: "أدخل سعر الغرام",
    pricePerGram: "سعر الغرام",
    nissab: "النصاب",
    grams: "غرام",
    infoText: "يُرجى إدخال سعر الغرام الحالي للذهب عيار 24 قيراط في السوق الجزائرية لحساب النصاب بدقة"
  },
  
  zakatResult: {
    title: "تفاصيل الحساب",
    subtitle: "نتائج حساب الزكاة المفصلة",
    zakatAmount: "قيمة الزكاة (معنا)",
    zakatWithTax: "قيمة الزكاة بالضريبة IBS",
    nissabValue: "قيمة النصاب",
    zakatBase: "الوعاء الزكوي",
    date: "التاريخ",
    contactNotice: "إن أردت إخراج الزكاة دون ضريبة",
    contactUs: "تواصل معنا",
    save: "حفظ",
    print: "طباعة"
  }

  },
  fr: {
    // Form labels
    forms: {
      "1": {
        label: "Liquidités et équivalents",
        fields: {
          x1: "Espèces en caisse",
          x2: "Liquidités bancaires (courant/à vue)",
          x3: "Chèques certifiés",
          x4: "Devises étrangères",
          x5: "Actifs numériques/cryptomonnaies disponibles",
          x6: "Dépôts de garantie/comptes fixes accessibles",
          x7: "Prêt sans intérêt accordé (jusqu'à encaissement)",
          x8: "Revenus dus non encaissés",
          x9: "Liquidités de vente d'actifs non zakatable"
        }
      },
      "2": {
        label: "Créances recouvrables",
        fields: {
          y1: "Créances clients courantes recouvrables",
          y2: "Créances différées recouvrables",
          y3: "Effets à recevoir",
          y4: "Créances recouvrables (prêt sans intérêt/vente monopolistique)",
          y5: "Créances sur vente d'actifs non zakatable/non commerciaux",
          y6: "Revenus de location/loyer échus",
          y7: "Créances douteuses/irrécouvrables"
        }
      },
      "3": {
        label: "Investissements zakatable",
        fields: {
          z1: "Actions/Sukuk/parts commerciales",
          z2: "Parts immobilières commerciales",
          z3: "Investissements obligations/bons du Trésor",
          z4: "Actions d'infrastructure à rendement (détention)"
        }
      },
      "4": {
        label: "Marchandises et stocks",
        fields: {
          a1: "Marchandises finies",
          a2: "Marchandises en cours de fabrication",
          a3: "Matières premières",
          a4: "Marchandises en transit",
          a5: "Marchandises en dépôt chez des tiers",
          a6: "Pièces de rechange destinées au commerce",
          a7: "Marchandises commerciales par donation/héritage",
          a8: "Biens immobiliers détenus pour le commerce",
          a9: "Marchandises obsolètes/non destinées à la vente"
        }
      },
      "6": {
        label: "Passifs déductibles",
        fields: {
          c1: "Prêts à court terme dus pendant l'année",
          c2: "Effets à payer/créanciers",
          c3: "Droits des employés (salaires/congés)",
          c4: "Taxes dues pendant l'année",
          c5: "Bénéfices de mudaraba pour autrui",
          c6: "Garanties clients à rembourser",
          c7: "Réserves générales/provisions estimatives"
        }
      },
      malikiAssets: {
        label: "Responsabilités financières",
        fields: {
          SPA: "Responsabilité financière de la société",
          SARL: "Responsabilité financière de la personne concernée",
          limit: "Limite d'insolvabilité"
        }
      }
    },
    // UI text
    ui: {
      title: "Calculateur de Zakat Professionnel",
      subtitle: "Calculez votre Zakat selon les normes islamiques approuvées",
      calculationMethod: "Méthode de calcul",
      companyType: "Type de société",
      calculate: "Calculer la Zakat",
      addField: "Ajouter un autre champ",
      removeField: "Supprimer ce champ",
      additionalField: "Champ supplémentaire",
      total: "Total",
      enterAmount: "Entrer le montant",
      enterAdditionalAmount: "Entrer le montant supplémentaire",
      assetsData: "Données des actifs et propriétés",
      assetsDescription: "Veuillez saisir tous les actifs et propriétés soumis à la Zakat",
      importantInfo: "Information importante",
      warningText: "Veuillez vérifier l'exactitude des données saisies avant le calcul. Le Nisab est calculé sur la base du prix de l'or que vous avez saisi (85 grammes d'or 24 carats). Il est conseillé de consulter les prix actuels du marché algérien avant la saisie.",
      note: "Note:",
      noteText: "Vous pouvez ajouter des champs supplémentaires pour n'importe quel élément en cliquant sur le bouton d'ajout (+) à côté de chaque champ.",
      show: "Afficher",
      hide: "Masquer"
    },
    methods: {
      Maliki: "Formule Maliki de calcul de Zakat des sociétés",
      AAOIFI: "Formule AAOIFI de calcul de Zakat des sociétés",
      Alioua: "Formule de Bassam Alioua",
      Net: "Formule de la richesse nette"
    },
    goldPrice: {
    title: "Définir le prix de l'or pour calculer le Nisab",
    inputLabel: "Prix par gramme d'or (24 carats) en Dinar Algérien:",
    placeholder: "Entrer le prix par gramme",
    pricePerGram: "Prix par gramme",
    nissab: "Nisab",
    grams: "grammes",
    infoText: "Veuillez entrer le prix actuel du gramme d'or 24 carats sur le marché algérien pour calculer le Nisab avec précision"
  },
  
  zakatResult: {
    title: "Détails du Calcul",
    subtitle: "Résultats détaillés du calcul de Zakat",
    zakatAmount: "Montant de Zakat (avec nous)",
    zakatWithTax: "Montant de Zakat avec taxe IBS",
    nissabValue: "Valeur du Nisab",
    zakatBase: "Base de Zakat",
    date: "Date",
    contactNotice: "Si vous souhaitez payer la Zakat sans taxe",
    contactUs: "Contactez-nous",
    save: "Enregistrer",
    print: "Imprimer"
  }

  },
  en: {
    // Form labels
    forms: {
      "1": {
        label: "Cash and Cash Equivalents",
        fields: {
          x1: "Cash on hand",
          x2: "Bank deposits (current/demand)",
          x3: "Certified checks",
          x4: "Foreign currencies",
          x5: "Digital assets/available cryptocurrencies",
          x6: "Trust deposits/accessible fixed accounts",
          x7: "Interest-free loan given (until received)",
          x8: "Accrued revenues not received",
          x9: "Cash from sale of non-zakatable assets"
        }
      },
      "2": {
        label: "Accounts Receivable (Expected Debts)",
        fields: {
          y1: "Current receivables from customers",
          y2: "Deferred receivables expected",
          y3: "Notes receivable",
          y4: "Receivables expected (interest-free loan/monopoly sale)",
          y5: "Receivables from sale of non-zakatable/non-commercial assets",
          y6: "Rental/lease revenues due",
          y7: "Doubtful/uncollectible debts"
        }
      },
      "3": {
        label: "Zakatable Investments",
        fields: {
          z1: "Stocks/Sukuk/commercial shares",
          z2: "Real estate commercial shares",
          z3: "Bond/treasury bill investments",
          z4: "Infrastructure yield stocks (held)"
        }
      },
      "4": {
        label: "Trade Goods and Inventory",
        fields: {
          a1: "Finished goods",
          a2: "Work in progress",
          a3: "Raw materials",
          a4: "Goods in transit",
          a5: "Goods in custody with others",
          a6: "Spare parts for trading",
          a7: "Trade goods by donation/inheritance",
          a8: "Real estate held for trade",
          a9: "Obsolete/not-for-sale goods"
        }
      },
      "6": {
        label: "Deductible Liabilities",
        fields: {
          c1: "Short-term loans due within the year",
          c2: "Notes payable/creditors",
          c3: "Employee entitlements (wages/leave)",
          c4: "Taxes due within the year",
          c5: "Mudaraba profits for others",
          c6: "Customer deposits to be returned",
          c7: "General reserves/estimated provisions"
        }
      },
      malikiAssets: {
        label: "Financial Liabilities",
        fields: {
          SPA: "Company's financial liability",
          SARL: "Individual's financial liability",
          limit: "Insolvency threshold"
        }
      }
    },
    // UI text
    ui: {
      title: "Professional Zakat Calculator",
      subtitle: "Calculate your Zakat according to approved Islamic standards",
      calculationMethod: "Calculation Method",
      companyType: "Company Type",
      calculate: "Calculate Zakat",
      addField: "Add Another Field",
      removeField: "Remove This Field",
      additionalField: "Additional Field",
      total: "Total",
      enterAmount: "Enter Amount",
      enterAdditionalAmount: "Enter Additional Amount",
      assetsData: "Assets and Properties Data",
      assetsDescription: "Please enter all assets and properties subject to Zakat",
      importantInfo: "Important Information",
      warningText: "Please verify the accuracy of the entered data before calculation. Nisab is calculated based on the gold price you entered (85 grams of 24 karat gold). It is advised to check current Algerian market prices before entry.",
      note: "Note:",
      noteText: "You can add additional fields for any item by clicking the add (+) button next to each field.",
      show: "Show",
      hide: "Hide"
    },
    methods: {
      Maliki: "Maliki Corporate Zakat Calculation Formula",
      AAOIFI: "AAOIFI Corporate Zakat Calculation Formula",
      Alioua: "Bassam Alioua Formula",
      Net: "Net Wealth Method Formula"
    },
    goldPrice: {
    title: "Set Gold Price to Calculate Nisab",
    inputLabel: "Price per gram of gold (24 karat) in Algerian Dinar:",
    placeholder: "Enter price per gram",
    pricePerGram: "Price per gram",
    nissab: "Nisab",
    grams: "grams",
    infoText: "Please enter the current price per gram of 24 karat gold in the Algerian market to accurately calculate the Nisab"
  },
  
  zakatResult: {
    title: "Calculation Details",
    subtitle: "Detailed Zakat Calculation Results",
    zakatAmount: "Zakat Amount (with us)",
    zakatWithTax: "Zakat Amount with IBS Tax",
    nissabValue: "Nisab Value",
    zakatBase: "Zakat Base",
    date: "Date",
    contactNotice: "If you wish to pay Zakat without tax",
    contactUs: "Contact us",
    save: "Save",
    print: "Print"
  }
    
  }
  
};

// languageContext.js - Create a language context
import { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('ar'); // default Arabic

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

// Updated zakatForm structure - use this function to generate form with translations
export const getZakatForm = (t) => [
  {
    name: "1",
    label: t('forms.1.label'),
    children: [
      { name: 'x1', label: t('forms.1.fields.x1'), children: [] },
      { name: 'x2', label: t('forms.1.fields.x2'), children: [] },
      { name: 'x3', label: t('forms.1.fields.x3'), children: [] },
      { name: 'x4', label: t('forms.1.fields.x4'), children: [] },
      { name: 'x5', label: t('forms.1.fields.x5'), children: [] },
      { name: 'x6', label: t('forms.1.fields.x6'), children: [] },
      { name: 'x7', label: t('forms.1.fields.x7'), children: [] },
      { name: 'x8', label: t('forms.1.fields.x8'), children: [] },
      { name: 'x9', label: t('forms.1.fields.x9'), children: [] },
    ]
  },
  {
    name: '2',
    label: t('forms.2.label'),
    children: [
      { name: 'y1', label: t('forms.2.fields.y1'), children: [] },
      { name: 'y2', label: t('forms.2.fields.y2'), children: [] },
      { name: 'y3', label: t('forms.2.fields.y3'), children: [] },
      { name: 'y4', label: t('forms.2.fields.y4'), children: [] },
      { name: 'y5', label: t('forms.2.fields.y5'), children: [] },
      { name: 'y6', label: t('forms.2.fields.y6'), children: [] },
      { name: 'y7', label: t('forms.2.fields.y7'), children: [] },
    ]
  },
  {
    name: '3',
    label: t('forms.3.label'),
    children: [
      { name: 'z1', label: t('forms.3.fields.z1'), children: [] },
      { name: 'z2', label: t('forms.3.fields.z2'), children: [] },
      { name: 'z3', label: t('forms.3.fields.z3'), children: [] },
      { name: 'z4', label: t('forms.3.fields.z4'), children: [] },
    ]
  },
  {
    name: '4',
    label: t('forms.4.label'),
    children: [
      { name: 'a1', label: t('forms.4.fields.a1'), children: [] },
      { name: 'a2', label: t('forms.4.fields.a2'), children: [] },
      { name: 'a3', label: t('forms.4.fields.a3'), children: [] },
      { name: 'a4', label: t('forms.4.fields.a4'), children: [] },
      { name: 'a5', label: t('forms.4.fields.a5'), children: [] },
      { name: 'a6', label: t('forms.4.fields.a6'), children: [] },
      { name: 'a7', label: t('forms.4.fields.a7'), children: [] },
      { name: 'a8', label: t('forms.4.fields.a8'), children: [] },
      { name: 'a9', label: t('forms.4.fields.a9'), children: [] },
    ]
  },
  {
    name: '6',
    label: t('forms.6.label'),
    children: [
      { name: 'c1', label: t('forms.6.fields.c1'), children: [] },
      { name: 'c2', label: t('forms.6.fields.c2'), children: [] },
      { name: 'c3', label: t('forms.6.fields.c3'), children: [] },
      { name: 'c4', label: t('forms.6.fields.c4'), children: [] },
      { name: 'c5', label: t('forms.6.fields.c5'), children: [] },
      { name: 'c6', label: t('forms.6.fields.c6'), children: [] },
      { name: 'c7', label: t('forms.6.fields.c7'), children: [] },
    ]
  },
  {
    name: "malikiAssets",
    label: t('forms.malikiAssets.label'),
    children: [
      { name: "SPA", label: t('forms.malikiAssets.fields.SPA'), children: [] },
      { name: "SARL", label: t('forms.malikiAssets.fields.SARL'), children: [] },
      { name: "limit", label: t('forms.malikiAssets.fields.limit'), children: [] }
    ]
  },
];