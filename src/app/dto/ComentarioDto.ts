import { UsuariosComponent } from '../usuarios/usuarios.component';

import { Usuario } from './UsuarioDto';

export class Comentario{
    id: string;
    comentario: string;
    usuario: Usuario = new Usuario;
}