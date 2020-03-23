import React from 'react';
import { InvoiceItemDetailsElementProps as Props } from '../types/types';
import styles from '../styles/invoiceItemDetailsElement.module.css';

const InvoiceItemDetailsElement: React.FC<Props> = (props: Props) => {
    if (props.productAmount && props.onAmountChanged) {
        const leftIconClasses = `fa fa-minus fa-lg pull-left ${styles.icon} ${styles.iconLeft}`;
        const rightIconClasses = `fa fa-plus fa-lg ${styles.icon} ${styles.iconRight}`;
        const amount = props.amount || 0;
        const subtract = amount > 0 ?
            <i className={leftIconClasses} onClick={() => props.onAmountChanged!(amount - 1)} /> :
            null;
        const add = amount < props.productAmount ?
            <i className={rightIconClasses} onClick={() => props.onAmountChanged!(amount + 1)} /> :
            null;
        const content = (
            <React.Fragment>
                <span className="col-xs-4">{subtract}</span>
                <span className="col-xs-4">{amount}</span>
                <span className="col-xs-4">{add}</span>
            </React.Fragment>
        );

        return props.mobile ?
            (
                <p className="text-center">
                    <label>Amount:</label>
                    {content}
                </p>
            ) :
            <th className={styles.amountContainer}>{content}</th>;
    } else if (props.remove && props.onRemoved) {
        const iconClasses = `fa fa-trash fa-2x ${styles.iconDelete}`;
        const content = <i className={iconClasses} onClick={() => props.onRemoved!()} />
        return props.mobile ? <p>{content}</p> : <th>{content}</th>;
    } else {
        return props.mobile ?
            (
                <p>
                    <label>{props.label}:</label>
                    <span className="pull-right">{props.value}</span>
                </p>
            ) :
            <th className="text-center">{props.value}</th>;
    }
}

export default React.memo(InvoiceItemDetailsElement);
