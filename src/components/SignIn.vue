<template>
  <form  v-on:submit.prevent="login">
    <div class="box">
      <div class="banner_high">
        <img src="../assets/logo.png" alt="">
      </div>
      <h1>Login</h1>
      <div class="in">
        <label for="cpfCnpj">CPF</label>
        <div>
          <input 
            id="cpfCnpj"
            type="text"
            v-mask="['###.###.###-##', '##.###.###/####-##']"
            v-model="cpfCnpj"
            placeholder="Informe seu CPF"/>
          <img v-if="cpfCnpj.length >= 11" src="../assets/ok.svg" alt="">
        </div>
      </div>
      <div class="in">
        <label for="senha">Senha</label>
        <div>
          <input
            id="senha"
            v-model="senha"
            type="password"
            placeholder="Informe sua senha" required/>
          <img v-if="senha.length >= 8" src="../assets/ok.svg" alt="">
          <img v-else-if="senha.length <= 8" src="" alt="">
        </div>
      </div>
      <div class="check_bar">
        <div>
          <input type="checkbox" v-if="isActive == true" checked id="lembrarLogin">
          <input type="checkbox" v-else-if="isActive == false" id="lembrarLogin">
          <label for="">Lembrar usuário</label>
        </div>
        <a href="/recuperar">Esqueci minha senha </a>
      </div>
      <button class="log">Entrar </button>
      <span>Ainda não possui um cadastro? <a href="/signup">Inscreva-se aqui!</a> </span> 
    </div>
  </form>
</template>


<script>
export default {
  data() {
    return {
      name:"singin",
      senha:"",
      userLoggedIn: false,
      cpfCnpj:"",    
      isActive: false,
    };
    
  },
  created: function () {
      if (sessionStorage.getItem('cpfCnpj') !== undefined &&
          sessionStorage.getItem('cpfCnpj') !== null) {
            this.cpfCnpj = sessionStorage.getItem('cpfCnpj');
        this.isActive = true;
      }
    },
  methods:{
    login() {
      if (this.isActive) {
        sessionStorage.setItem("cpfCnpj", this.cpfCnpj);
      } else {
        sessionStorage.removeItem("cpfCnpj");
      }
      fetch('http://localhost/api/pessoa?cpfCnpj='+this.cpfCnpj+'&senha='+this.senha, {
        })
        .then(ret=>ret.json())
        .then((retData)=>{

          if (retData.status === "error"){
            this.$snackbar.add({
              type: 'error',
              text: 'Usuário não encontrado! '
            });
          } else {
            sessionStorage.setItem("nome", retData.data['nome']);
            sessionStorage.setItem("email", retData.data['email']);
            sessionStorage.setItem("id", retData.data['id']);
            sessionStorage.setItem("idEndereco", retData.data['idEndereco']);
            sessionStorage.setItem("userLogged", true);
            window.location.href="/menu";
          } 
        })
        .catch((error) => this.$snackbar.add({
        type: 'error',
        text: 'Usuário não encontrado! '+error.toString()
      }))

    }
  },
};

</script>




