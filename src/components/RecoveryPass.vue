<template>
  <form  v-on:submit.prevent="recovery">
    <div class="box">
      <div class="banner_high">
        <img src="../assets/logo.png" alt="">
      </div>
      <h1>Recupere a senha</h1>
      <div class="in">
        <label for="cpf">CPF</label>
        <div>
          <input
            type="text"
            v-model="cpf"
            placeholder="Informe seu CPF"
            v-mask="['###.###.###-##', '##.###.###/####-##']"
            />
          <img v-if="cpf.length >= 14" src="../assets/ok.svg" alt="">
        </div>
      </div>
      <div class="in">
        <label for="senha">Nova senha</label>
          <div>
            <input
              id="senha"
              v-model="senha"
              type="password"
              placeholder="Mínimo 8 caracteres"
              required/>
            <img v-if="senha.length >= 8" src="../assets/ok.svg" alt="">
          </div>  
          <div class="password_bar">
            <div :class="{'bar':true, 'green':(senha.length > 1)}" ></div> 
            <div :class="{'bar':true, 'green':(senha.length > 3)}" ></div> 
            <div :class="{'bar':true, 'green':(senha.length > 5)}" ></div>  
            <div :class="{'bar':true, 'green':(senha.length > 7)}" ></div> 
          </div>
          <label for="senha_confirmation">Repita a nova senha</label>
          <div>
            <input
              id="senha_confirmation"
              v-model="senha_confirmation"
              type="password"
              placeholder="Repita a senha"
              required/>
            <img v-if="!senha_confirmation" style="display: none;" src="../assets/ok.svg" alt="">
            <img v-else-if="senha === senha_confirmation" src="../assets/ok.svg" alt="">
          </div>
          <br />
        <button class="log">Atualizar senha </button>
        <span>Já possui cadastro? <a href="/">Faça o login!</a> </span> 
      </div>
    </div>
  </form>
</template>


<script>
export default {
  data() {
    return {
      senha:"",
      senha_confirmation:"",
      userLoggedIn: false,
      cpf:""
    };
    
  },
  methods:{
    recovery() {
      var update = {
        cpfCnpj: this.cpf,
        senha: this.senha
      }
      fetch('http://localhost/api/updatepessoa', {
          method:"POST",
          body:JSON.stringify(update)
        })
        .then(ret=>ret.json())
        .then(()=> this.$snackbar.add({
          type: 'success',
          text: 'Senha atualizada com sucesso!'
        }),
        setTimeout(() => history.back(), 2000)
        )
        .catch((error) => this.$snackbar.add({
        type: 'error',
        text: 'Não foi possível atualizar a senha, verifique os dados! '+error.toString()
      }))
    }
  },
};

</script>




