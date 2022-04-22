


class Usuarios {
    private personas: any[];

    constructor() {
        this.personas = [];
    }

    agregarPersona(id: string, nombre: string, sala:string) {
        let persona = { id, nombre,sala };

        this.personas.push(persona);

        return this.personas;
    }

    getPersona(id: string) {
        let persona = this.personas.filter(persona => persona.id === id)[0];

        return persona;
    }

    getPersonas() {
        return this.personas;
    }

    getPersonasPorSala(sala: any) {
        let personasEnSala = this.personas.filter(persona=> persona.sala === sala);
        return personasEnSala;
    }
    borrarPersona(id: string) {
        let personBorrada = this.getPersona(id);

        this.personas = this.personas.filter(persona => { return persona.id !== id });

        return personBorrada;
    }

}

export default Usuarios;