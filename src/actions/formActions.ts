import { InvoiceItem, Product } from '../types/types';

export const removeInvoiceItem = (id: number) => {
    return {
        type: 'removeInvoiceItem',
        payload: { id }
    }
};

export const resetInvoice = () => {
    return {
        type: 'resetInvoice',
        payload: {}
    }
};

export const setInvoice = (invoice: InvoiceItem) => {
    return {
        type: 'setInvoice',
        payload: { invoice }
    }
};

export const setProducts = (products: Product[]) => {
    return {
        type: 'setProducts',
        payload: { products }
    }
};

export const updateInvoiceItem = (amount: number, id: number) => {
    return {
        type: 'updateInvoiceItem',
        payload: { amount, id }
    }
};
