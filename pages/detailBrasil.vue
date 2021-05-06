<template>
  <div class="container">
    <div class="country-title">
      <h1>Brasil</h1>
      <button @click="goToHome">Voltar</button>
    </div>
    <div class="country-infos">
      <p>name: {{infos.name}}</p>
      <p>nativeName: {{infos.nativeName}}</p>
      <p>Alpha2Code: {{infos.alpha2Code}}</p>
      <p>Alpha3Code: {{infos.alpha3Code}}</p>
      <p>altSpellings: {{infos.altSpellings}}</p>
      <p>area: {{infos.area}}</p>
      <p>borders: {{infos.borders}}</p>
      <p>callingCodes: {{infos.callingCodes}}</p>
      <p>capital: {{infos.capital}}</p>
      <p>cioc: {{infos.cioc}}</p>
      <p>currencies: {{infos.currencies}}</p>
      <p>demonym: {{infos.demonym}}</p>
      <p>flag: {{infos.flag}}</p>
      <p>gini: {{infos.gini}}</p>
      <p>languages: {{infos.languages}}</p>
      <p>latlng: {{infos.latlng}}</p>
      <p>numericCode: {{infos.numericCode}}</p>
      <p>population: {{infos.population}}</p>
      <p>region: {{infos.region}}</p>
      <p>regionalBlocs: {{infos.regionalBlocs}}</p>
      <p>subregion: {{infos.subregion}}</p>
      <p>timezones: {{infos.timezones}}</p>
      <p>topLevelDomain: {{infos.topLevelDomain}}</p>
      <p>translations: {{infos.translations}}</p>
    </div>
  </div>
</template>

<script>
import Api from '../apis/CountryApi'

const api = new Api();
export default {
    data(){
        return{
            infos: []
        }
    },
    created(){
      this.getInfosBrasil();
    },
    watch:{
      infos: function(value){
        console.log("Watch infos:: ", value);
        this.$data.infos = value;
      },
    },
    methods:{
      getInfosBrasil(){
          api.getByCountryName("Brasil")
              .then((response) => {
                  console.log("Response then infos Brasil", response);
                  this.$data.infos = response.data[0];
              }).catch(err => {
                  console.log("Erro ao retornar informações do Brasil", err);
              })
        },
        goToHome(){
          this.$router.push("/");
        }
    }
}
</script>

<style scoped>
  .container{
        background-color:rgba(202, 192, 192, 0.295);
        display: flex; 
        flex-direction: column;
        border-radius: 5px;
        padding: 10px;
        color:white;
    }
    .country-title{
      background-color: rgba(70, 66, 66, 0.295);
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      border-radius: 5px;
    }
    .country-title h1{
      color:white;
      padding:20px;
    }
    .country-infos{
      margin:20px;
    }
    .country-infos p{
      color:black;
      line-height: 2.0;
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
</style>