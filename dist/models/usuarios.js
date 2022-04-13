"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Usuarios {
    constructor() {
        this.personas = [];
    }
    agregarPersona(id, nombre) {
        let persona = { id, nombre };
        this.personas.push(persona);
        return this.personas;
    }
    getPersona(id) {
        let persona = this.personas.filter(persona => { persona.id === id; })[0];
        return persona;
    }
    getPersonas() {
        return this.personas;
    }
    getPersonasPorSala(sala) {
        //...
    }
}
exports.default = Usuarios;
//# sourceMappingURL=usuarios.js.map