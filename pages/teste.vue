<template>
  <v-app>
    <v-card class="mx-auto" max-width="500" min-width="500">
      <v-card-text class="pb-0">
        <p>Dados Pessoais</p>
      </v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation class="ma-3">
        <v-text-field v-model="usuario.nome" :rules="nameRules" label="Nome" required outlined></v-text-field>

        <v-text-field
          v-model="usuario.nascimento"
          label="Data de nascimento"
          :rules="nascimentoRules"
          @input="formatNascimento"
          required
          outlined
        ></v-text-field>

        <v-text-field
          v-model="usuario.cpf"
          label="CPF"
          :rules="cpfRules"
          required
          type="number"
          outlined
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
          prefix="R$"
          type="number"
          min="1000"
          :rules="rendaRules"
          required
          outlined
        ></v-text-field>

        <v-card-text class="pb-0">
          <p>Endereço</p>
        </v-card-text>

        <v-text-field
          v-model="usuario.endereco.cep"
          required
          label="Cep"
          outlined
          :append-icon="'mdi-send'"
          @click:append="getCep"
          @input="formatCep"
          :rules="cepRules"
        ></v-text-field>

        <v-text-field v-model="usuario.endereco.rua" label="Rua" :rules="basicRules" outlined></v-text-field>
        <v-text-field v-model="usuario.endereco.bairro" label="Bairro" :rules="basicRules" outlined></v-text-field>
        <v-text-field v-model="usuario.endereco.cidade" label="Cidade" :rules="basicRules" outlined></v-text-field>

        <v-text-field
          v-model="usuario.endereco.estado"
          label="Estado"
          :rules="estadoRules"
          maxlength="2"
          outlined
          oninput="this.value = this.value.toUpperCase()"
        ></v-text-field>

        <v-btn :disabled="!valid" color="info" class="mr-4" @click="save">Enviar</v-btn>
      </v-form>
    </v-card>
  </v-app>
</template>

<script>
import CepApi from "../apis/CepApi";

const api = new CepApi();
export default {
  data: () => ({
    option: "",
    valid: true,
    name: "",
    basicRules: [v => !!v || "Campo obrigatório"],
    nameRules: [
      v => !!v || "Campo nome é obrigatório",
      v =>
        !!v.match(/^((\b[A-zÀ-ú']{2,40}\b)\s*){2,}$/) ||
        "Nome tem que ser completo"
    ],
    nascimentoRules: [
      v => !!v || "Campo obrigatório",
      v => !!isNaN(v) === false || "Somente números são permitidos"
    ],
    cpfRules: [v => !!v || "Campo obrigatório"],
    especieRules: [v => !!v || "Campo obrigatório"],
    racaRules: [v => !!v || "Campo obrigatório"],
    outroRules: [v => !!v || "Campo obrigatório"],
    rendaRules: [
      v => !!v || "Campo obrigatório",
      v => !!v < 1.0 || "Valor mínimo 1000"
    ],
    cepRules: [
      v => !!v || "Campo obrigatório",
      v => !!isNaN(v) === false || "Somente números são permitidos"
    ],
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
      renda: "",
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
    save() {
      this.$refs.form.validate();
    },
    getCep() {
      const cep = this.$data.usuario.endereco.cep;
      api
        .getAddressByCep(cep)
        .then(response => {
          console.log("Response then getCep", response);
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
    formatCep() {
      console.log("format");
      let cep = this.$data.usuario.endereco.cep;
      if (cep.length === 2) {
        this.$data.usuario.endereco.cep += ".";
      }
      if (cep.length === 6) {
        this.$data.usuario.endereco.cep += "-";
      }
    },
    formatNascimento() {
      let nasc = this.$data.usuario.nascimento;
      if (nasc.length === 2) {
        this.$data.usuario.nascimento += "/";
      }
      if (nasc.length === 5) {
        this.$data.usuario.nascimento += "/";
      }

      if(nasc.length === 10){
        const valid = this.verifyNasc(nasc);
      }
    },
    verifyNasc(data){
       data = data.replace(/\//g, "-");
       var data_array = data.split("-");

       if(data_array[0].length != 4){
        data = data_array[2]+"-"+data_array[1]+"-"+data_array[0];
      }

      var hoje = new Date();
      var nasc  = new Date(data);
      var idade = hoje.getFullYear() - nasc.getFullYear();
      var m = hoje.getMonth() - nasc.getMonth();
      if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) idade--;
      
      if(idade < 18){
          this.$data.nascimentoRules = [v => "Pessoas menores de 18 não podem se cadastrar."];
      }

      if(idade >= 18 && idade > 65){
          this.$data.nascimentoRules = [v => "Pessoas maiores de 65 não podem se cadastrar."];
      }

    }
  }
};
</script>

<style>
</style>