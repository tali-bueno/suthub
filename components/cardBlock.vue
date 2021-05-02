<template>
  <div >
    <div class="block-region" @click="getCountries(sigla.acronym)">
      <div class="title">
        <p class="sigla">{{sigla.acronym}}</p>
         <p class="country-name">{{sigla.name}}</p>
      </div>
      <div class="details">
        <p>Ver Países</p>
      </div>
    </div>

    <modal v-if="status">
      <template v-slot:header>
        <h1>{{region}} - Países</h1>
        <button class="btn-close" @click="closeModal()">
            <p>X</p>
        </button>
      </template>

      <template v-slot:body>
        <div class="line"></div>
        <div class="subtitle-modal">
          <p>País</p>
          <p>Coordenadas</p>
        </div>
        <div v-for="country in countries" :key="country.name" class="coorder">
          <p class="">{{country.name}}</p>
          <p>Lat: {{country.latlng[0]}} Long: {{country.latlng[1]}}</p>
        </div>
      </template>
    </modal>

  </div>
</template>

<script>
import Api from '../apis/CountryApi';
import Modal from "./modal.vue";

const api = new Api();
export default {
  components:{
    Modal
  },
  props:{
      sigla:{
      type: Object,
      required: false
    }
  },
  data(){
    return{
      status:false,
      countries: [],
      region: ""
    }
  },
  watch:{
    status: function(value){
      console.log("watch status", value);
      this.$data.status = value;
    },
    countries: function(value){
      console.log("Watch countries", value);
      this.$data.countries = value;
    }
  },
  methods:{
    getCountries(bloc){
      console.log("getCountries", bloc);
      api.getAllByRegion(bloc)
        .then((response) => {
          console.log("response then getAllByRegion", response);
          this.$data.region = bloc;
          this.$data.countries = response.data;
          this.$data.status = true;
        }).catch(err => {
          console.log("erro getCountries", err);
        })
    },
    closeModal(){
      this.$data.status = false;
    }
  }
}
</script>

<style scoped>
    .btn-close{
      background-color: white;
      border:none;
      outline: none;
      cursor: pointer;
    }
    .btn-close p{
      font-size: 16px;
    }
    .line{
      width:100%;
      height: 3px;
      background-color: black;
    }
    .subtitle-modal{
      width:100%;
      display:grid;
      grid-template-columns: 50% 50%;
      text-align: left;
      padding-top: 10px;
      padding-bottom: 10px;
    }
    .subtitle-modal p{
      font-size: 16px;
      font-weight: 600;
    }
    .coorder{
      width:100%;
      display:grid;
      grid-template-columns: 50% 50%;
      text-align: left;
      line-height: 2;
    }
    .coorder p{
      font-size:13px;
    }
    .title{
      height: 100px;
    }
    .sigla{
      font-size: 20px;
    }
    .country-name{
      font-size: 12px;
    }
    .details{
      background-color: #1E90FF;
      height: 52px;
      width: 195px;
      border-top-left-radius: 0px !important;
      border-top-right-radius: 0px !important;
       border-radius: 5px;
    }
    .details p{
      font-size: 16px;
      color: white;
      padding:10px;
    }
    .block-region{
        width: 195px; 
        background-color: white; 
        margin:10px;
        box-shadow: 0 12px 20px rgba(71, 70, 70, 0.1), 0 4px 4px rgba(71, 70, 70, 0.23);
        padding-top:20px;
        cursor:pointer;
        font-size: 30px;
        border-radius: 5px;
    }
    
</style>