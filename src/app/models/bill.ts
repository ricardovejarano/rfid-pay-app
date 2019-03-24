export class Bill {

    constructor(
        ref = '',
        name = '',
        email = '',
        code = '',
        value = null,
        date = '',
    ) {
        this.ref = ref;
        this.name = name;
        this.email = email;
        this.code = code;
        this.value = value;
        this.date = date;
    }
    ref?: string;
    name?: string;
    email?: string;
    code?: string;
    value?: number;
    date?: string;
}
