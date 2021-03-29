require('colors');
const inquirer = require('inquirer');

const menuOpts = [
    {
        type: 'list',
        name: 'opcion',
        message: 'Qué desea hacer?',
        choices: [
            {
                value: '1',
                name:  `${ '1.'.green } Crear lista`
            },
            {
                value: '2',
                name: `${ '2.'.green } Listar tareas`
            },
            {
                value: '3',
                name: `${ '3.'.green } Listar tareas completadas`
            },
            {
                value: '4',
                name:  `${ '4.'.green } Listar tareas pendientes`
            },
            {
                value: '5',
                name: `${ '5.'.green } Completar tarea(s)` 
            },
            {
                value: '6',
                name: `${ '6.'.green } Borrar tarea`
            },
            {
                value: '0',
                name:  `${ '0.'.green } Salir`
            }
        ]
    }
];


const pausaQuestions = [
    {
        type: 'input',
        name: 'continuar',
        message: `Precione ${ 'ENTER'.green } para continuar`
    }
];


const inquirerMenu = async() => {

    console.log('======================='.green);
    console.log('Seleccione una opción'.cyan);
    console.log('=======================\n'.green);

    const { opcion } = await inquirer.prompt(menuOpts);
    return opcion;

}


const pausa = async () => {
    
    console.log('\n');
    await inquirer.prompt(pausaQuestions);
    console.clear();
}


const leerInput = async(mensaje) => {

    const questions = [
        {
            type: 'input',
            name: 'desc',
            message: mensaje,
            validate ( value ) {
                if(value.length === 0) {
                    return 'Por favor ingrese un valor'
                }
                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(questions);
    return desc;
}


const listadoTareasBorrar = async ( tareas = [] ) => {
    
    const choices = tareas.map( (tarea, index) => {
        
        const idx = `${index + 1}.`.green;

        return {
            value: tarea.id,
            name: `${ idx } ${ tarea.descripcion }`
        }
    });


    choices.unshift({
        value: '0',
        name: '0.'.green + 'Cancelar'
    });

    const questions = [
        {
            type: 'list',
            name: 'id',
            message: 'Que tarea desea borrar?',
            choices
        }
    ];

    const { id } = await inquirer.prompt(questions);
    return id;
}



const mostrarListadoCheckList = async ( tareas = [] ) => {
    
    const choices = tareas.map( (tarea, index) => {
        
        const idx = `${index + 1}.`.green;

        return {
            value: tarea.id,
            name: `${ idx } ${ tarea.descripcion }`,
            checked: ( tarea.completadaEn ) ? true : false
        }
    });

    const questions = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ];

    const { ids } = await inquirer.prompt(questions);
    return ids;
}


const confirmar = async ( message ) => {

    const questions = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const { ok } = await inquirer.prompt(questions);
    return ok;
}




module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    mostrarListadoCheckList,
    confirmar
}
