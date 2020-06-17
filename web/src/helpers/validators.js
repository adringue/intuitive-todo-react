

// function returning a function
export const sameAs=(field,getValues)=>(value)=>{
  // debugger
  const compareTo=getValues()[field];
  return compareTo===value;
}
