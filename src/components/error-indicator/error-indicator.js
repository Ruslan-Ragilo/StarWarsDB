import React from 'react';

const ErrorIndicator = () => {
    return ( 
        <div className='wrapper-error'>
            <h2 className='text-danger text-center'>Boom!</h2>
            <h2 className='text-danger'>Problem!</h2>
        </div>
     );
}

export default ErrorIndicator;