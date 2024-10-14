// import React, { useEffect, useState } from "react";
// import { BarChart } from "@mui/x-charts";
// import { useTheme } from "@mui/material";
// import { tokens } from "../theme";
// import { getCementCurrentStock } from "../services/CementService";
// import { getBlock1CurrentStock } from "../services/Block1Service";
// import { getBlock2CurrentStock } from "../services/Block2Service";

// const Bar = ({isDashboard = false}) => {
//     const theme = useTheme();
//     const colors = tokens(theme.palette.mode);

//     const [ currentStocks, setCurrentStocks ] = useState({ cement: 0, block1: 0, block2: 0 });

//     useEffect(() => {
//         const fetchStockData = async () => {
//             try {
//                 const [ cement, block1, block2 ] = await Promise.all([
//                     getCementCurrentStock(),
//                     getBlock1CurrentStock(),
//                     getBlock2CurrentStock()
//                 ]);

//                 setCurrentStocks({
//                     cement: cement.data,
//                     block1: block1.data,
//                     block2: block2.data
//                 });
//             } catch (error) {
//                 console.error("Error fetching stock data: ", error);
                
//             }
//         }

//         fetchStockData();
//     }, []);

//     const data = [
//         { name: "Cement", value: currentStocks.cement},
//         { name: "Block1", value: currentStocks.block1},
//         { name: "Block2", value: currentStocks.block2},
//     ]

//     return (
//         <BarChart
//             series={[{ 
//                 data: data.map(item => ({ x: item.value, y: item.value })),
//                 color: colors.primary[500]
//              }]}
//             height={600}
//             xAxis={[{ data: data.map(item => item.name), scaleType: 'band' }]}
//             yAxis={[{ tickInterval: 200 }]}
//             margin={{ top: 35, bottom: 30, left: 40, right: 10 }}
//         />
//     );
// }

// export default Bar;