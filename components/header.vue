<template>
    <div class="menu">
        <h1 class="title-initial">Blocos Regionais</h1>
        <button @click="goTo">Cadastro</button>
        <button @click="getDetailsBrasil">Dados do Brasil</button>
        <div class="input-icon" @click="getByName">
            <input v-model="name" v-on:keyup.enter="getByName" placeholder="Busque o País"/>
        </div>

        <modal v-if="status">
            <template v-slot:header>
                <p class="parag">Foram encontrados {{countries.length}} resultado(s) para "{{search}}"</p>
                <button class="btn-close" @click="closeModal()">
                    <p>X</p>
                </button>
            </template>

            <template v-slot:body>
                <div class="unit" v-for="country in countries" :key="country.name">
                    <div class="name">
                        <p class="parag">Nome:</p>
                        <p class="country-name">{{country.name}}</p>
                    </div>
                    <div class="list-languages">
                        <p class="parag">Idiomas oficiais do país:</p>
                        <div v-for="lan in country.languages" :key="lan.iso639_1">
                            <button @click="getCountriesByLanguage(lan, country.name)" class="lan-btn"> <p>{{lan.name}}</p> </button>
                        </div>
                        <div class="list" v-if="country.state && state">
                            <button class="btn-close-list" @click="country.state = false">
                                <p>X</p>
                            </button>
                            <p  class="parag">Países com o idioma: </p>
                            <div class="separator"></div>
                            <p class="parag" v-for="item in listCountries" :key="item.name">{{item.name}}</p>
                        </div>
                    </div>
                </div>
            </template>
        </modal>
    
    </div>
</template>
<script>
import Api from '../apis/CountryApi';
import Modal from '../components/modal.vue';

const api = new Api();
export default {
    components:{
        Modal
    },
    data(){
        return{
            name: "",
            status: false,
            countries:[],
            state:true,
            listCountries: [],
            search: ""
        }
    },
    watch:{
        name:function(value){
            this.$data.name = value;
        },
        countries:function(value){
            this.$data.countries = value;
        },
        status:function(value){
            this.$data.status = value;
        },
        state:function(value){
            this.$data.state = value;
            console.log("state", this.$data.state);
        }
    },
    methods:{
        getDetailsBrasil(){
            this.$router.push("/detailBrasil");
        },
        goTo(){
             this.$router.push("/cadastro");
        },
        getByName(){
            if(this.$data.name){
                api.getByCountryName(this.$data.name)
                .then((response) => {
                    console.log("response", response);
                    response.data.forEach(element => {
                        const country = {
                            name: element.name,
                            languages: element.languages,
                            state: false
                        }
                        this.$data.countries.push(country);
                    });
                    this.$data.status = true;
                    this.$data.search = this.$data.name
                    this.$data.name = "";
                     console.log("response countries", this.$data.countries);
                     console.log("response status", this.$data.status);
                }).catch(err => {
                    console.log("err getByName", err);
                })
            }
        },
        closeModal(){
            this.$data.status = false;
            this.$data.countries = [];
        },
        getCountriesByLanguage(lan, country){
            const language = lan.iso639_1;
            this.$data.state = false;
            api.getByLang(language)
                .then(response => {
                    console.log("response getByLan", response);
                    this.$data.listCountries = response.data;
                    this.$data.state = true;
                    this.$data.countries.forEach(item => {
                        if(item.name === country){
                            item.state = true;
                        }else{
                            item.state = false;
                        }
                    })
                }).catch(err => {
                    console.log("err getByLang", err);
                })
        }
    }
}
</script>

<style scoped>
    .list{
        background-color: rgba(202, 192, 192, 0.295);
        margin:10px;
        border-radius:5px;
    }
    .lan-btn{
       background-color: transparent;
       border: solid 1px blue;
       color:blue;
       width:100px;
       height: 40px; 
    }
    .lan-btn p{
        font-size:14px;
        outline: none;
    }
    .list-languages{
       display:flex;
       flex-direction: column; 
       text-align: left;
       margin-top: 20px;
    }
    .name{
     display: flex;   
    }
    .unit{
      border: solid 1px;  
    }
    .country-name{
        font-size: 18px;
        margin-top: 8px;
        margin-left: 10px;
    }
    .separator{
        width: 100%;
        height: 1px;
        background-color: black;
        margin-top: 10px;
    }
    .btn-close{
      background-color: white;
      border:none;
      outline: none;
      cursor: pointer;
      width: 20px;
      height: 20px;
      margin-top: 0px;
    }
    .btn-close p{
      font-size: 16px;
      color:black;
    }
    .btn-close-list{
      background-color: transparent;
      border:none;
      outline: none;
      cursor: pointer;
      width: 100%;
      height: 20px;
      margin-top: 0px;
      color: black;
      padding-right: 40px;
      text-align: right;
      margin:0px;
      font-size:14px;
    }
    .parag{
        font-size:14px;
        margin-top:10px;
        margin-left: 10px;
    }
    .option{
        font-size: 12px;
    }
    .menu{
        background-color: rgba(70, 66, 66, 0.295);
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }
    input{
        width: 190px;
        border-radius:4px;
        outline: none;
        background-color:white;
        height: 40px;
        background-image: url("./assets/images/lupa-cinza.png");
        background-size: 24px;
        background-position-x: 160px;
        background-position-y: center;
        background-repeat: no-repeat;
        font-size:14px;
    }
    .input-icon input{
        padding-left: 10px;
        border: 0;
    }
    .input-icon{
        margin:20px;
    }
    button{
        width: 200px; 
        height: 40px; 
        margin:20px; 
        background-color: #1E90FF;
        color:white; 
        border:0px; 
        border-radius:4px;
        cursor:pointer;
        font-size:14px;
    } 
    .title-initial{
        color:white;
        margin:20px; 
    }

</style>