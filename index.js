require('colors');
const dateFormat = require("dateformat");
//const { monstrarMenu, pausa } = require('./helpers/mensajes'); 
const { inquirerMenu, pausa, leerInput, listadoTareasBorrar, mostrarListadoCheckList, confirmar } = require('./helpers/inquirer');
const { dbConection, dbDisconect } = require('./db/conection');
const { crearTarea, listarTareas, borrarTarea, actualizarTarea } = require('./db/controls/control.tarea');

console.clear();


const conexionDB = async() => {
    await dbConection();
}

const main = async() => {
    
    let opt = '';
    
    do {
        opt = await inquirerMenu();
        const tareas = await listarTareas();

        switch (opt) {
            case '1':
                const desc = await leerInput('Descripción: '); 
                await crearTarea(desc);
            break;

            case '2':
                console.log('\n');
                Object.keys(tareas).forEach ( (key, index) => {
                    
                    const tarea = tareas[key];
                    const posicion = `${ index + 1 }`.green;
                    const { descripcion, completadaEn } = tarea;
                    const estado = ( completadaEn )
                                    ? 'Completada'.green
                                    : 'Pendiente'.red;

                    console.log(`${ posicion } ${ descripcion } :: ${ estado }`);
                });
            break;

            case '3':
                listarCompletadasPendientes(tareas, true);
            break;

            case '4':
                listarCompletadasPendientes(tareas, false);
            break;


            case '5':
                const ids = await mostrarListadoCheckList(tareas);
                await actualizarTarea(ids);
            break;

                
            case '6':
                const idTarea = await listadoTareasBorrar(tareas);

                if(idTarea !== '0') {
                    const mensaje = '¿Esta seguro de borrar la tarea?';
                    const ok = await confirmar(mensaje);
                    if( ok ) {
                        await borrarTarea(idTarea);
                        console.log('La tarea fue eliminado correctamente');
                    }
                }
            break;
        }

        await pausa();

        if(opt === '0') await dbDisconect();

    } while ( opt !== '0' );
}

const listarCompletadasPendientes = ( tareas, completadas = true ) => {
    console.log('\n');
    let posicion = 0;
    Object.keys(tareas).forEach ( key => {
                    
        const tarea = tareas[key];
        const { descripcion, completadaEn } = tarea;
        const estado = ( completadaEn )
                        ? 'Completada'.green
                        : 'Pendiente'.red;

        if(completadas) {
            if(completadaEn) {
                posicion += 1;
                console.log(`${ (posicion + '.').green } ${ descripcion } :: Completa en: ${ dateFormat(completadaEn, 'fullDate').yellow }`);
            }
        }
        else {
            if(!completadaEn) {
                posicion += 1;
                console.log(`${ (posicion + '.').green } ${ descripcion } :: ${ estado }`);
            }
        }
    })
}

conexionDB();
main();