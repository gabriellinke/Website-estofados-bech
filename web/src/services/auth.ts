interface Response {
    token: string;
    user: {
        name:string;
        email:string;
        admin: boolean;
    }
}

export function SignIn(): Promise<Response> {
    return new Promise(resolve => { //Aqui vou ter minha chamada para a api via axios
        setTimeout(()=> {
            resolve({
                token: 'esseemeutokendeautenticacao',
                user: {
                    name: 'Gabriel Linke',
                    email: 'gh.linke@hotmail.com',
                    admin: true,
                },
            });
        }, 200);
    });
}