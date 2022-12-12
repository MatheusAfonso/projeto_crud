<template>
  <div class="container">
    <div class="card">
      <div class="card-header">Cadastrar um novo usuário</div>
      <div class="card-body">
        <form v-on:submit.prevent="salvarDados">
          <div class="form-group">
            <label for="nome">Nome:</label>
            <input
              type="text"
              class="form-control"
              required
              name="nome"
              id="nome"
              aria-describedby="helpId"
              placeholder="Nome"
              v-model="pessoa.nome"
            />
            <small id="helpId" class="form-text text-muted">
              Informe o nome completo
            </small>
          </div>
          <div class="form-group">
            <label for="">E-mail:</label>
            <input
              type="email"
              class="form-control"
              required
              name="email"
              id="email"
              aria-describedby="helpId"
              placeholder="E-mail"
              v-model="pessoa.email"
            />
            <small id="helpId" class="form-text text-muted">
              Informe o E-mail
            </small>
          </div>
          <div class="btn-group" role="group" aria-label="">
            <button type="submit" class="btn btn-success">Salvar</button>
            <router-link :to="{name:'Menu'}" class="btn btn-warning">
               Cancelar
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  export default { 
    data(){ 
      return{ 
        pessoa:{} 
      } 
    }, 
    methods:{ 
      salvarDados(){ 
        var dadosSend = { 
          nome:this.pessoa.nome, 
          email:this.pessoa.email 
        } 
        fetch('http://localhost/api/user', {
          method:"POST",
          body:JSON.stringify(dadosSend)
        })
        .then(ret=>ret.json())
        .then((window.location.href='listar'))
      }
    }
  };
</script>
<style>
</style>
