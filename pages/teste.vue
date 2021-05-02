<template>
<v-app>
  <v-card class="mx-auto" max-width="500" min-width="500">
    <v-card-text class="pb-0">
      <p>Dados Pessoais</p>
    </v-card-text>
    <v-form
    ref="form"
    v-model="valid"
    lazy-validation
    class="ma-3"
  >
    <v-text-field
      v-model="usuario.nome"
      :rules="nameRules"
      label="Nome"
      required
      outlined
    ></v-text-field>

    <v-text-field
      v-model="data"
      label="Data de nascimento"
      :rules="[v => !!v || 'Campo obrigatório']"
      required
      outlined
    ></v-text-field>

    <v-text-field
      v-model="usuario.cpf"
      label="CPF"
      :rules="[v => !!v || 'Campo obrigatório']"
      required
      type="number"
      outlined
    ></v-text-field>

    <v-select
      v-model="usuario.especie"
      :items="especie"
      :rules="[v => !!v || 'Campo obrigatório']"
      label="Selecione a espécie"
      required
      outlined
    ></v-select>
    <v-select
      v-model="usuario.raca"
      :items="usuario.especie === 'gato'? racaGato : racaCao"
      :rules="[v => !!v || 'Campo obrigatório']"
      label="Selecione a raça"
      required
      outlined
    ></v-select>

    <v-text-field
      v-show="usuario.raca === 'outro'"
      v-model="option"
      label="Insira a raça"
      required
      outlined
    ></v-text-field>

    <v-text-field
      v-model="usuario.renda"
      label="Renda"
      prefix="R$"
      type="number"
      min="1000"
      :rules="[v => !!v || 'Campo obrigatório', v => !!v < 1.000 || 'Valor mínimo 1000']"
      required
      outlined
    ></v-text-field>

    <v-card-text class="pb-0">
      <p>Endereço</p>
    </v-card-text>

    <v-text-field
      v-model="usuario.endereco.cep"
      label="Cep"
      type="number"
      outlined
    ></v-text-field>

    <v-text-field
      v-model="usuario.endereco.rua"
      label="Rua"
      outlined
    ></v-text-field>

    <v-text-field
      v-model="usuario.endereco.bairro"
      label="Bairro"
      outlined
    ></v-text-field>

     <v-text-field
      v-model="usuario.endereco.cidade"
      label="Cidade"
      outlined
    ></v-text-field>

    <v-text-field
      v-model="usuario.endereco.estado"
      label="Estado"
      :rules="[v => !!v || 'Campo obrigatório']"
      maxlength="2"
      outlined
      oninput="this.value = this.value.toUpperCase()"
    ></v-text-field>

    <v-btn
      :disabled="!valid"
      color="info"
      class="mr-4"
      @click="save"
    >
      Enviar
    </v-btn>

  </v-form>
  </v-card>
</v-app>
</template>

<script>
  export default {
    data: () => ({
      data: "dd/mm/aaaa",
      option: "",
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Campo nome é obrigatório',
        v => !!v.match(/^((\b[A-zÀ-ú']{2,40}\b)\s*){2,}$/) || 'Nome tem que ser completo',
      ],
      especie:["cão", "gato"],
      racaCao:["Labrador", "Shitsu", "Poodle", "Buldogue", "Pug", "outro"],
      racaGato:["Siamês", "Angorá", "Persa", "Maine Coon", "Sphynx", "outro"],
      usuario: {
          nome: "",
          nascimento: "",
          cpf: "",
          especie: "",
          raca: "",
          renda: 0,
          endereco:{
              rua: "",
              bairro: "",
              cidade: "",
              estado: ""
          }
      }

    }),

    methods: {
      save () {
        this.$refs.form.validate()
      }
    },
  }
</script>

<style>
  
</style>