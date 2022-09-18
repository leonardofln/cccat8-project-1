// @ts-nocheck
export default class Customer {
    private firstName: string;
    private lastName: string;
    private document: string;

    constructor(firstName: string, lastName: string, document?: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.document = document;
    }

    returnsOnlyNumbers(str) {
        return str.replace(/\D/g, '');
    }

    isAllEquals(input) {
        return input.split('').every(char => char === input[0]);
    }

    validateDocument(cpf) {
        if (!cpf) return false;
        if (cpf.length < 11 || cpf.length > 14) return false;
        cpf = this.returnsOnlyNumbers(cpf);
        if (this.isAllEquals(cpf)) return false;
        try {
            let d1, d2;
            let dg1, dg2, rest;
            let digito;
            let nDigResult;
            d1 = d2 = 0;
            dg1 = dg2 = rest = 0;
            for (let nCount = 1; nCount < cpf.length - 1; nCount++) {
                digito = parseInt(cpf.substring(nCount - 1, nCount));
                d1 = d1 + (11 - nCount) * digito;
                d2 = d2 + (12 - nCount) * digito;
            };
            rest = (d1 % 11);
            dg1 = (rest < 2) ? dg1 = 0 : 11 - rest;
            d2 += 2 * dg1;
            rest = (d2 % 11);
            dg2 = (rest < 2) ? 0 : 11 - rest;
            let nDigVerific = cpf.substring(cpf.length - 2, cpf.length);
            nDigResult = "" + dg1 + "" + dg2;
            return nDigVerific == nDigResult;
        } catch (e) {
            return false;
        }
    }

    isDocumentValid() {
        return this.validateDocument(this.document);
    }
}