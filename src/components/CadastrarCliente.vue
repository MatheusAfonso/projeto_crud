<template>
  <form  v-on:submit.prevent="register">
    <div class="box">
      <h5 v-on:click="voltar()"><font-awesome-icon icon="fa-solid fa-chevron-left" class="iconBtn" /> {{titleForm}}</h5>
      <div class="in">
        <label for="nome">Nome Completo</label>
        <div>
          <input
            class="inputForm"
            id="nome"
            type="text"
            v-model="nome"
            placeholder="Informe o nome completo"
            minlength="3"
            maxlength="50"
            autofocus/>
          <img v-if="nome.length >= 5" src="../assets/ok.svg" alt="">
        </div> 
        <label for="cpfcnpj">CPF/CNPJ</label>
        <div>
          <input
            class="inputForm"
            id="cpfcnpj"
            type="text"
            v-mask="['###.###.###-##', '##.###.###/####-##']"
            v-model="cpfcnpj"
            placeholder="Conforme documento de identificação"
            required
            minlength="14"
            maxlength="18"
            v-on:blur="validaCpfCnpj"
            />
          <img v-if="cpfCnpjValido == false" src="../assets/not_ok.svg" alt="">
          <img v-else-if="cpfCnpjValido == true" src="../assets/ok.svg" alt="">
        </div>

        <label for="cep">CEP</label>
        <div>
          <input
            class="inputForm"
            id="cep"
            type="text"
            v-model="cep"
            v-mask="['##.###-###']"
            placeholder="Informe seu CEP"
            minlength="10"
            maxlength="10"
            required
            @keyup="buscaCep(cep)"
            />
          <img v-if="cep.length >= 10" src="../assets/ok.svg" alt="">
        </div>
        <label for="logradouro">Endereço/Logradouro</label>
        <div>
          <input
            class="inputForm"
            id="logradouro"
            type="text"
            v-model="logradouro"
            placeholder="Informe seu endereço/logradouro"
            minlength="3"
            maxlength="50"
            required/>
          <img v-if="logradouro.length >= 4" src="../assets/ok.svg" alt="">
        </div>
        <label for="numero">Número</label>
        <div>
          <input
            class="inputForm"
            id="numero"
            type="text"
            v-model="numero"
            placeholder="Informe o número"
            minlength="1"
            maxlength="5"
            required/>
          <img v-if="numero.length >= 1" src="../assets/ok.svg" alt="">
        </div>
        <label for="bairro">Bairro</label>
        <div>
          <input
            class="inputForm"
            id="bairro"
            type="text"
            v-model="bairro"
            placeholder="Informe o bairro"
            minlength="3"
            maxlength="50"
            required/>
          <img v-if="bairro.length >= 3" src="../assets/ok.svg" alt="">
        </div>
        <label for="cidade">Cidade</label>
        <div>
          <input
            class="inputForm"
            id="cidade"
            type="text"
            v-model="cidade"
            placeholder="Informe a cidade"
            minlength="3"
            maxlength="50"
            required/>
          <img v-if="cidade.length >= 2" src="../assets/ok.svg" alt="">
        </div>
        <label for="estado">Estado (UF)</label>
        <div>
          <input
            class="inputForm"
            id="estado"
            maxlength="2"
            minlength="2"
            type="text"
            v-model="estado"
            placeholder="Informe o estado (UF)"
            required
            v-on:keyup.enter="$event.target.nextElementSibling.focus()"/>
          <img v-if="estado.length >= 2" src="../assets/ok.svg" alt="">
        </div>
        <label for="complemento">Complemento</label>
        <div>
          <input
            class="inputForm"
            id="complemento"
            type="text"
            v-model="complemento"
            minlength="1"
            maxlength="30"
            placeholder="Informe complemento, caso houver"/>
          <img v-if="complemento.length >= 1" src="../assets/ok.svg" alt="">
        </div>
        <label for="email">E-mail</label>
        <div>
          <input
            class="inputForm"
            id="email"
            type="text"
            v-model="email"
            placeholder="Informe seu E-mail"
            minlength="3"
            maxlength="50"
            required/>
          <img v-if="email.length >= 6" src="../assets/ok.svg" alt="">
        </div>
      </div>
      <div style="padding-left: 35px;">
        <button class="log buttonMenu" ><font-awesome-icon icon="fa-solid fa-floppy-disk" class="iconBtn" /> {{labelBtn}}</button>
      </div>
    </div>
  </form>
</template>

<script>
  export default { 
    data(){ 
      return{ 
          titleForm: "Cadastrar Clientes",
          labelBtn: "Salvar cliente",
          cpfCnpjValido: null,
          edicao: false,
          pessoa: "",
          dadosEndereco: "",
          idEndereco:"",
          nome:"",
          cpfcnpj:"",
          cep:"",
          logradouro:"",
          numero:"",
          bairro:"",
          cidade:"",
          estado:"",
          complemento:"",
          email:""
      } 
    }, 
    created: function () {
      if (this.$route.query.edicao !== null && this.$route.query.edicao !== undefined) {
        fetch("http://localhost/api/pessoa?id="+this.$route.query.edicao.toString())
            .then(ret => ret.json())
            .then((dadosPessoa) => {this.pessoa = dadosPessoa.data[0]})
            .then(() => {
              fetch("http://localhost/api/enderecopessoa/"+this.pessoa.idEndereco)
              .then(retEndereco => retEndereco.json())
              .then((dadosEndereco) => {
                this.dadosEndereco = dadosEndereco.data;
                this.nome = this.pessoa.nome;
                this.cpfcnpj = this.pessoa.cpfCnpj;
                this.cep = this.dadosEndereco.cep;
                this.logradouro = this.dadosEndereco.logradouro;
                this.numero = this.dadosEndereco.numero;
                this.bairro = this.dadosEndereco.bairro;
                this.cidade = this.dadosEndereco.cidade;
                this.estado = this.dadosEndereco.estado;
                this.complemento = this.dadosEndereco.complemento;
                this.email = this.pessoa.email;
                this.idEndereco = this.pessoa.idEndereco;
                this.labelBtn = "Salvar alterações";
                this.titleForm = "Editar Cliente";
                this.edicao = true;
              })
            })

      }
    },
    methods:{ 
      voltar(){
        history.back();
      },
      validaCpfCnpj(){
        var val = this.cpfcnpj;
        var v1 = 0;
        var v2 = 0;
        var aux = false;

        if (val.length == 14) {
          var cpf = val.trim();
      
          cpf = cpf.replace(/\./g, '').replace('-', '').split('');
          
          for (var i0 = 1; cpf.length > i0; i0++) {
            if (cpf[i0 - 1] != cpf[i0]) {
              aux = true;   
            }
          } 
          
          if (aux == false) {
            this.cpfCnpjValido = false; 
          } 
          
          for (var i = 0, p = 10; (cpf.length - 2) > i; i++, p--) {
            v1 += cpf[i] * p; 
          } 
          
          v1 = ((v1 * 10) % 11);
          
          if (v1 == 10) {
            v1 = 0; 
          }
          
          if (v1 != cpf[9]) {
            this.cpfCnpjValido = false; 
          } 
          
          for (var i2 = 0, p2 = 11; (cpf.length - 1) > i2; i2++, p2--) {
            v2 += cpf[i2] * p2; 
          } 
          
          v2 = ((v2 * 10) % 11);
          
          if (v2 == 10) {
            v2 = 0; 
          }
        
          if (v2 != cpf[10]) {
            this.cpfCnpjValido = false; 
          } else {   
            this.cpfCnpjValido = true; 
          }
        } else if (val.length == 18) {
          var cnpj = val.trim();
          
          cnpj = cnpj.replace(/\./g, '').replace('-', '').replace('/', '').split(''); 

          for (var i3 = 1; cnpj.length > i3; i3++) { 
            if (cnpj[i3 - 1] != cnpj[i3]) {  
              aux = true;   
            } 
          } 
          
          if (aux == false) {  
            this.cpfCnpjValido = false; 
          }
          
          for (var i4 = 0, p4 = 5, p5 = 13; (cnpj.length - 2) > i4; i4++, p4--, p5--) {
            if (p4 >= 2) {  
              v1 += cnpj[i4] * p4;  
            } else {  
              v1 += cnpj[i4] * p5;  
            } 
          } 
          
          v1 = (v1 % 11);
          
          if (v1 < 2) { 
            v1 = 0; 
          } else { 
            v1 = (11 - v1); 
          } 
          
          if (v1 != cnpj[12]) {  
            this.cpfCnpjValido = false; 
          } 
          
          for (var i6 = 0, p6 = 6, p7 = 14; (cnpj.length - 1) > i6; i6++, p6--, p7--) { 
            if (p6 >= 2) {  
              v2 += cnpj[i6] * p6;  
            } else {   
              v2 += cnpj[i6] * p7; 
            } 
          }
          
          v2 = (v2 % 11); 
          
          if (v2 < 2) {  
            v2 = 0;
          } else { 
            v2 = (11 - v2); 
          } 
          
          if (v2 != cnpj[13]) {   
            this.cpfCnpjValido = false; 
          } else {  
            this.cpfCnpjValido = true; 
          }
        } else {
          this.cpfCnpjValido = false;
        }
      },
      buscaCep(val) {
        if (val.length === 10) {
          var cep = val.replaceAll('.', '').replaceAll('-', '');
          var url = "https://viacep.com.br/ws/"+cep+"/json/";
          fetch(url)
          .then((ret) => ret.json())
          .then((enderecoAPI) => {
            if (enderecoAPI.erro === undefined){
              this.logradouro=enderecoAPI.logradouro;
              this.bairro=enderecoAPI.bairro;
              this.cidade=enderecoAPI.localidade;
              this.estado=enderecoAPI.uf;
            }
          })
        }
      },
      register() {
        if (this.edicao) {
          var updatePessoa = {
            nome:this.nome,
            cpfCnpj:this.cpfcnpj,
            idEndereco:this.idEndereco,
            email:this.email,
            senha:"00000000",
            tipo:'cliente'
          }
          var updateEndereco = {
            id: this.idEndereco,
            cep:this.cep,
            logradouro:this.logradouro,
            numero:this.numero,
            bairro:this.bairro,
            cidade:this.cidade,
            estado:this.estado,
            complemento:this.complemento
          }
          
          fetch('http://localhost/api/updatepessoa', {
              method:"POST",
              body:JSON.stringify(updatePessoa)
            })
            .then(ret=>ret.json())
            .then(()=> {
              console.log('caiu aqui');
              fetch('http://localhost/api/updateendereco', {
                  method:"POST",
                  body:JSON.stringify(updateEndereco)
                })
                .then(ret=>ret.json())
                .then(()=> 
                this.$snackbar.add({
                  type: 'success',
                  text: 'Dados atualizados com sucesso!'
                }),
                setTimeout(() => history.back(), 2000)
                )
                .catch((error) => {this.$snackbar.add({
                type: 'error',
                text: 'Não foi possível atualizar, verifique os dados! '+error.toString()
              }); console.log(error.toString())})
            })
            .catch((error) => this.$snackbar.add({
            type: 'error',
            text: 'Não foi possível atualizar, verifique os dados! '+error.toString()
          }))
          
          
        }else {
          var enderecoInsert = {
            cep:this.cep,
            logradouro:this.logradouro,
            numero:this.numero,
            bairro:this.bairro,
            cidade:this.cidade,
            estado:this.estado,
            complemento:this.complemento
          }
          fetch('http://localhost/api/enderecopessoa/', {
            method:"POST",
            body:JSON.stringify(enderecoInsert)
          })
          .then(retData=>retData.json())
          .then((idReturned)=>{this.idEndereco = idReturned.data})
          .then(()=>{
              var clienteInsert = { 
              nome:this.nome,
              cpfCnpj:this.cpfcnpj,
              idEndereco:this.idEndereco,
              email:this.email,
              senha:"00000000",
              tipo:'cliente'
            } 
            fetch('http://localhost/api/pessoa/', {
              method:"POST",
              body:JSON.stringify(clienteInsert)
            })
            .then(ret=>ret.json())
            .then(()=> this.$snackbar.add({
              type: 'success',
              text: 'Dados salvos com sucesso!'
            }),
            this.nome="",
            this.cpfcnpj="",
            this.cep="",
            this.logradouro="",
            this.numero="",
            this.bairro="",
            this.cidade="",
            this.estado="",
            this.complemento="",
            this.email="",
            )
            .catch(() => this.$snackbar.add({
              type: 'error',
              text: 'Erro ao salvar dados!'
            }))
          })
        }
      },
    }
  };
</script>
<style>
</style>
