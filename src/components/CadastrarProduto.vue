<template>
  <form  v-on:submit.prevent="salvarProduto">
    <div class="box">
      <h5 v-on:click="voltar()"><font-awesome-icon icon="fa-solid fa-chevron-left" class="iconBtn" /> {{titleForm}}</h5>
      <div class="in">
        <label for="nome">Nome do Produto</label>
        <div>
          <input
            class="inputForm"
            id="nome"
            type="text"
            v-model="nome"
            placeholder="Nome"
            minlength="3"
            maxlength="50"
            autofocus/>
          <img v-if="nome.length >= 5" src="../assets/ok.svg" alt="">
        </div> 
        <label for="qtde">Quantidade</label>
        <div>
          <input
            class="inputForm"
            id="qtde"
            type="number"
            v-model="qtde"
            placeholder="Quantidade"
            required
            />
          <img v-if="qtde.length >= 1" src="../assets/ok.svg" alt="">
        </div>

        <label for="preco">Preço (R$)</label>
        <div>
            <input class="inputForm" v-model="preco" v-money="money" />
          <img v-if="preco != 'R$ 0,00'" src="../assets/ok.svg" alt="">
        </div>
        <br />
        <div>
          <button class="log buttonMenu" ><font-awesome-icon icon="fa-solid fa-floppy-disk" class="iconBtn" /> {{labelBtn}}</button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
  export default { 
    data(){ 
      return{ 
        money: {
          decimal: ',',
          thousands: '.',
          prefix: 'R$ ',
          precision: 2,
          masked: false
        },
        titleForm: "Cadastrar Produto",
        labelBtn: "Salvar produto",
        edicao: false,
        idEdicao: "",
        produto: "",
        nome:"",
        qtde:"",
        preco:""
      } 
    }, 
    
    created: function () {
      if (this.$route.query.edicao !== null && this.$route.query.edicao !== undefined) {
        fetch("http://localhost/api/produto?id="+this.$route.query.edicao.toString())
            .then(ret => ret.json())
            .then((dadosProduto) => {this.produto = dadosProduto.data})
            .then(() => {
                this.idEdicao = this.produto.id,
                this.nome = this.produto.nome;
                this.qtde = this.produto.quantidade;
                this.preco = this.produto.preco;
                this.labelBtn = "Salvar alterações";
                this.titleForm = "Editar Produto";
                this.edicao = true;
            })

      }
    },
    methods:{ 
      voltar(){
        history.back();
      },
      salvarProduto() {
        if (this.edicao) {
          var updateProduto = {
            id: this.idEdicao,
            nome:this.nome,
            quantidade:this.qtde.toString(),
            preco:this.preco
          }
          fetch('http://localhost/api/updateproduto', {
              method:"POST",
              body:JSON.stringify(updateProduto)
            })
            .then(ret=>ret.json())
            .then(()=> {
              this.$snackbar.add({
                type: 'success',
                text: 'Dados atualizados com sucesso!'
              }),
              setTimeout(() => history.back(), 2000)
           })
             
            .catch((error) => this.$snackbar.add({
            type: 'error',
            text: 'Não foi possível atualizar, verifique os dados! '+error.toString()
          }))
          
          
        }else {
          
              var produtoInsert = { 
              nome:this.nome,
              quantidade:this.qtde,
              preco:this.preco,
            } 
            fetch('http://localhost/api/produto', {
              method:"POST",
              body:JSON.stringify(produtoInsert)
            })
            .then(ret=>ret.json())
            .then(()=> this.$snackbar.add({
              type: 'success',
              text: 'Dados salvos com sucesso!'
            }),
            this.nome="",
            this.qtde="",
            this.preco=""
            )
            .catch(() => this.$snackbar.add({
              type: 'error',
              text: 'Erro ao salvar dados!'
            }))
          
        }
      },
    }
  };
</script>
<style>
</style>
