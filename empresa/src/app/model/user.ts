export interface User {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
    emailVerified: boolean;

}

export class Usuario implements User {
    _id: string;
    id: string;
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
    emailVerified: boolean;
    bairro: string;
    cep: string;
    cidade: string;
    complemento: string;
    estado: string;
    googlePlace: string;
    numero: string;
    pais: string;
    rua: string;
    location: any;
    tipo: any;
    cnpj: string;
    description: string;
    telefone: string;
}
