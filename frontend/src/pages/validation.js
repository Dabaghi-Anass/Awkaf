

export default function validation(data){
    let errors={};

    if(!data.username){
        errors.username="username required";
    }
    if(!data.password){
        errors.password="كلمة المرور مطلوبة";
    }
    return errors;
}