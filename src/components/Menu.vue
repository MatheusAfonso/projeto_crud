<template>
<nav class="navbar navbar-expand navbar-light bg-light">
    <div class="nav navbar-nav navbar">
      <h3>Bem vindo(a) {{nome}}!</h3>
      <a v-on:click="logout()" class="nav-link" >Sair</a>
    </div>
  </nav>
  <div class="box cardHome">
    <button class="buttonMenu corAzul" v-on:click="listaClientes();"><font-awesome-icon icon="fa-solid fa-user" class="iconBtn" /> Meus Clientes</button>
    <button class="buttonMenu corVermelho" v-on:click="listaProdutos()"><font-awesome-icon icon="fa-solid fa-store" class="iconBtn" /> Meu Estoque</button>
    <button class="buttonMenu corRoxo" v-on:click="formaPagamento()"><font-awesome-icon icon="fa-solid fa-money-check-dollar" class="iconBtn" /> Forma de pagamento</button>
    <button class="buttonMenu corVerde" v-on:click="realizarVenda()"><font-awesome-icon icon="fa-solid fa-cash-register" class="iconBtn" /> Venda</button>
    <button class="buttonMenu corLaranja" v-on:click="relatorios()"><font-awesome-icon icon="fa-solid fa-print" class="iconBtn" /> Relatórios</button>
  </div>

</template>

<script>
  export default {
    data() {
      return {
       nome: sessionStorage.getItem('nome').split(" ")[0]
      };
    },
    created: function () {
      if (!sessionStorage.getItem("userLogged")){
        window.location.href="/";
      }
    },
    methods: {
      logout() {
        sessionStorage.removeItem("userLogged");
        window.location.href = "/";
      },
      listaClientes() {
        window.location.href="/listaclientes";
      },
      listaProdutos(){
        window.location.href="/listaproduto";
      },
      formaPagamento() {
        window.location.href="/listaformapagamento";
      },
      realizarVenda(){
        console.log('realizar venda...');
      },
      relatorios(){
        console.log('relatorios...');
      }
    },
  };
</script>
<style>

</style>
