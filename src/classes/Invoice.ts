import { InvoiceItem, Summary } from '../types/types';
import { TAX_AMOUNT } from '../constants/constants';

export default class Invoice {
    _data: InvoiceItem[];
    _summary: Summary;

    constructor(data: InvoiceItem[]) {
        this._data = data;
        this._summary = this.setSummary();
    }

    getData() {
        return this._data;
    }

    getSummary() {
        return this._summary;
    }

    setSummary() {
        return this._data.reduce((result: Summary, el: InvoiceItem) => {
            if (el.amount > 0) {
                const price = result.price + el.product.price * el.amount;
                const tax = price * (TAX_AMOUNT / 100);
                return {
                    items: result.items + el.amount,
                    price,
                    products: result.products + 1,
                    tax,
                    total: price + tax
                }
            }
            return result;
        }, { items: 0, price: 0, products: 0, tax: 0, total: 0 });
    }
};
