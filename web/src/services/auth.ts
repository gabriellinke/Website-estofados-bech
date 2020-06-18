import api from "./api";
import { GiTestTubes } from "react-icons/gi";

interface Response {
    token: string;
    user: {
        id: number;
        name: string;
        surname: string;
        email: string;
        admin: boolean;
    }
}

export function SignIn(email:string, password:string): Response {
    api.post('/user/login', {email, password}).then(response => console.log(response));
    console.log("Estou aqui")

    return({
        token: 'uahsuauhs',
        user: {
            id: 1,
            name: "Gabriel",
            surname: "teste2",
            email: "admin@hotmial.com",
            admin: true
        }

    });
}


// api.get('products')
// .then(response => {
//     setProducts(response.data)
// export function SignIn(email:string, password:string): Promise<Response> {
//     return new Promise(resolve => { //Aqui vou ter minha chamada para a api via axios
//         setTimeout(()=> {
//             resolve({
//                 token: 'esseemeutokendeautenticacao',
//                 user: {
//                     name: 'Gabriel Linke',
//                     email: 'gh.linke@hotmail.com',
//                     admin: true,
//                 },
//             });
//         }, 2000);
//     });
// }