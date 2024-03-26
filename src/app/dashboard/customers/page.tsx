"use client";

import * as React from "react";
import type { Metadata } from "next";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { CustomersTable } from "@/components/dashboard/customer/customers-table";
import type { Customer } from "@/components/dashboard/customer/customers-table";
import {
  Alert,
  Autocomplete,
  Button,
  Card,
  Chip,
  IconButton,
  Pagination,
  TextField,
} from "@mui/material";
import axiosInstance from "@/axios";

type Locale = "BRASILIA-DF" | "UBERLANDIA-MG" | "";
interface PaginationInterface {
  page: number;
  total: number;
  pageSize: number;
  pageCount: number;
}

export default function Page(): React.JSX.Element {
  const [cadastros, setCadastros] = React.useState<any[]>([]);
  const [filterLocale, setFilterLocale] = React.useState<Locale>("");
  const [hourFilter, setHourFilter] = React.useState("");
  const [dateFilter, setDateFilter] = React.useState("");
  const [pagination, setPagination] = React.useState<PaginationInterface>({
    page: 1,
    total: 0,
    pageSize: 0,
    pageCount: 0,
  });

  const resetFilters = () => {
    setDateFilter("");
    setHourFilter("");
    setFilterLocale("");
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const getRegisters = React.useCallback(async () => {
    let localeFilter =
      filterLocale !== "" ? `&filters[location][$eq]=${filterLocale}` : "";
    let hourParams =
      hourFilter !== "" ? `&filters[hour][$eq]=${hourFilter}` : "";
    let dayParams = hourFilter !== "" ? `&filters[day][$eq]=${dateFilter}` : "";
    let url = `/wa-schedules/?sort[0]=createdAt:desc&pagination[page]=${pagination.page}`;

    if (localeFilter !== "") {
      url += localeFilter;
    } else {
      url.replace(`&filters[location][$eq]=${filterLocale}`, "");
    }

    if (hourFilter !== "") {
      url += hourParams;
    } else {
      url.replace(`&filters[hour][$eq]=${hourFilter}`, "");
    }

    if (dateFilter !== "") {
      url += dayParams;
    } else {
      url.replace(`&filters[day][$eq]=${dateFilter}`, "");
    }

    return await axiosInstance.get(url).then(
      ({ data }) => {
        setPagination(data.meta.pagination);
        setCadastros(data.data);
      },
      (err) => console.log(err)
    );
  }, [filterLocale, pagination.page, dateFilter, hourFilter]);

  React.useEffect(() => {
    getRegisters();
  }, [getRegisters]);

  return (
    <Stack spacing={3}>
      <title>CEMIC-BOT | Cadastros</title>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: "1 1 auto" }}>
          <Typography variant="h4">Cadastros</Typography>
          {/* <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Button color="inherit" startIcon={<UploadIcon fontSize="var(--icon-fontSize-md)" />}>
              Import
            </Button>
            <Button color="inherit" startIcon={<DownloadIcon fontSize="var(--icon-fontSize-md)" />}>
              Export
            </Button>
          </Stack> */}
        </Stack>
      </Stack>
      <Card sx={{ px: 4, py: 2, minWidth: 500 }} elevation={5}>
        <Typography variant="subtitle1" pb={1}>
          Filtrar por Localização:
        </Typography>

        <Stack direction="row" columnGap={2}>
          {["BRASILIA-DF", "UBERLANDIA-MG", "OTHER"].map((item, index) => (
            <Chip
              key={index}
              label={item}
              variant="filled"
              onClick={() => {
                if (item === filterLocale) return setFilterLocale("");
                setFilterLocale(item as Locale);
              }}
              color={filterLocale === item ? "primary" : "default"}
            />
          ))}
        </Stack>

        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          columnGap={2}
          pt={2}
        >
          <TextField
            label={`Filtrar por Dia`}
            InputLabelProps={{ shrink: true }}
            type={"date"}
            onChange={(e) => setDateFilter(e.target.value)}
            fullWidth
          />
          <Autocomplete
            fullWidth
            options={["11:00", "17:00"]}
            value={hourFilter}
            onChange={(e, v) => setHourFilter(v!)}
            renderInput={(params) => <TextField {...params} />}
          />
        </Stack>
      </Card>

      <Stack direction="row" alignItems="center">
        {dateFilter !== "" || hourFilter !== "" ? (
          <Button variant="contained" onClick={resetFilters}>
            Resetar Filtros
          </Button>
        ) : null}
      </Stack>

      <Alert severity="success" icon={<></>}>
        Foram encontrado(s) {pagination?.total} resultados.
      </Alert>
      <CustomersTable rows={cadastros} />
      <Stack
        direction={"row"}
        columnGap={1}
        alignItems="center"
        justifyContent="center"
      >
        <Pagination
          count={pagination?.pageCount}
          color="primary"
          onChange={(e, p) => setPagination((prev) => ({ ...prev, page: p }))}
        />
      </Stack>
    </Stack>
  );
}

// function applyPagination(
//   rows: Customer[],
//   page: number,
//   rowsPerPage: number
// ): Customer[] {
//   return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
// }
