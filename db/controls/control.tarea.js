const Tarea = require('../models/model.tarea');

// var ObjectId = require('mongoose').Types.ObjectId; 

const crearTarea = async (desc) => {

    const tarea = new Tarea({
        descripcion: desc
    })

    await tarea.save();
}

const listarTareas = async () => {
    const tareas = await Tarea.find({},'descripcion completadaEn');
    if(tareas.length === 0) return 'No hay tareas creadas';
    return tareas;
}


const borrarTarea = async ( id ) => {
    const tarea = await Tarea.findById(id);
    if( tarea ) {
        await Tarea.findByIdAndDelete(id);
        return { descripcion } = tarea;
    }
    else {
        console.log(`La tarea con id: ${id} no existe`);
    }
}


const actualizarTarea = async ( ids = [] ) => {

    for( const id of ids ) {
        let tareaId = id;
        const tarea = await Tarea.findById(tareaId);
        if( tarea ) {
            if( !tarea.completadaEn ) {
                await Tarea.findByIdAndUpdate(tareaId, {completadaEn: new Date()});
            }
        } else {
            console.log(`La tarea con id: ${tareaId} no existe`);
        }
    }
    
    const auxtareas = await Tarea.find( {_id:  { $nin:  ids } } ).updateMany({completadaEn: null});
    //const auxtareas = await Tarea.updateOne( {_id:  { $nin:  ids } }, { set: {completadaEn: null} } );
    console.log(auxtareas);
}



module.exports = {
    crearTarea,
    listarTareas,
    borrarTarea,
    actualizarTarea
}