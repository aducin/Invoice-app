import React from 'react';
import { useMediaQuery } from 'react-responsive';
import InvoiceItemDetailsElementProps from './InvoiceItemDetailsElement';
import { InvoiceItem, InvoiceListProps } from '../types/types';
import { MOBILE_MAX_WIDTH, TAX_AMOUNT } from '../constants/constants';
import styles from '../styles/invoiceList.module.css';

const InvoiceList: React.FC<InvoiceListProps> = (props: InvoiceListProps) => {
    const header = <h2>List of assigned products:</h2>
    const headerDetails = props.summary.products > 0 ?
        <p className="pull-right">({props.summary.products} products - {props.summary.items} items)</p> :
        null;
    const mobile = useMediaQuery({ maxWidth: MOBILE_MAX_WIDTH });
    const list = (props.list as (InvoiceItem)[]).map((el: InvoiceItem, index: number) => {
        const onAmountChanged = (amount: number) => props.onItemAmountChange(el.product.id, amount);
        const onRemoved = () => props.onItemRemove(el.product.id);
        const price = el.product.price.toFixed(2);
        const tax = (el.product.price * (TAX_AMOUNT / 100)).toFixed(2);
        const total = el.product.price * el.amount;
        const totalPrice = total.toFixed(2);
        const totalTax = (total * (TAX_AMOUNT / 100)).toFixed(2);
        const elements = (
            <React.Fragment>
                <InvoiceItemDetailsElementProps mobile={mobile} label="Name" value={el.product.name} />
                <InvoiceItemDetailsElementProps mobile={mobile} label="Price (unit)" value={price} />
                <InvoiceItemDetailsElementProps mobile={mobile} label="Tax (unit)" value={tax} />
                <InvoiceItemDetailsElementProps
                    mobile={mobile}
                    label="Available"
                    value={el.product.amount.toString()}
                />
                <InvoiceItemDetailsElementProps
                    amount={el.amount}
                    mobile={mobile}
                    onAmountChanged={onAmountChanged}
                    productAmount={el.product.amount}
                />
                <InvoiceItemDetailsElementProps mobile={mobile} label="Price total" value={totalPrice} />
                <InvoiceItemDetailsElementProps mobile={mobile} label="Tax total" value={totalTax} />
                <InvoiceItemDetailsElementProps
                    mobile={mobile}
                    onRemoved={onRemoved}
                    remove={true}
                />
            </React.Fragment>
        );
        return mobile ?
            <li className={styles.mobileItem} key={index}>{elements}</li> :
            <tr key={index}>{elements}</tr>;
    });
    const content = mobile ?
        <ul className={styles.mobileList}>{list}</ul> :
        (
            <table className="table table-striped">
                <thead>
                    <tr className="text-center">
                        <th>Name</th>
                        <th>Price (unit)</th>
                        <th>Tax (unit)</th>
                        <th>Available</th>
                        <th>Amount</th>
                        <th>Price total</th>
                        <th>Tax total</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {list}
                </tbody>
            </table>
        );

    return <div>{header}{headerDetails}{content}</div>;
}

export default React.memo(InvoiceList);
