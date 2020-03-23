import { Product, StoreState, ReducerAction } from '../types/types';
import { InvoiceItem } from '../types/types';
import Invoice from '../classes/Invoice';

const defaultState = {
    initialised: false,
    invoice: null,
    products: [],
    productsMatrix: []
};

export const formReducer = (state: StoreState = defaultState, action: ReducerAction) => {
    switch(action.type) {
        case "removeInvoiceItem": {
            const invoice = state.invoice!.getData().filter((el: InvoiceItem) => el.product.id !== action.payload.id);
            const products = state.productsMatrix.filter((el: Product) => {
                const invoiceIndex = invoice.findIndex((invoiceItem: InvoiceItem) => {
                    return invoiceItem.product.id === el.id;
                });
                return invoiceIndex === -1;
            });
            state = { ...state, invoice: new Invoice(invoice), products };
            break;
        }
        case "resetInvoice": {
            state = { ...state, invoice: null };
            break;
        }
        case "setInvoice": {
            const products = state.products.filter((el: Product) => el.id !== action.payload.invoice?.product.id);
            const invoice = state.invoice ?
                new Invoice([...state.invoice.getData(), action.payload.invoice!]) :
                new Invoice([action.payload.invoice!]);
            state = { ...state, invoice, products };
            break;
        }
        case "setProducts": {
            const products = action.payload.products!;
            const productsMatrix = state.initialised ? state.productsMatrix : [...products];
            state = { ...state, initialised: true, products, productsMatrix };
            break;
        }
        case "updateInvoiceItem": {
            const invoice = state.invoice!.getData();
            const invoiceIndex = invoice.findIndex((el: InvoiceItem) => el.product.id === action.payload.id);

            if (invoiceIndex !== -1) {
                invoice[invoiceIndex].amount = action.payload.amount!;
            }
            state = { ...state, invoice: new Invoice(state.invoice!.getData()) };
            break;
        }
    }
    return state;
};
