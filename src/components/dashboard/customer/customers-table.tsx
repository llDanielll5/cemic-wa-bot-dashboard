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

function noop(): void {
  // do nothing
}

export interface Customer {
  id: string;
  name: string;
  location: "BRASILIA-DF" | "UBERLANDIA-MG";
  from: string;
  day: string;
  hour: string;
  device: string;
  feedback: string;
}

interface CustomersTableProps {
  count?: number;
  page?: number;
  rows?: Customer[];
  rowsPerPage?: number;
}

export function CustomersTable({
  count = 0,
  rows = [],
  page = 0,
  rowsPerPage = 0,
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
        <Table sx={{ minWidth: "800px" }}>
          <TableHead>
            <TableRow>
              {/* <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedAll}
                  indeterminate={selectedSome}
                  onChange={(event) => {
                    if (event.target.checked) {
                      selectAll();
                    } else {
                      deselectAll();
                    }
                  }}
                />
              </TableCell> */}
              <TableCell>Nome</TableCell>
              <TableCell>Feedback</TableCell>
              <TableCell>Local</TableCell>
              <TableCell>Telefone</TableCell>
              <TableCell>Data Agendada</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              const phone = row.from.substring(0, 11);
              const isSelected = selected?.has(row.id);
              const [y, m, d] = row.day.split("-");
              const [h, _] = row.hour.split(":");
              const date = new Date(
                parseInt(y),
                parseInt(m) - 1,
                parseInt(d),
                parseInt(h),
                0
              );

              return (
                <TableRow hover key={row.id} selected={isSelected}>
                  {/* <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected}
                      onChange={(event) => {
                        if (event.target.checked) {
                          selectOne(row.id);
                        } else {
                          deselectOne(row.id);
                        }
                      }}
                    />
                  </TableCell> */}
                  <TableCell>
                    <Stack
                      sx={{ alignItems: "center" }}
                      direction="row"
                      spacing={2}
                    >
                      <Avatar />
                      <Typography variant="subtitle2">{row.name}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{row.feedback}</TableCell>
                  <TableCell>{row.location}</TableCell>
                  <TableCell>
                    <Link
                      title="Abrir Whatsapp"
                      href={`https://api.whatsapp.com/?send=${phone}`}
                      target="_blank"
                    >
                      {phone}
                    </Link>
                  </TableCell>
                  <TableCell>{date.toLocaleDateString()}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
      <Divider />
      <TablePagination
        component="div"
        count={count}
        onPageChange={noop}
        onRowsPerPageChange={noop}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
}
