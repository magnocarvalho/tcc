import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @ViewChild("sidenav") sidenav: MatSidenav;

  title = "app";
  isRoot = true;
  menu: string = "menu";
  logged = false;
  loading = false;
  routerAnimation;
  routeData = undefined;

  usuario: any = {};

  system = {
    name: "Carregando...",
    menus: [
      {
        icon: "money-bill-alt",
        name: "Vendas",
        menus: [
          {
            route: "vendas/caixa",
            name: "Caixa",
            icon: "cash-register",
            permission: "Caixa"
          },
          {
            route: "vendas/nova-venda",
            name: "Nova Venda",
            icon: "cart-plus",
            permission: "Vendas"
          }
        ]
      },
      {
        icon: "warehouse",
        name: "Produtos",
        menus: [
          {
            route: "produtos/cadastro",
            name: "Produtos",
            icon: "box",
            permission: "Produtos"
          },
          {
            route: "produtos/estoque",
            name: "Estoque",
            icon: "boxes",
            permission: "Estoque"
          },
          {
            route: "produtos/compra",
            name: "Compra",
            icon: "shopping-cart",
            permission: "Compras"
          },
          {
            route: "produtos/categorias",
            name: "Categorias",
            icon: "archive",
            permission: "Categorias"
          },
          {
            route: "produtos/fornecedores",
            name: "Fornecedores",
            icon: "handshake",
            permission: "Fornecedores"
          },
          // {
          //   route: "produtos/variacoes",
          //   name: "Variações",
          //   icon: "account_circle",
          //   permission: "Variações"
          // },
          {
            route: "produtos/unidade",
            name: "Unidades de medidas",
            icon: "balance-scale",
            permission: "Unidade"
          },
          {
            route: "produtos/marcas",
            name: "Marcas",
            icon: "tags",
            permission: "Marcas"
          }
        ]
      },
      {
        icon: "lock",
        name: "Segurança",
        menus: [
          {
            route: "seguranca/perfil-acesso",
            name: "Perfil de acesso",
            icon: "user-circle",
            permission: "Perfil de acesso"
          },
          {
            route: "seguranca/usuarios",
            name: "Usuários",
            icon: "users",
            permission: "Usuários"
          }
        ]
      },
      {
        icon: "users-cog",
        name: "Gerência",
        menus: [
          {
            route: "gerencia/clientes",
            name: "Clientes",
            icon: "user-tag",
            permission: "Clientes"
          },
          {
            route: "gerencia/configuracao/edit/5c6819dasde8e86a30a24",
            name: "Configurações",
            icon: "user-tag",
            permission: "Configuraçãp"
          }
        ]
      },
      {
        icon: "envelope",
        name: "Contato",
        menus: [
          {
            route: "contato/entreemcontato",
            name: "Entre em contato",
            icon: "comment-alt",
            permission: "Entre em Contato"
          }
        ]
      }
    ]
  };

  snackBarVerify: any;

  constructor(public router: Router) { }

  ngOnInit() {
  }

  goBack() {
    if (window.history.length > 1) {
      window.history.go(-1);
      return;
    }
    // this.menu = this.menu == "back" ? "menu" : "back";
    var index = this.router.url.indexOf("/", 1);
    var url = this.router.url.substring(0, index);
    this.router.navigate([url]);
  }

  prepareRouteTransition(outlet) {
    const animation = outlet.activatedRouteData["animation"] || {};
    return animation["value"] || null;
  }

  isMasterUser(){
    return this.usuario && this.usuario.master;
  }


}
