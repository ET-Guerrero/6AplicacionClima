const fs = require('fs');

const axios = require("axios");

class Busquedas {
  historial = [];
  dbPath = './db/database.json';

  constructor() {
    this.leerDB();

  }

  get historialCapitalizado(){
    return this.historial.map(el => {
      let palabras = el.split(' ');
      palabras = palabras.map( p => p[0].toUpperCase() + p.substring(1));

      return palabras.join(' ')
    })
  }

  get paramsMaxbox(){
    return {
        'access_token': process.env.MAPBOX_KEY,
        'limit': 5,
        'language': "es",
      }
  }

  get paramsWeather(){
    return {
        appid: process.env.OPENWEATHER_KEY,
        units: 'metric',
        lang: 'es'
    }
  }

  async ciudad(lugar = "") {
    try {
      //http
      // console.log('tracata',lugar)
      // const resp = await axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/Madrid.json?proximity=ip&language=es&access_token=pk.eyJ1IjoiaS1ndWVycmVybyIsImEiOiJjbGlhYWpxeTAwMWg1M2R0NHJqazN1OTU1In0.cGLS_a3yCZY6IQYoK7FzSw')
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
        params: this.paramsMaxbox
      });

      const resp = await instance.get();

      return resp.data.features.map( lugar => ({
        id: lugar.id,
        nombre: lugar.place_name,
        lng: lugar.center[0],
        lat: lugar.center[1]

      }));
      
      
    } catch (error) {
      return [];
    }
  }
  async climaLugar(lat,lon){

    try {

        const instance = axios.create({
            baseURL: `https://api.openweathermap.org/data/2.5/weather`,
            params: {...this.paramsWeather, lat, lon}
          })

        const resp = await instance.get();
        const{weather, main} = resp.data

        return {
            desc: weather[0].description,
            min: main.temp_min,
            max: main.temp_max,
            temp: main.temp
        }
        
    } catch (err) {
        console.log(err)
        
    }
  
  }

  agregarHistorial(lugar =''){
    if ( this.historial.includes(lugar.toLocaleLowerCase())){
        return;
    }
    this.historial = this.historial.splice(0,5);


    this.historial.unshift(lugar.toLocaleLowerCase())

    //grabar
    this.guardarDB();

  }

  guardarDB(){

    const payload = {
      historial: this.historial
    };


    fs.writeFileSync(this.dbPath, JSON.stringify(payload))
  }

  leerDB(){

    if(!fs.existsSync(this.dbPath)) return;



    const info = fs.readFileSync(this.dbPath, {encoding: 'utf-8'});
    const data = JSON.parse(info)
    this.historial = data.historial


    // console.log(data)

    // console.log(this.historial)

  }


}


module.exports = Busquedas;
