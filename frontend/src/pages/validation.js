

export default function validation(data){
    let errors={};

    if(!data.email){
        errors.email="Email required";
    }
    if(!data.password){
        errors.password="password required";
    }
    return errors;
}