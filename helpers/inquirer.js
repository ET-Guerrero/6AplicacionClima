const inquirer = require('inquirer');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Que quieres?',
        choices: [
            {
                value: 1,
                name: '1. Buscar ciudad'
            },
            {
                value: 2,
                name: '2. Historial'
            },
            {
                value: 0,
                name: '3. Salir'
            }
            
            
        ]

    }
]



const inquirerMenu = async() =>{    
    console.log('-----------Seleccione opcion-------------\n')
    const {opcion} = await inquirer.prompt(preguntas);
    return opcion;
}

const pausa = async()=> {

    const question = [
        {
            type: 'input',
            name: 'Continuar',
            message: 'Pulsar ENTER, solo si tu quieres continuar',
            choices: ['Enter']
    
        }
    
    ]
    await inquirer.prompt(question)
}

const leerInput = async( message )=> {

    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value){
                if (value.length === 0) {
                    return 'Ingrese un valor por favor';                    
                }
                return true;
            }
    
        }
    
    ]

    const {desc} = await inquirer.prompt(question);
    return desc;
}


const listaLugares = async(lugares=[])=> {

    const choices = lugares.map((lugar, i) => {

        const idx = `${i + 1}`
        return {
            value: lugar.id,
            name: `${idx} ${lugar.nombre}` 
        }
    })

    choices.unshift({
        value: '0',
        name:'0 ' + 'Cancelar'
    })

    const pregutas = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione lugar',
            choices
        }
    ]

    const {id} = await inquirer.prompt(pregutas);
    return id;    
}

const mostrarListadoChecklist = async(tareas=[])=> {

    const choices = tareas.map((tarea, i) => {

        const idx = `${i + 1}`
        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: (tarea.completadoEn)?  true : false
        }
    })

    // choices.unshift({
    //     value: '0',
    //     name:'0 ' + 'Cancelar'
    // })

    const pregutas = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ]

    const {ids} = await inquirer.prompt(pregutas);
    return ids;    
}

const confirmar = async(message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const {ok} = await inquirer.prompt(question)
    return ok;
}
module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listaLugares,
    confirmar,
    mostrarListadoChecklist
}