<template>
    <main>
        <div class="container">
            <Header></Header> 
            <div class="card">
                <card-block v-for="bloc in blocs" :key="bloc.name" :sigla="bloc"></card-block>
            </div>
        </div>
    </main>
</template>

<script lang="ts">
import Vue from 'vue'
import Api from '../apis/CountryApi'
import CardBlock from '../components/cardBlock.vue'
import Header from '../components/header.vue'

const api = new Api();
export default Vue.extend({
    components:{
        CardBlock, Header
    },
    data(){
        return{
            blocs: []
        }
    },

    created(){
        this.getAll();
    },
    watch:{
        blocs: function(value){
            this.$data.blocs = value;
        }
    },
    methods: {
        getAll(){
            api.getAll()
                .then(response => {
                    response.data.forEach(item => {
                        item.regionalBlocs.forEach(element => {
                            this.$data.blocs.push(element);
                        });
                    });
                   this.$data.blocs = this.$data.blocs.filter(function (a) {
                        return !this[JSON.stringify(a)] && (this[JSON.stringify(a)] = true);
                    }, Object.create(null));

                }).catch(err => {
                    console.log("erro getAll componente");
                })
        }
    }
})
</script>

<style lang="scss" scoped="true">
    .card{
        display: flex;
         flex-wrap: wrap;
         justify-content: left;
         margin: 20px;
    }
    .container div{
        text-align: center;
        padding: 0;
        font-size: 30px;
        border-radius: 5px;
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
    }
</style>