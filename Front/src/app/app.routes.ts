import { Routes } from '@angular/router';
import { HomeComponent } from './_Components/home/home.component';
import { LoginComponent } from './_Components/login/login.component';
import { RegisterComponent } from './_Components/register/register.component';
import { ProdutosComponent } from './_Components/produtos/produtos.component';
import { AdicionarProdutoComponent } from './_Components/adicionar-produto/adicionar-produto.component';
import { EditarProdutoComponent } from './_Components/editar-produto/editar-produto.component';

export const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'registrar',
        component: RegisterComponent,
    },
    {
        path: 'produtos',
        component: ProdutosComponent,
    },
    {
        path: 'adicionar/produto',
        component: AdicionarProdutoComponent,
    },
    {
        path: 'editar/produto',
        component: EditarProdutoComponent,
    },


];
