export class User {

    constructor(
        $key = '',
        name = '',
        email = '',
        code = '',
        uidCard = '',
        balance = null,
    ) {
        this.$key = $key;
        this.name = name;
        this.email = email;
        this.code = code;
        this.uidCard = uidCard;
        this.balance = balance;
    }
    $key?: string;
    name?: string;
    email?: string;
    code?: string;
    uidCard?: string;
    balance?: number;
}
