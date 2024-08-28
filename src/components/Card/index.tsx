import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

interface CardProps {
  title: string;
  value: string;
  backgroundColor?: string;
}

export const CustomCard: React.FC<CardProps> = ({ title, value, backgroundColor }) => {
  const cardStyle = {
    backgroundColor: backgroundColor || "inherit",
    width: "100%",
    height: "100%",
    color: "#FFF",
    opacity: "0.9",
  };

  return (
    <Card style={cardStyle} elevation={4}>
      <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Typography variant="h6" gutterBottom fontWeight="bold">
          {title}
        </Typography>
        <Typography variant="h4" fontWeight="bold">
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
};
