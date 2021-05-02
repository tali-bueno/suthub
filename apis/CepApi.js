import axios from 'axios';

export default class CepApi{
    constructor(){
        console.log("CepApi Api constructor");
    }

    getAddressByCep(cep){
        return new Promise((resolve, reject) => {
            let endpoint = "https://ws.apicep.com/cep.[format]?code=" + cep
            axios.get(endpoint)
            .then(response => {
                    resolve(response);
            }).catch(err => {
                console.error("api getAddressByCep Error:: ", err);
                reject(err);
            })
        })
    }
}