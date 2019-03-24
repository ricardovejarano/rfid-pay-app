export class Bill {

    constructor(
        ref = '',
        nombre = '',
        email = '',
        code = '',
        value = null,
        date = '',
    ) {
        this.ref = ref;
        this.nombre = nombre;
        this.email = email;
        this.code = code;
        this.value = value;
        this.date = date;
    }
    ref?: string;
    nombre?: string;
    email?: string;
    code?: string;
    value?: number;
    date?: string;
}
