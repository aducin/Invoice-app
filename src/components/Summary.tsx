import React from 'react';
import { SummaryProps } from '../types/types';
import styles from '../styles/summary.module.css';

const Summary: React.FC<SummaryProps> = (props: SummaryProps) => {
    const buttonClasses = `btn btn-primary ${styles.button}`;
    const containerClasses = `container ${styles.container}`;
    const rowClasses = `row ${styles.row}`;
    return (
        <div className={containerClasses}>
            <div className={rowClasses}>
                <div className="col-xs-12 col-md-6 pull-left">
                    <label>Price Net (total)</label>
                </div>
                <div className="col-xs-12 col-md-6 pull-right text-right">
                    <h4>{props.summary.price.toFixed(2)}</h4>
                </div>
            </div>
            <div className={rowClasses}>
                <div className="col-xs-12 col-md-6 pull-left">
                    <label>Tax (total)</label>
                </div>
                <div className="col-xs-12 col-md-6 pull-right text-right">
                    <h4>{props.summary.tax.toFixed(2)}</h4>
                </div>
            </div>
            <div className={rowClasses}>
                <div className="col-xs-12 col-md-6 pull-left">
                    <label>Price Gross (total)</label>
                </div>
                <div className="col-xs-12 col-md-6 pull-right text-right">
                    <h4>{props.summary.total.toFixed(2)}</h4>
                </div>
            </div>
            <div className="row">
                <button className={buttonClasses} onClick={() => props.onInvoiceCreate()}>Create invoice</button>
            </div>
        </div>
    );
}

export default React.memo(Summary);
