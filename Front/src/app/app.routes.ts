import { Routes } from '@angular/router';
import { HomeComponent } from './_Components/home/home.component';
import { LoginComponent } from './_Components/login/login.component';
import { RegisterComponent } from './_Components/register/register.component';
import { ProdutosComponent } from './_Components/produtos/produtos.component';
import { AdicionarProdutoComponent } from './_Components/adicionar-produto/adicionar-produto.component';
import { EditarProdutoComponent } from './_Components/editar-produto/editar-produto.component';
import { adminGuard } from './_Guards/admin.guard';
import { NonAuthorizedComponent } from './_Components/shared/non-authorized/non-authorized.component';
import { userGuard } from './_Guards/user.guard';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
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
        canActivate: [userGuard]
    },
    {
        path: 'adicionar/produto',
        component: AdicionarProdutoComponent,
        canActivate: [adminGuard]
    },
    {
        path: 'editar/produto',
        component: EditarProdutoComponent,
        canActivate: [adminGuard]
    },
    {
        path: 'not-authorized',
        component: NonAuthorizedComponent,
        
    },


];
