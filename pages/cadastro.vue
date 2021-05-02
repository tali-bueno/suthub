<template>
  <div class="container">
    <div class="title">
      <h1>Cadastro</h1>
      <button @click="goToHome">Voltar</button>
    </div>
    <div class="container-form">
        <div class="form">
        <div class="form-data">
            <p>Dados Pessoais</p>
            <input type="text" v-model="usuario.nome" placeholder="Nome" required/>
            <!-- <input type="date" value="dd/mm/aaaa" v-model="usuario.idade" placeholder="Data de Nascimento" required pattern="[0-9]{2}-[0-9]{2}-[0-9]{4}"/> -->
            <input type="date" value="dd/mm/aaaa">
            <input type="number" v-model="usuario.cpf" placeholder="CPF" required/>
            <select placeholder="Espécie do pet" name="select">
                <option v-for="item in especie" :key="item" value="item">{{item}}</option>
            </select>
            <select placeholder="Raça do pet" required>
                <option></option>
            </select>
            <input placeholder="Outro"/>
            <input v-model="usuario.renda" type="number" placeholder="Renda mensal" required/>
        </div>
        
        <div class="form-address">
            <p>Endereço</p>
            <input v-model="usuario.endereco.cep" placeholder="CEP" required/>
            <input v-model="usuario.endereco.rua" placeholder="Rua" required/>
            <input v-model="usuario.endereco.bairro" placeholder="Bairro" required/>
            <input v-model="usuario.endereco.cidade" placeholder="Cidade" required/>
            <input v-model="usuario.endereco.estado" placeholder="Estado" required/>
        </div>
    </div>
     <button class="btn-save" @click="salvar(usuario)">Enviar</button>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            especie:["cão", "gato"],
            racaCao:["Labrador", "Shitsu", "Poodle", "Buldogue", "Pug", "outro"],
            racaGato:["Siamês", "Angorá", "Persa", "Maine Coon", "Sphynx", "outro"],
            usuario: {
                nome: "",
                idade: "",
                cpf: "",
                especie: "",
                raca: [],
                renda: "",
                endereco:{
                    rua: "",
                    bairro: "",
                    cidade: "",
                    estado: ""
                }
            }
        }
    },
    methods:{
         goToHome(){
          this.$router.push("/");
        },
        salvar(usuario){
            console.log("Salvar", usuario);
            this.validate();
        },
        validate(){
            const user = this.$data.usuario;

            const res = this.validateName(user.nome);
            console.log("RES", res);
            
        },
        validateName(name){
            console.log("validate name", name);
            return !!name.match(/^((\b[A-zÀ-ú']{2,40}\b)\s*){2,}$/);
        },
        validateDate(){
            
        }
    }
}
</script>

<style scoped>
    input[type="date"]::-webkit-inner-spin-button, input[type="date"]::-webkit-clear-button {
        color: #fff;
        position: relative !important;
    }

    input[type="date"]::-webkit-datetime-edit-year-field{
        position: absolute !important;
        border-left:1px solid #8c8c8c;
        padding: 2px;
        color:#000;
        left: 56px;
    }

    input[type="date"]::-webkit-datetime-edit-month-field{
        position: absolute !important;
        border-left:1px solid #8c8c8c;
        padding: 2px;
        color:#000;
        left: 26px;
    }


    input[type="date"]::-webkit-datetime-edit-day-field{
        position: absolute !important;
        color:#000;
        padding: 2px;
        left: 4px;
    }
    input[type=number]::-webkit-inner-spin-button,
    input[type=number]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    .container-form{
        margin: 70px;
        text-align: center;
    }
    .form{
        display: flex;
    }
    .form-data{
        width: 50%;
        text-align: center;
    }
    .form-address{
        width: 50%;
        text-align: center;
    }
    .container{
        background-color:rgba(202, 192, 192, 0.295);
        display: flex; 
        flex-direction: column;
        border-radius: 5px;
        padding: 10px;
        padding-inline-start: 60px;
        padding-inline-end: 60px;
        margin:50px;
        color:white;
    }
    .title{
      background-color: rgba(70, 66, 66, 0.295);
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      border-radius: 5px;
    }
    .title h1{
      color:white;
      padding:20px;
    }
    .btn-save{
        width: 600px;
    }
     button{
        width: 100px; 
        height: 40px; 
        margin:20px; 
        background-color: #1E90FF;
        color:white; 
        border:0px; 
        border-radius:4px;
        cursor:pointer;
    } 
    input{
        border-radius: 5px;
        height: 40px;
        margin: 16px;
        padding-left: 10px;
        border: none;
        width: 90%;
        outline:none;
    }
    select{
        border-radius: 5px;
        height: 40px;
        margin: 16px;
        padding-left: 10px;
        border: none;
        width: 90%;
        background-color: white;
    }
    p{
        color:rgb(31, 29, 29);
         margin-top: 10px;
    }
</style>