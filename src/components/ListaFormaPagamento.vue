<template>
  <div class="box">
      <h5 v-on:click="voltar()"><font-awesome-icon icon="fa-solid fa-chevron-left" class="iconBtn" /> Formas de Pagamento</h5>
      <div class="in">
        <div>
          <select  v-model="column">
            <option  :value="null">Sem campo de filtro</option>
            <option v-for="col in cols" :key="col">{{ col }}</option>
          </select>
          <input
            class="inputForm"
            id="nome"
            type="text"
            placeholder="Busca"
            minlength="3"
            maxlength="50"
            v-model="search"
            autofocus
            />
          <font-awesome-icon icon="fa-solid fa-magnifying-glass" class="iconBtn" style="margin-left:15px"/> 
        </div> 
      </div>
      <table cellspacing="0" cellpadding="0" border="0" width="100%" id="tblProdutos">
        <tr>
          <td>
            <table cellspacing="0" cellpadding="1" border="1" width="100%" >
              <th v-for="col in colsEdited[0]" :key="col">{{ col }}</th>
              <th style="width:120px"></th>
            </table>
          </td>
        </tr>
      <tr>
        <td>
          <div style="height:300px; overflow:auto;">
            <table class="tblCustom" cellspacing="0" cellpadding="1" border="1" width="100%" >
              <tr v-for="row in rows" :key="row.id">
                <td v-for="col in cols" :key="col">{{ row[col] }}</td>
                <td style="width:120px">
                  <button
                    v-on:click="editarFormaPagamento(row.id)"
                    class="btn btn-info">
                    <font-awesome-icon icon="fa-solid fa-pen" class="iconAction" />
                  </button>
                  <button
                    type="button"
                    v-on:click="excluirFormaPagamento(row.id)"
                    class="btn btn-danger">
                    <font-awesome-icon icon="fa-solid fa-trash" class="iconAction" />
                  </button>
                </td>  
              </tr>
            </table>  
          </div>
        </td>
      </tr>
    </table>
    <div>
      <div style="heigth: 50px">
        <button class="buttonMenu corAzul" v-on:click="cadastrarFormaPagamento()">
          <font-awesome-icon icon="fa-solid fa-plus" class="iconBtn" /> Cadastrar Forma de Pagamento
        </button>
      </div>
    </div>
  </div>
    <Teleport to="body">
    <modal :show="showModal" @close="cancel()" @confirm="confirm()" :title="titleModal" :body="bodyModal" >
      <template #header>
        <h3>Tem certeza?</h3>
      </template>
    </modal>
  </Teleport>
</template>

<script>
  import Modal from './modal/Modal.vue'
  export default {
    components: {
        Modal
      },
      data() {
        return {
          showModal: false,
          titleModal: "",
          bodyModal:"",
          idSelected: null,
          formasPagamento: [],
          search: null,
          column: null,
          colsEdited: [{
            id:"Nº",
            nomePagamento:"Nome",
            parcela: "Parcelamento",
          }]
        };
      },
      created: function () {
        window.onpopstate = function () {
          location.reload()
        };
        this.consultarFormaPagamento();
      },
      
      computed: {
        cols () {
          var ret = this.formasPagamento.length >= 1 ? Object.keys(this.formasPagamento[0]) : [];
          return  ret;
        },
        rows () {
          if (!this.formasPagamento.length) {
            return []
          }
          return this.formasPagamento.filter(item => {
            let props = (this.search && this.column) ? [item[this.column]] : Object.values(item)
            return props.some(prop => !this.search || ((typeof prop === 'string') ? prop.includes(this.search) : prop.toString(10).includes(this.search)))
          })
        }
      },
      methods: {
        voltar(){
          history.back();
        },
        editarFormaPagamento(id){
          window.location.href="/cadastrarformapagamento?edicao="+id.toString()
        },
        consultarFormaPagamento() {
          fetch("http://localhost/api/formapagamento")
          .then((ret) => ret.json())
          .then((dadosFormaPagamento) => {
            this.formasPagamento = [];
            if (dadosFormaPagamento.status === "success"){
              this.formasPagamento = dadosFormaPagamento.data;
            }
          })
        },
        cadastrarFormaPagamento(){
          window.location.href="/cadastrarformapagamento";
        },
        excluirFormaPagamento(id){
          this.titleModal = 'Tem certeza?';
          this.bodyModal = 'Gostaria de excluir esta forma de pagamento?';
          this.showModal=true;
          this.idSelected=id;
        },
        confirm(){
          fetch('http://localhost/api/formapagamento?delete='+this.idSelected.toString(), {
          })
          .then(ret=>ret.json())
          .then(()=> this.$snackbar.add({
            type: 'success',
            text: 'Forma de pagamento excluída!'
          }),
          this.consultarFormaPagamento());
          this.showModal=false;
          this.idSelected = null;
        },
        cancel(){
          this.showModal=false;
          this.idSelected = null;
        }
        
      },
  };
</script>
<style>
</style>
