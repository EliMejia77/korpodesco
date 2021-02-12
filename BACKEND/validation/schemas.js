const Joi = require('@hapi/joi');

module.exports ={

    
    createUserSchema: Joi.object({
        documento: Joi.string().pattern(/^((\d{8})|(\d{10})|(\d{11})|(\d{6}-\d{5}))?$/).max(10).min(6).trim().required(),
        nombre_completo: Joi.string().trim().required(),
        correo:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).trim().required(),
        contrasena: Joi.string().min(8).pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$')).trim().required(),
        rol: Joi.string().pattern(new RegExp(/Estudiante|Administrador|Docente/)).required(),
        estado: Joi.string().pattern(/Activo|Inactivo/).required()
    }),

    createStudentSchema: Joi.object({
        documento: Joi.string().max(10).min(6).trim().required(),
        nombre_completo: Joi.string().trim().required(),
        correo:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).trim().required(),
        contrasena: Joi.string().min(8).pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$')).trim().required(),
        rol: Joi.string().pattern(new RegExp(/Estudiante|Administrador|Docente/)).required(),
        estado: Joi.string().pattern(/Activo|Inactivo/).required(),
        tipo_documento: Joi.string().pattern(/TI|CC|NUIP/).required(),
        sexo:Joi.string().pattern(/Femenino|Masculino|Otro/).required(),
        fecha_nacimiento: Joi.string().required(),
        direccion: Joi.string().required(),
        ciudad: Joi.string().trim().required(),
        telefono: Joi.string().min(7).max(7).trim().required(),
        celular: Joi.string().min(10).max(10).trim().required(),
        grado: Joi.string().min(1).max(2).trim().required(),
        url_foto: Joi.string().trim().required(),
        url_doc_identidad: Joi.string().trim().required()
    }),

    createGradesRegisterSchema: Joi.object({
        seguimiento: Joi.string().pattern(new RegExp('^(?:\d+(?:\.\d*)?|\.\d+)(?:,(?:\d+(?:\.\d*)?|\.\d+))*$')),
        autoevaluacion: Joi.string().pattern(new RegExp('^\d*\.?\d*$')),
        coevaluacion: Joi.string().pattern(new RegExp('^\d*\.?\d*$')),
        evaluacion_periodo: Joi.string().pattern(new RegExp('^\d*\.?\d*$'))
    })

};
