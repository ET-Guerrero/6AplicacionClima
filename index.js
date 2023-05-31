require('dotenv').config()

const {leerInput, inquirerMenu, pausa, listaLugares} = require('./helpers/inquirer');
const Busquedas = require('./models/busquedas');

const main = async()=>{
    let opt;
    const busqueda = new Busquedas();

    do {

        opt = await inquirerMenu();
        

        

        switch (opt) {
            case 1:
                //Mostrar mensaje
                const termino = await leerInput('Ciudad: ')
                
                
                //Buscar lugares
                const lugares = await busqueda.ciudad(termino);

                // Selecionas lugares
                const id = await listaLugares(lugares);

                if ( id === '0') continue;
                
                const lugarSl = lugares.find(el => el.id === id)
                
                busqueda.agregarHistorial(lugarSl.nombre)

                // Mostrar Datod del clima
                const clima = await busqueda.climaLugar(lugarSl.lat, lugarSl.lng);
                // console.log(clima)

                // Mostrar resultados
                console.log('Informacion de la ciudad', '\n')
                console.log('Ciudad: ', lugarSl.nombre);
                console.log('Lat', lugarSl.lat);
                console.log('Lng', lugarSl.lng);
                console.log('Temperatura', clima.temp)
                console.log('Minima', clima.min)
                console.log('Maxima', clima.max)
                console.log('Descripcion del clima:', clima.desc)

                
                break;
            case 2:
                busqueda.historialCapitalizado.forEach((lugar, i) => {
                    console.log(i+1, lugar)
                    
                });



            break;
        
            default:
                break;
        }

        
    } while (opt !== 0);

    
}

 main();