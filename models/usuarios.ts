


class Usuarios {
    private personas: any[];

    constructor() {
        this.personas = [];
    }

    agregarPersona(id: string, nombre: string) {
        let persona = { id, nombre };

        this.personas.push(persona);

        return this.personas;
    }

    getPersona(id: string) {
        let persona = this.personas.filter(persona => { persona.id === id })[0];

        return persona;
    }

    getPersonas() {
        return this.personas;
    }

    getPersonasPorSala(sala:any) {
        //...
    }

}

export default Usuarios;