import React from 'react';
import { FiltersProps } from '../types/types';
import { DEFAULT_OPTION } from '../constants/constants';
import styles from '../styles/filters.module.css';

const Filters: React.FC<FiltersProps> = (props: FiltersProps) => {
    const productsList = [DEFAULT_OPTION].concat(props.products).map((el, index) => {
        return <option key={ index } value={ el.id }>{ el.name }</option>;
    });
    const amountContainerClasses = `row ${styles.amountContainer}`;
    const iconContainerClasses = `col-xs-12 col-md-2 ${styles.iconContainer}`;
    const iconLeftClasses = `fa fa-minus fa-lg pull-left ${styles.icon} ${styles.iconLeft}`;
    const iconRightClasses = `fa fa-plus fa-lg pull-left ${styles.icon} ${styles.iconRight}`;

    return (
        <div className={styles.container}>
            <h2>Invoice creator</h2>
            <div className="row">
                <div className="col-xs-12 col-md-6">
                    <label>Select product ({props.productsLength} items)</label>
                </div>
                <div className="col-xs-12 col-md-6">
                    <select
                        className="form-control"
                        disabled={props.loading}
                        onChange={(event: React.FormEvent<HTMLSelectElement>) => props.onOptionSelected(event)}
                        value={props.filters.selectedOption}
                    >{productsList}</select>
                </div>
            </div>
            <div className="col-xs-12">
                <h3>Filters:</h3>
            </div>
            <div className="row">
                <div className="col-xs-12 col-md-6">
                    <label>Product name</label>
                </div>
                <div className="col-xs-12 col-md-6">
                    <input
                        type="text"
                        className="form-control"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => props.onNameChanged(event.target.value)}
                        value={props.filters.name}
                    />
                </div>
            </div>
            <div className={amountContainerClasses}>
                <div className="col-xs-12 col-md-6">
                    <label>Product minimum amount</label>
                </div>
                <div className={iconContainerClasses}>
                    <i
                        className={iconLeftClasses}
                        onClick={() => props.onAmountChanged(props.filters.amount - 1)}
                    />
                </div>
                <div className="col-xs-12 col-md-2">
                    <input
                        type="string"
                        className="form-control"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => props.onAmountChanged(+event.target.value)}
                        value={props.filters.amount}
                    />
                </div>
                <div className={iconContainerClasses}>
                    <i
                        className={iconRightClasses}
                        onClick={() => props.onAmountChanged(props.filters.amount + 1)}
                    />
                </div>
            </div>
        </div>
    );
}

export default React.memo(Filters);
