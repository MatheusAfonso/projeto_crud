import { createRouter, createWebHistory } from 'vue-router'
import CadastrarCliente from '../components/CadastrarCliente.vue'
import CadastrarProduto from '../components/CadastrarProduto.vue'
import ListaProduto from '../components/ListaProduto.vue'
import ListaClientes from '../components/ListaClientes.vue'
import signin from '../components/SignIn.vue'
import signup from '../components/SignUp.vue'
import recuperarSenha from '../components/RecoveryPass.vue'
import Menu from '../components/Menu.vue'
import CadastrarFormaPagamento from '../components/CadastrarFormaPagamento.vue'
import ListaFormaPagamento from '../components/ListaFormaPagamento.vue'

const routes = [
  {
    path: '/',
    name: 'signin',
    component: signin
  },
  {
    path: '/signup',
    name: 'signuo',
    component: signup
  },
  {
    path: '/recuperar',
    name: 'recuperar',
    component: recuperarSenha
  },
  {
    path: '/cadastrarcliente',
    name: 'CadastrarCliente',
    component: CadastrarCliente
  },
  {
    path: '/cadastrarproduto',
    name: 'CadastrarProduto',
    component: CadastrarProduto
  },
  {
    path: '/menu',
    name: 'Menu',
    component: Menu
  },
  {
    path: '/listaclientes',
    name: 'Listaclientes',
    component: ListaClientes
  },
  {
    path: '/listaproduto',
    name: 'Listaproduto',
    component: ListaProduto
  },
  {
    path: '/cadastrarformapagamento',
    name: 'Cadastrarformapagamento',
    component: CadastrarFormaPagamento
  },
  {
    path: '/listaformapagamento',
    name: 'Listaformapagamento',
    component: ListaFormaPagamento
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
