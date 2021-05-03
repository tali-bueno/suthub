<template>
  <v-app>
    <v-card class="ma-12 pa-2" color="rgba(202, 192, 192, 0.295)" height="900">
      <v-toolbar class="ma-5" color="rgba(70, 66, 66, 0.295)" height="80" dark>
        <v-toolbar-title class="display-1">Cadastro</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="info" @click="goToHome" class="ma-4">Voltar</v-btn>
      </v-toolbar>

      <v-card class="mx-auto ma-4" max-width="500" min-width="900" height="700">

        <v-form ref="form" v-model="valid" lazy-validation class="ma-3">
          <v-container class="mb-6">
            <v-row no-gutters style="height: 150px;">
              <v-col class="ma-5">
                <v-card-text class="pb-0">
                  <p>Dados Pessoais</p>
                </v-card-text>
                <v-text-field
                  v-model="usuario.nome"
                  :rules="nameRules"
                  label="Nome"
                  @input="validateName"
                  required
                  outlined
                ></v-text-field>

                <v-text-field
                  v-model="usuario.nascimento"
                  label="Data de nascimento"
                  :rules="nascimentoRules"
                  @input="formatNascimento"
                  required
                  outlined
                  maxlength="10"
                ></v-text-field>

                <v-text-field
                  v-model="usuario.cpf"
                  label="CPF"
                  :rules="cpfRules"
                  required
                  outlined
                  maxlength="14"
                  @input="formarCpf"
                ></v-text-field>

                <v-select
                  v-model="usuario.especie"
                  :items="especie"
                  :rules="especieRules"
                  label="Selecione a espécie"
                  required
                  outlined
                ></v-select>
                <v-select
                  v-model="usuario.raca"
                  :items="usuario.especie === 'gato'? racaGato : racaCao"
                  :rules="racaRules"
                  label="Selecione a raça"
                  required
                  outlined
                ></v-select>

                <v-text-field
                  v-show="usuario.raca === 'outro'"
                  v-model="option"
                  label="Insira a raça"
                  :rules="outroRules"
                  required
                  outlined
                ></v-text-field>

                <v-text-field
                  v-model="usuario.renda"
                  label="Renda"
                  :rules="rendaRules"
                  required
                  outlined
                  @input="formatRenda"
                ></v-text-field>
              </v-col>

              <v-col class="ma-5">
                <v-card-text class="pb-0">
                  <p>Endereço</p>
                </v-card-text>
                <v-text-field
                  v-model="usuario.endereco.cep"
                  required
                  label="Cep"
                  outlined
                  :append-icon="'mdi-magnify'"
                  @click:append="getCep"
                  @input="formatCep"
                  :rules="cepRules"
                  maxlength="10"
                ></v-text-field>

                <v-text-field
                  v-model="usuario.endereco.rua"
                  label="Rua"
                  :rules="basicRules"
                  outlined
                ></v-text-field>
                <v-text-field
                  v-model="usuario.endereco.bairro"
                  label="Bairro"
                  :rules="basicRules"
                  outlined
                ></v-text-field>
                <v-text-field
                  v-model="usuario.endereco.cidade"
                  label="Cidade"
                  :rules="basicRules"
                  outlined
                ></v-text-field>

                <v-text-field
                  v-model="usuario.endereco.estado"
                  label="Estado"
                  :rules="estadoRules"
                  maxlength="2"
                  outlined
                  oninput="this.value = this.value.toUpperCase()"
                ></v-text-field>
                <v-row align="center" justify="space-around">
                  <v-btn :disabled="!valid" min-width="180" color="info" class="m-4 mt-8" @click="save">Enviar</v-btn>
                  <v-btn min-width="180" class="m-4 mt-8" @click="limpar">Limpar</v-btn>
                </v-row>
              </v-col>
            </v-row>
          </v-container>

        </v-form>
      </v-card>
    </v-card>
  </v-app>
</template>

<script>
import CepApi from "../apis/CepApi";

const api = new CepApi();
export default {
  data: () => ({
    valid:true,
    option: "",
    valid: true,
    name: "",
    basicRules: [v => !!v || "Campo obrigatório"],
    nameRules: [v => !!v || "Campo nome é obrigatório"],
    nascimentoRules: [ v => !!v || "Campo obrigatório"],
    cpfRules: [v => !!v || "Campo obrigatório"],
    especieRules: [v => !!v || "Campo obrigatório"],
    racaRules: [v => !!v || "Campo obrigatório"],
    outroRules: [v => !!v || "Campo obrigatório"],
    rendaRules: [v => !!v || "Campo obrigatório"],
    cepRules: [v => !!v || "Campo obrigatório"],
    estadoRules: [v => !!v || "Campo obrigatório"],
    especie: ["cão", "gato"],
    racaCao: ["Labrador", "Shitsu", "Poodle", "Buldogue", "Pug", "outro"],
    racaGato: ["Siamês", "Angorá", "Persa", "Maine Coon", "Sphynx", "outro"],
    usuario: {
      nome: "",
      nascimento: "",
      cpf: "",
      especie: "",
      raca: "",
      renda: undefined,
      endereco: {
        cep: "",
        rua: "",
        bairro: "",
        cidade: "",
        estado: ""
      }
    }
  }),
  watch: {
    usuario: function(value) {
      this.$data.usuario = value;
    }
  },
  methods: {
    goToHome() {
      this.$router.push("/");
    },
    save() {
      this.$refs.form.validate();
       if(this.$data.option){
        this.$data.usuario.raca = this.$data.option;
      }
      console.log("Usuário: ", this.$data.usuario);
    },
    limpar(){
      this.$refs.form.reset();
    },
    getCep() {
      const cep = this.$data.usuario.endereco.cep;
      const str = cep.replace(/\./g, "").replace(/\-/g, "");
      api
        .getAddressByCep(str)
        .then(response => {
          if (response.data.status === 200) {
            this.$data.usuario.endereco.rua = response.data.address;
            this.$data.usuario.endereco.bairro = response.data.district;
            this.$data.usuario.endereco.cidade = response.data.city;
            this.$data.usuario.endereco.estado = response.data.state;
          }
        })
        .catch(err => {
          console.log("error getCep", err);
        });
    },
    validateName(){
      const name = this.$data.usuario.nome;
      if(name){
        if(!name.match(/^((\b[A-zÀ-ú']{2,40}\b)\s*){2,}$/)){
          this.$data.nameRules = [v => "Nome tem que ser completo"];
        }else{
          this.$data.nameRules = [v => !!v];
        }
      }
    },
    formatCep() {
      let cep = this.$data.usuario.endereco.cep;

      if(cep){
         const str = cep.replace(/\./g, "").replace(/\-/g, "");
          console.log(str);
          if (isNaN(str)) {
            this.$data.cepRules = [v => "Somente números são permitidos"];
          } else {
            this.$data.cepRules = [v => !!v];
          }

          if (cep.length === 2) {
            this.$data.usuario.endereco.cep += ".";
          }
          if (cep.length === 6) {
            this.$data.usuario.endereco.cep += "-";
          }
      }
    },
    formatNascimento() {
      let nasc = this.$data.usuario.nascimento;

      if(nasc){
          const str = nasc.replace(/\//g, "");
        if (isNaN(str)) {
          this.$data.nascimentoRules = [v => "Somente números são permitidos"];
        } else {
          this.$data.nascimentoRules = [v => !!v];
        }
      }

      if (nasc && nasc.length === 2) {
        this.$data.usuario.nascimento += "/";
      }
      if (nasc && nasc.length === 5) {
        this.$data.usuario.nascimento += "/";
      }

      if (nasc && nasc.length === 10) {
        const valid = this.verifyNasc(nasc);
      }
    },
    verifyNasc(data) {
      data = data.replace(/\//g, "-");
      let data_array = data.split("-");

      if (data_array[0].length != 4) {
        data = data_array[2] + "-" + data_array[1] + "-" + data_array[0];
      }

      let hoje = new Date();
      let nasc = new Date(data);
      let idade = hoje.getFullYear() - nasc.getFullYear();
      let m = hoje.getMonth() - nasc.getMonth();
      if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) idade--;

      if (idade < 18) {
        this.$data.nascimentoRules = [
          v => "Pessoas menores de 18 não podem se cadastrar."
        ];
      }

      if (idade >= 18 && idade > 65) {
        this.$data.nascimentoRules = [
          v => "Pessoas maiores de 65 não podem se cadastrar."
        ];
      }
    },
    formarCpf() {
      let cpf = this.$data.usuario.cpf;

      if(cpf){
        const str = cpf.replace(/\./g, "").replace(/\-/g, "");
        if (isNaN(str)) {
          this.$data.cpfRules = [v => "Somente números são permitidos"];
        } else {
          this.$data.cpfRules = [v => !!v];
        }

        if (cpf.length === 3) {
          this.$data.usuario.cpf += ".";
        }
        if (cpf.length === 7) {
          this.$data.usuario.cpf += ".";
        }
        if (cpf.length === 11) {
          this.$data.usuario.cpf += "-";
        }

        if(cpf.length === 14){
          const valid = this.validateCpf();
          console.log("VALID", valid);
          if(!valid){
            this.$data.cpfRules = [v => "CPF inválido"];
          }
        }
      }
     
    },
    validateCpf(){
       const cpf = this.$data.usuario.cpf;
       if(cpf.length === 14){
          const strCpf = cpf.replaceAll(".", "").replace("-", "");

          if(strCpf === "22222222222" || strCpf === "33333333333" || strCpf === "44444444444" ||
          strCpf === "55555555555" || strCpf === "66666666666" || strCpf === "77777777777" || strCpf === "88888888888" ||
          strCpf === "99999999999"){
            return false;
          }

          let soma;
          let resto;
          soma = 0;
          if (strCpf == "00000000000") {
              return false;
          }

          for (let i = 1; i <= 9; i++) {
              soma = soma + parseInt(strCpf.substring(i - 1, i)) * (11 - i);
          }

          resto = soma % 11;

          if (resto == 10 || resto == 11 || resto < 2) {
              resto = 0;
          } else {
              resto = 11 - resto;
          }

          if (resto != parseInt(strCpf.substring(9, 10))) {
              return false;
          }

          soma = 0;

          for (let i = 1; i <= 10; i++) {
              soma = soma + parseInt(strCpf.substring(i - 1, i)) * (12 - i);
          }
          resto = soma % 11;

          if (resto == 10 || resto == 11 || resto < 2) {
              resto = 0;
          } else {
              resto = 11 - resto;
          }

          if (resto != parseInt(strCpf.substring(10, 11))) {
              return false;
          }

          return true;
                }
    },
    formatRenda() {
      let renda = this.$data.usuario.renda;
      if(renda){
        let rendaFormat = renda
        .split("")
        .filter(s => /\d/.test(s))
        .join("")
        .padStart(3, "0");
        const digitsFloat = rendaFormat.slice(0, -2) + "." + renda.slice(-2);
        this.$data.usuario.renda = this.maskCurrency(digitsFloat);
        this.validateRenda(this.$data.usuario.renda);
      }
      
    },
    maskCurrency(valor) {
      const locale = "pt-BR",
        currency = "BRL";
      return new Intl.NumberFormat(locale, {
        style: "currency",
        currency
      }).format(valor);
    },
    validateRenda(value) {
      if (value === "R$ NaN") {
        this.$data.usuario.renda = "";
      }
      const length = value.length;
      const totalNum = length - 3;
      const substring = value.substr(-20, totalNum);

      const partial = substring
        .replace("R$", "")
        .replace(" ", "")
        .replace(".", "");
      if (partial < 1000) {
        this.$data.rendaRules = [
          v => "Renda não pode ser inferior a R$ 1.000,00"
        ];
      } else {
        this.$data.rendaRules = [v => !!v];
      }
    }
  }
};
</script>

<style>
</style>