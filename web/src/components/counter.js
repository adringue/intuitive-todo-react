import React, { useState, useEffect } from 'react';
export default function Counter() {
    // Declare a new state variable, which we'll call "count"
    const [count, setCount] = useState(0);
    const [title, setTile] = useState('');
    const warntxt = '';
    //Similar to componentDidMount and componentDidUpdate:
    // useEffect(() => {
    //     // Update the document title using the browser API
    //     document.title = `You clicked ${count} times`;
    //     if(count > 10){
    //   
    //     }
    // });

    return (
        <div>
            <p>You clicked {count} times.  {warntxt} </p>
            <button onClick={() => setCount(count + 1)}>
                Click me
      </button>
        </div>
    );
}
