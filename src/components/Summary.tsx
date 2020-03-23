import React from 'react';
import { SummaryProps } from '../types/types';
import styles from '../styles/summary.module.css';

const Summary: React.FC<SummaryProps> = (props: SummaryProps) => {
    const buttonCreateClasses = `btn btn-primary ${styles.button}`;
    const buttonResetClasses = `btn btn-danger ${styles.button}`;
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
                <div className="col-xs-12 col-md-6 pull-left">
                    <button
                        className={buttonCreateClasses}
                        onClick={() => props.onInvoiceCreate()}
                    >Create invoice</button>
                </div>
                <div className="col-xs-12 col-md-6 pull-right">
                    <button
                        className={buttonResetClasses}
                        onClick={() => props.onInvoiceRemove()}
                    >Reset</button>
                </div>
            </div>
        </div>
    );
}

export default React.memo(Summary);
