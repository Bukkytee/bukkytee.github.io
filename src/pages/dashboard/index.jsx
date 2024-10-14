import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
// import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
// import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LineChart from "../../components/LineChart";
// import BarChart from "../../components/BarChart";
import PieChart from "../../components/PieChart";
import StatBox from "../../components/StatBox";
// import ProgressCircle from "../../components/ProgressCircle";
import Inventory2Icon from '@mui/icons-material/Inventory2';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { useState, useEffect } from "react";
import { getTotalMonthlySales, getRecentTransactions } from "../../services/SaleService";
import { getTotalMonthlyExpenses } from "../../services/ExpenseService";
import { getCementTotalOutQuantity } from "../../services/CementService";
import { getBlock1TotalOutQuantity } from "../../services/Block1Service";
import { getBlock2TotalOutQuantity } from "../../services/Block2Service";


const Dashboard = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [ monthlySales, setMonthlySales ] = useState(0);
    const [ monthlyExpenses, setMonthlyExpenses ] = useState(0);
    const [ loading, setLoading ] = useState(true);
    const [ totalOutQuantity, setTotalOutQuantity ] = useState(0);
    const [ recentTransactions, setRecentTransactions ] = useState([]);
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

    useEffect(() => {
      const fetchMonthlySales = async () => {
        try {
          const response = await getTotalMonthlySales(currentMonth, currentYear);
          setMonthlySales(response.data)
        } catch (error) {
          console.error("Error fetching monthly data: ", error);
        } finally {
          setLoading(false);
        }
      };
      fetchMonthlySales();
    }, [currentMonth, currentYear]);

    useEffect(() => {
      const fetchMonthlyExpenses = async () => {
        try {
          const response = await getTotalMonthlyExpenses(currentMonth, currentYear);
          setMonthlyExpenses(response.data);
        } catch (error) {
          console.error("Error fetching monthly data: ", error);
        } finally {
          setLoading(false);
        }
      };
      fetchMonthlyExpenses();
    }, [currentMonth, currentYear]);

    useEffect(() => {
      const fetchTotalOutQuantities = async () => {
        try {
          const cementResponse = await getCementTotalOutQuantity();
          const block1Response = await getBlock1TotalOutQuantity();
          const block2Response = await getBlock2TotalOutQuantity();

          const combinedTotal = (cementResponse.data || 0) + (block1Response.data || 0) + (block2Response.data || 0);
          setTotalOutQuantity(combinedTotal);

        } catch (error) {
          console.error("Error fetching total out quantities: ", error);
          
        } finally {
          setLoading(false);
        }
      };
      fetchTotalOutQuantities();
    }, []);

    useEffect(() => {
      const fetchRecentTransactions = async () => {
        try {
          const response = await getRecentTransactions(0, 5);
          setRecentTransactions(response.data);
        } catch (error) {
          console.error("Error fetching recent transactions: ", error); 
        }
      };
      fetchRecentTransactions();
    }, []);

  
    return (
      <Box m="-5px" sx={{scale: "0.97"}}>
        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
  
          <Box>
            <Button
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.gray[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
              }}
              
            >
              <DownloadOutlinedIcon sx={{ mr: "10px" }} />
              Download Reports
            </Button>
          </Box>
        </Box>
  
        {/* GRID & CHARTS */}
        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="140px"
          gap="10px"
        >
          {/* ROW 1 */}
          <Box
            gridColumn="span 4"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={loading ? "Loading..." : `${totalOutQuantity.toLocaleString()}`}
              subtitle="Inventory Distributed"
              progress="0.75"
              increase="+14%"
              icon={
                <Inventory2Icon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
          <Box
            gridColumn="span 4"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={loading ? "Loading..." : `₦${monthlySales.toLocaleString()}`}
              subtitle="Total Monthly Sales"
              progress="0.50"
              increase="+21%"
              icon={
                <PointOfSaleIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
          {/* <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title="20+"
              subtitle="New Customers"
              progress="0.30"
              increase="+5%"
              icon={
                <PersonAddIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box> */}
          <Box
            gridColumn="span 4"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={loading ? "Loading..." : `₦${monthlyExpenses.toLocaleString()}`}
              subtitle="Total Monthly Expenses"
              progress="0.80"
              increase="+43%"
              icon={
                <MonetizationOnIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
  
          {/* ROW 2 */}
          <Box
            gridColumn="span 8"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
          >
            <Box
              mt="25px"
              p="0 30px"
              display="flex "
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography
                  variant="h5"
                  fontWeight="600"
                  color={colors.gray[100]}
                >
                  Revenue Generated
                </Typography>
                <Typography
                  variant="h3"
                  fontWeight="bold"
                  color={colors.greenAccent[500]}
                >
                  N50M+
                </Typography>
              </Box>
              <Box>
                <IconButton>
                  <DownloadOutlinedIcon
                    sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                  />
                </IconButton>
              </Box>
            </Box>
            <Box height="250px" m="-20px 0 0 0">
              <LineChart isDashboard={true} />
            </Box>
          </Box>
          <Box
            gridColumn="span 4"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
            overflow="auto"
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              colors={colors.gray[100]}
              p="15px"
            >
              <Typography color={colors.gray[100]} variant="h5" fontWeight="600">
                Recent Sales Transactions
              </Typography>
            </Box>
            {recentTransactions.map((transaction, i) => (
              <Box
                key={`${transaction.id}-${i}`}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`4px solid ${colors.primary[500]}`}
                p="15px"
              >
                <Box>
                  <Typography
                    color={colors.greenAccent[500]}
                    variant="h5"
                    fontWeight="600"
                  >
                    {transaction.id}
                  </Typography>
                  <Typography color={colors.gray[100]} margin="5px 0">
                    {transaction.customerName}
                  </Typography>
                </Box>
                <Box color={colors.gray[100]}>{transaction.date}</Box>
                <Box
                  backgroundColor={colors.greenAccent[700]}
                  p="5px 10px"
                  borderRadius="4px"
                >
                  ₦{transaction.totalBalance.toLocaleString()}
                </Box>
              </Box>
            ))}
          </Box>
  
          {/* ROW 3 */}
          {/* <Box
            gridColumn="span 4"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
            p="30px"
          >
            <Typography variant="h5" fontWeight="600">
              Campaign
            </Typography>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              mt="25px"
            >
              <ProgressCircle size="125" />
              <Typography
                variant="h5"
                color={colors.greenAccent[500]}
                sx={{ mt: "15px" }}
              >
                N48,300 revenue generated
              </Typography>
              <Typography>Includes extra misc expenditures and costs</Typography>
            </Box>
          </Box> */}
          {/* <Box
            gridColumn="span 6"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
          >
            <Typography
              variant="h5"
              fontWeight="600"
              sx={{ padding: "30px 30px 0 30px" }}
            >
              Sales Quantity
            </Typography>
            <Box height="250px" mt="-20px">
              <BarChart isDashboard={true} />
            </Box>
          </Box> */}
          <Box
            gridColumn="span 12"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
          >
            <Typography
              variant="h5"
              fontWeight="600"
              sx={{ padding: "30px 30px 0 30px" }}
            >
              Pie Chart
            </Typography>
            <Box height="250px" mt="-20px">
              <PieChart />
            </Box>
          </Box>
        </Box>
      </Box>
    );
  };
  
  export default Dashboard;