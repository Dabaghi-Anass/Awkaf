

export default function validation(data){
    let errors={};

    if(!data.email){
        errors.email="البريد الإلكتروني مطلوب";
    }
    if(!data.password){
        errors.password="كلمة المرور مطلوبة";
    }
    return errors;
}