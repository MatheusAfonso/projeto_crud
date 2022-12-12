<template>
  <form  v-on:submit.prevent="salvarFormaPagamento">
    <div class="box">
      <h5 v-on:click="voltar()"><font-awesome-icon icon="fa-solid fa-chevron-left" class="iconBtn" /> {{titleForm}}</h5>
      <div class="in">
        <label for="nomePagamento">Forma de Pagamento</label>
        <div>
          <input
            class="inputForm"
            id="nomePagamento"
            type="text"
            v-model="nomePagamento"
            placeholder="EX: Dinheiro"
            minlength="3"
            maxlength="50"
            autofocus/>
          <img v-if="nomePagamento.length >= 1" src="../assets/ok.svg" alt="">
        </div> 
        <label for="parcela">Parcelas</label>
        <div>
          <input
            class="inputForm"
            id="parcela"
            type="text"
            v-model="parcela"
            placeholder="Quantidade"
            required
            />
          <img v-if="parcela.length >= 1" src="../assets/ok.svg" alt="">
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
        titleForm: "Cadastrar Meio de Pagamento",
        labelBtn: "Salvar",
        edicao: false,
        idEdicao: "",
        listaFormaPagamento: "",
        nomePagamento:"",
        parcela:""
      } 
    }, 
    
    created: function () {
      if (this.$route.query.edicao !== null && this.$route.query.edicao !== undefined) {
        fetch("http://localhost/api/formapagamento?id="+this.$route.query.edicao.toString())
            .then(ret => ret.json())
            .then((dadosPagamento) => {this.pagamento = dadosPagamento.data})
            .then(() => {
                this.idEdicao = this.pagamento.id,
                this.nomePagamento = this.pagamento.nomePagamento;
                this.parcela = this.pagamento.parcela;
                this.labelBtn = "Salvar alterações";
                this.titleForm = "Editar Forma de Pagamento";
                this.edicao = true;
            })

      }
    },
    methods:{ 
      voltar(){
        history.back();
      },
      salvarFormaPagamento() {
        if (this.edicao) {
          var updateFormaPagamento = {
            id: this.idEdicao,
            nomePagamento:this.nomePagamento,
            parcela:this.parcela
          }
          fetch('http://localhost/api/updateformapagamento', {
              method:"POST",
              body:JSON.stringify(updateFormaPagamento)
            })
            .then(ret=>ret.json())
            .then(()=> {
              this.$snackbar.add({
                type: 'success',
                text: 'Dados atualizados com sucesso!'
              }),
              this.nomePagamento="",
              this.parcela="",
              setTimeout(() => history.back(), 2000)
           })
             
            .catch((error) => this.$snackbar.add({
            type: 'error',
            text: 'Não foi possível atualizar, verifique os dados! '+error.toString()
          }))
        }else {
              var formaPagamentoInsert = { 
              nomePagamento:this.nomePagamento,
              parcela:this.parcela
            } 
            fetch('http://localhost/api/formapagamento', {
              method:"POST",
              body:JSON.stringify(formaPagamentoInsert)
            })
            .then(ret=>ret.json())
            .then(()=> this.$snackbar.add({
              type: 'success',
              text: 'Dados salvos com sucesso!'
            }),
            this.nomePagamento="",
            this.parcela=""
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
