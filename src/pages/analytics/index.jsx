import { Box } from "@mui/material";
import Header from "../../components/Header";
import BarChart from "../../components/BarChart";

const Analytics =() => {
    return (
        <Box m="20px">
            <Header title="ANALYTICS" subtitle="Visualise your current inventory data here"/>
            <Box height="75vh">
                <BarChart/>
            </Box>
        </Box>
    )
}

export default Analytics;