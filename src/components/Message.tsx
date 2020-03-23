import React from 'react';
import { MessageProps } from '../types/types';
import { MESSAGE_HEADER_SUCCESS, MESSAGE_HEADER_WARNING } from '../constants/constants';

const containerStyles: React.CSSProperties = {
    position: 'relative',
    left: '50%',
    marginTop: '5%',
    transform: 'translate(-50%)'
}

const Message: React.FC<MessageProps> = (props: MessageProps) => {
    const containerClasses = ['alert', 'text-center'];
    const clearButton = props.allowRemove ? (
        <button onClick={() => props.onRemoveAlert!()} type="button" className="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    ) : null;
    let header = '';

    if (props.success) {
        containerClasses.push('alert-success');
        header = MESSAGE_HEADER_SUCCESS;
    } else if (props.error) {
        containerClasses.push('alert-danger');
        header = MESSAGE_HEADER_WARNING;
    } else {
        containerClasses.push('alert-light');
    }
    return (
        <div className="col-xs-12 col-md-6" style={containerStyles}>
            <div className={containerClasses.join(' ')} role="alert">
                {clearButton}
                <h3>{header}</h3>
                <h4>{props.message}</h4>
            </div>
        </div>
    );
}

export default React.memo(Message);
