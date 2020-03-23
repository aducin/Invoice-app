  
import React, { PureComponent } from 'react';
import store from '../store';
import { connect } from "react-redux";
import File from '../classes/File';
import Filters from '../components/Filters';
import { getProducts } from '../http/http';
import InvoiceList from '../components/InvoiceList';
import Message from '../components/Message';
import Summary from '../components/Summary';
import { StoreState as FormProps, FormState, Product } from '../types/types';
import {
    DEFAULT_OPTION,
    ERROR_BELOW_ZERO,
    ERROR_HTTP,
    ERROR_NOT_A_NUMBER,
    FILE_CREATED,
    FILE_CREATED_ERROR,
    FILTER_TIMER,
    LOADING,
    MESSAGE_NO_PRODUCT,
    MESSAGE_NO_PRODUCT_ITEM
} from '../constants/constants';
import * as actions from '../actions/formActions';

const mapStateToProps = (state: FormProps) => state;

class Form extends PureComponent<FormProps, FormState> {
    state: FormState = {
        error: false,
        filters: {
            amount: 1,
            name: '',
            selectedOption: DEFAULT_OPTION.id
        },
        loading: true,
        message: '',
        success: false
    };

    timeoutHandler: number = 0;

    componentDidMount() {
        getProducts()
            .then(response => {
                const availableProducts = response.data
                    .filter((el: Product) => el.amount >= this.state.filters.amount)
                    .sort((a: Product, b: Product) => a.name.localeCompare(b.name));
                store.dispatch(actions.setProducts(availableProducts));
                this.setState({ loading: false });
            })
            .catch(() => {
                this.setState({ error: true, loading: false, message: ERROR_HTTP });
            });
    };

    componentWillUnmount() {
        this.timeoutHandler && clearTimeout(this.timeoutHandler);
    }

    filterProducts = (state: FormState) => {
        const nameFilter = state.filters.name.toLowerCase();
        const products = this.props.productsMatrix.filter((el: Product) => {
            return el.name.toLowerCase().includes(nameFilter) && el.amount >= state.filters.amount;
        });
        store.dispatch(actions.setProducts(products));
        this.setState({ filters: { ...this.state.filters, selectedOption: 0 } });
    };

    handleAmountFilterChanged = (value: number) => {
        if (isNaN(value)) {
            this.setState({ error: true, message: ERROR_NOT_A_NUMBER });
        } else if (value < 0) {
            this.setState({ error: true, message: ERROR_BELOW_ZERO });
        } else {
            const newState = { ...this.state, filters: { ...this.state.filters, amount: value } };
            this.filterProducts(newState);
            this.setState({ filters: { ...this.state.filters, amount: newState.filters.amount } });
        }
    };

    handleInvoiceCreate = () => {
        if (this.props.invoice) {
            const file = new File(this.props.invoice);
            const result = file.createPdf();
            
            if (result.success) {
                this.setState({ error: false, message: FILE_CREATED, success: true });
            } else {
                this.setState({ error: true, message: FILE_CREATED_ERROR, success: false })
            }
        }
    };

    handleInvoiceItemAmountChanged = (id: number, amount: number) => {
        store.dispatch(actions.updateInvoiceItem(amount, id));
    };

    handleInvoiceItemRemoved = (id: number) => {
        store.dispatch(actions.removeInvoiceItem(id));
    };

    handleNameFilterChanged = (value: string) => {
        const curValue = value;
        this.timeoutHandler = window.setTimeout(() => {
            if (curValue === this.state.filters.name) {
                this.filterProducts(this.state);
            }
        }, FILTER_TIMER);
        this.setState({ filters: { ...this.state.filters, name: value } });
    };

    handleProductSelected = (event: React.FormEvent<HTMLSelectElement>) => {
        event.preventDefault();
        const selectedElement = event.target as HTMLSelectElement;
        const selectedProduct = this.props.products
            .filter((el: Product) => el.id === +selectedElement.value);
        store.dispatch(actions.setInvoice({ amount: 0, product: selectedProduct[0] }));
        this.setState({ message: '', filters: { ...this.state.filters, selectedOption: 0 } });
    };

    handleRemoveAlert = () => {
        this.setState({ error: false, loading: false, message: '', success: false});
    };

    handleRemoveInvoiceData = () => {
        store.dispatch(actions.resetInvoice());
    };

    render() {
        let invoiceList;
        let message;
        let summary;

        if (this.state.error || this.state.success) {
            message = (
                <Message
                    allowRemove={true}
                    error={this.state.error}
                    message={this.state.message}
                    onRemoveAlert={this.handleRemoveAlert}
                    success={this.state.success}
                />
            );
        }

        if (this.props.invoice) {
            const invoiceData = this.props.invoice.getData();
            const summaryData = this.props.invoice.getSummary();

            if (invoiceData.length) {
                invoiceList = (
                    <InvoiceList
                        list={invoiceData}
                        onItemAmountChange={this.handleInvoiceItemAmountChanged}
                        onItemRemove={this.handleInvoiceItemRemoved}
                        summary={summaryData}
                    />
                );
            }
            const message = invoiceData.length ? MESSAGE_NO_PRODUCT_ITEM : MESSAGE_NO_PRODUCT;
            summary = summaryData.products > 0 ?
                <Summary
                    onInvoiceCreate={this.handleInvoiceCreate}
                    onInvoiceRemove={this.handleRemoveInvoiceData}
                    summary={summaryData}
                    /> :
                <Message allowRemove={false} error={false} message={message} success={false} />;
        } else if (!this.state.error) {
            const message = this.state.loading ? LOADING : MESSAGE_NO_PRODUCT;
            summary = <Message allowRemove={false} error={false} message={message} success={false} />;
        }

        return (
            <div className="container">
                <Filters
                    filters={this.state.filters}
                    loading={this.state.loading}
                    onAmountChanged={this.handleAmountFilterChanged}
                    onNameChanged={this.handleNameFilterChanged}
                    onOptionSelected={this.handleProductSelected}
                    productsLength={this.props.products.length}
                    products={this.props.products}
                />
                {message}
                {invoiceList}
                {summary}
            </div>
        );
    }
}

export default connect(mapStateToProps)(Form);
