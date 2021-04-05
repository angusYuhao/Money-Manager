// import React from "react";
// import CONFIG from '../../config'


// const API_HOST = CONFIG.api_host
// const getStock = async ticker => {
//     console.log("Getting data");
//     const request = await fetch(`${API_HOST}/stock`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
    
//         body: JSON.stringify({
//             ticker: ticker,
//             type: "daily"
//         })
//     });
  
//     const data = await request.json();
//     console.log(data);
//     return data;
// };
  


// class App extends React.Component {
//     render() {
//         return (
//         <div>
//             <h2>Hey!</h2>
//             <button onClick={() => getStock("AAPL", 'daily')}>Get stock</button>
//         </div>
//         );
//     }
// }
// export default App;