interface Response {
    token: string;
    user: {
        name:string;
        email:string
    }
}

export function SignIn(): Promise<Response> {
    return new Promise(resolve => { //Aqui vou ter minha chamada para a api via axios
        setTimeout(()=> {
            resolve({
                token: 'esseemeutokendeautenticacao',
                user: {
                    name: 'Diego',
                    email: 'diego@rocketseat.com.br',
                },
            });
        }, 2000);
    });
}