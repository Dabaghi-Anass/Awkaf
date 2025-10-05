

export default function validation(data){
    let errors={};

    if(!data.username){
        errors.username="اسم المستخدم مطلوب";
    }
    if(!data.password){
        errors.password="كلمة المرور مطلوبة";
    }
    return errors;
}