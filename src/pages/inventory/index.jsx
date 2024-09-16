import { useTheme, Box } from "@mui/material";
import { tokens } from "../../theme";
import { Tab, Tabs } from "@mui/material";
import { useState } from "react";
import Header from "../../components/Header";
import Block1 from "../../components/Block1/Block1";
import Block2 from "../../components/Block2/Block2";
import Cement from "../../components/Cement/Cement";

const Inventory = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box
      sx={{
        margin: "20px"
      }}>
        <Header title="INVENTORY" subtitle="Track your inventory level here" />
      </Box>
      
      <Box m="20px 0" sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="fullWidth"
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab label="Cement" />
          <Tab label='Block (9" inches)' />
          <Tab label='Block (6" inches)' />
        </Tabs>
      </Box>

      <Box m="20px 0">
        <TabPanel value={activeTab} index={0}>
          <Cement />
        </TabPanel>
        <TabPanel value={activeTab} index={1}>
          <Block1 />
        </TabPanel>
        <TabPanel value={activeTab} index={2}>
          <Block2 />
        </TabPanel>
      </Box>
    </Box>
  );
};

const TabPanel = ({ children, value, index }) => {
  return (
    <div hidden={value !== index}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

export default Inventory;
