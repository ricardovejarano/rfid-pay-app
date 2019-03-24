export class User {

    constructor(
        name = '',
        email = '',
        code = '',
        uidCard = '',
        balance = null,
    ) {
        this.name = name;
        this.email = email;
        this.code = code;
        this.uidCard = uidCard;
        this.balance = balance;
    }
    name?: string;
    email?: string;
    code?: string;
    uidCard?: string;
    balance?: number;
}
