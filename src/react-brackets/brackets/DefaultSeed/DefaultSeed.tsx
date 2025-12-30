import {Box} from "@mui/material";
import {SeedItem, SeedTeam} from "../../components/seed";
import EditableTextField from "./EditableTextField";
import {IRenderSeedProps} from "../../types/Seed";

export function DefaultSeed(props: IRenderSeedProps ){
    const seedBackground = "linear-gradient(90deg, #FF5722 0%, #FF9800 100%)";
return (
        <SeedItem
          style={{
            background: seedBackground,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box sx={{ position: "absolute", left: "50%", width: "100%", transform: "translateX(-50%) translateY(-100%)", color: "black" }}>
            <EditableTextField
              text={props.seed.id.toString()}
              hint={"Enter contest name"}
              fitText={false}
              sizes={{ font: 14, resize: 0, inputWidth: 250 }}
              onSave={(newName) => {}}
              style={{ width: "100%" }}
              boxProps={{ sx: {justifyContent: "center"} }}
            />
          </Box>
          <Box style={{ width: "100%" }}>
            <SeedTeam
            style={{ color: "Black", display: "block", padding: "0.1rem" }}
          >
            Team A
          </SeedTeam>
              <SeedTeam
            style={{ color: "Black", display: "block", padding: "0.1rem" }}
          >
            Team B
          </SeedTeam>
          </Box>
        </SeedItem>
     );
   }