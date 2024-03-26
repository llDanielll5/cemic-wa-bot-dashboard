"use client";

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";

import { useSelection } from "@/hooks/use-selection";
import Link from "next/link";
import { Chip } from "@mui/material";

function noop(): void {
  // do nothing
}

export interface Customer {
  id: string;
  attributes: {
    name: string;
    location: "BRASILIA-DF" | "UBERLANDIA-MG";
    from: string;
    day: string;
    hour: string;
    device: string;
    feedback: string;
    otherRegions?: string;
  };
}

interface CustomersTableProps {
  count?: number;
  page?: number;
  rows?: Customer[];
  rowsPerPage?: number;
}

export function CustomersTable({
  rows = [],
}: CustomersTableProps): React.JSX.Element {
  const rowIds = React.useMemo(() => {
    return rows.map((customer) => customer.id);
  }, [rows]);

  const { selectAll, deselectAll, selectOne, deselectOne, selected } =
    useSelection(rowIds);

  const selectedSome =
    (selected?.size ?? 0) > 0 && (selected?.size ?? 0) < rows.length;
  const selectedAll = rows.length > 0 && selected?.size === rows.length;

  return (
    <Card>
      <Box sx={{ overflowX: "auto" }}>
        <Table sx={{ minWidth: "1000px" }}>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Feedback</TableCell>
              <TableCell>Local</TableCell>
              <TableCell>Telefone</TableCell>
              <TableCell>Data Agendada</TableCell>
              <TableCell>Hora Agendada</TableCell>
              <TableCell width={200}>Outra Região</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              const isSelected = selected?.has(row.id);
              const client = row?.attributes;
              const phone = client.from.substring(0, 12);
              const [y, m, d] = client.day.split("-");
              const [h, _] = client.hour.split(":");
              const date = new Date(
                parseInt(y),
                parseInt(m) - 1,
                parseInt(d),
                parseInt(h),
                0
              );
              const chipLocationColor = () => {
                switch (client.location) {
                  case "BRASILIA-DF":
                    return "primary";
                  case "UBERLANDIA-MG":
                    return "warning";
                  default:
                    return "default";
                }
              };
              const chipLocationLabel = () => {
                switch (client.location) {
                  case "BRASILIA-DF":
                    return "Brasília-DF";
                  case "UBERLANDIA-MG":
                    return "Uberlândia-MG";
                  default:
                    return "Outra Região";
                }
              };

              return (
                <TableRow hover key={row.id} selected={isSelected}>
                  <TableCell sx={{ border: "1px solid #d5d5d5" }}>
                    <Stack
                      sx={{ alignItems: "center" }}
                      width={250}
                      direction="row"
                      spacing={2}
                    >
                      <Avatar />
                      <Typography variant="subtitle2">
                        {client.name !== ""
                          ? client.name
                          : "------------------------"}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell sx={{ border: "1px solid #d5d5d5" }} width={200}>
                    {client.feedback}
                  </TableCell>
                  <TableCell sx={{ border: "1px solid #d5d5d5" }}>
                    <Chip
                      label={chipLocationLabel()}
                      color={chipLocationColor()}
                    />
                  </TableCell>
                  <TableCell sx={{ border: "1px solid #d5d5d5" }}>
                    <Link
                      title="Abrir Whatsapp"
                      href={`https://api.whatsapp.com/?send=${phone}`}
                      target="_blank"
                    >
                      {phone}
                    </Link>
                  </TableCell>
                  <TableCell sx={{ border: "1px solid #d5d5d5" }}>
                    {date.toLocaleDateString() === "Invalid Date"
                      ? "Nenhuma"
                      : date.toLocaleDateString()}
                  </TableCell>
                  <TableCell sx={{ border: "1px solid #d5d5d5" }}>
                    {client.hour}
                  </TableCell>
                  <TableCell width={200}>{client.otherRegions}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
      <Divider />
    </Card>
  );
}
