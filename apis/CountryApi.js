import axios from 'axios';

export default class CountryApi{
    constructor(){
        // console.log("CountryApi Api constructor");
    }

    getAll(){
        console.log("Chamando Api getAll:: ");
        return new Promise((resolve, reject) => {
            let endpoint = "https://restcountries.eu/rest/v2/all?fields=regionalBlocs"
            axios.get(endpoint)
            .then(response => {
                resolve(response);
            }).catch(err => {
                console.error("api getAll Error:: ", err);
                reject(err);
            })
        })
    }

    getAllByRegion(region){
        console.log("Chamando Api tag getAllByRegion:: ", );
        return new Promise((resolve, reject) => {
            let endpoint = "https://restcountries.eu/rest/v2/regionalbloc/" + region
            axios.get(endpoint)
            .then(response => {
                resolve(response);
            }).catch(err => {
                console.error("api getAllByRegion Error:: ", err);
                reject(err);
            })
        })
    }

    getByCountryName(name){
        console.log("Chamando Api getByCountryName:: ", );
        return new Promise((resolve, reject) => {
            let endpoint = "https://restcountries.eu/rest/v2/name/" + name
            axios.get(endpoint)
            .then(response => {
                resolve(response);
            }).catch(err => {
                console.error("api getByCountryName Error:: ", err);
                reject(err);
            })
        })
    }

    getByLang(lang){
        console.log("Chamando Api getByLang:: ", lang);
        return new Promise((resolve, reject) => {
            let endpoint = "https://restcountries.eu/rest/v2/lang/" + lang
            axios.get(endpoint)
            .then(response => {
                resolve(response);
            }).catch(err => {
                console.error("api getByLang Error:: ", err);
                reject(err);
            })
        })
    }

}
