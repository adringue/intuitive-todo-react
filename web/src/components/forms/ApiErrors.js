import React from 'react';

export const ApiErrorsReg=({errors})=>{

  if(errors && errors.length>0) {
    return (
      <div className="alert alert-danger">
        {errors.map((e, index) =>
          <p key={index}>
            {e.detail}
          </p>)}
      </div>
    )
  }
  return null;
}
export const ApiErrorsLog=({errors})=>{

  if(errors && errors.length>0) {
    return (
      <div className="alert alert-danger">
        {errors.map((e, index) =>
          <p key={index}>
            {e.detail}
          </p>)}
      </div>
    )
  }
  return null;
}
