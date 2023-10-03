import React from "react";
import Box from "@mui/material/Box";
import { List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { Server } from "../../@types/server.d";

interface ServerChannelProps {
  data: Server[];
}

const ServerChannels: React.FC<ServerChannelProps> = (props) => {
  const { data } = props;
  const { serverId } = useParams();

  const server_name = data?.[0]?.name ?? "Server";

  return (
    <>
      <Box
        sx={{
          height: "51px",
          display: "flex",
          alignItems: "center",
          px: 2,
          borderBottom: "1px solid #ccc",
          position: "sticky",
          top: 0,

          fontWeight: 600,
          fontSize: "20px",
        }}
      >
        <Typography variant="body1" style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
          {server_name}
        </Typography>
      </Box>
      <List sx={{ p: 0 }}>
        {data.flatMap((obj) =>
          obj.channel_server.map((item) => (
            <ListItem disablePadding key={item.id} sx={{ display: "flex", width: "100%", maxHeight: "40px" }} dense={true}>
              <ListItemButton sx={{ minHeight: 48, width: "100%" }}>
                <Link
                  to={`/server/${serverId}/${item.id}`}
                  style={{ textDecoration: "none", color: "inherit", width: "100%" }}
                >
                  <ListItemText
                    primary={
                      <Typography
                        variant={"body2"}
                        sx={{
                          fontSize: "18px",
                          fontWeight: 600,
                          lineHeight: 1.2,
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          marginLeft: "10px",
                        }}
                      >
                        {item.name}
                      </Typography>
                    }
                    primaryTypographyProps={{
                      sx: { textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" },
                    }}
                  />
                </Link>
              </ListItemButton>
            </ListItem>
          ))
        )}
      </List>
    </>
  );
};

export default ServerChannels;
