import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//components
import { HomeComponent } from './home/home.component';
import { LibroComponent } from './libro/libro.component';
import { LibrosComponent } from './libros/libros.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { ChatComponent } from './chat/chat.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'libros', component: LibrosComponent},
  {path: 'libros/:id', component: LibroComponent},
  {path: 'chat', component: ChatComponent},
  {path: 'categorias', component: CategoriasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
