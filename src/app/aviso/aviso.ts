import { Adm } from '../adm/adm';

export class Aviso{
    titulo : string;
    mensagem : string;
    cpf_receptor : string;
    adm : Adm = new Adm();
    key : any;
}