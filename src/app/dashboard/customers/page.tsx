"use client";

import * as React from "react";
import type { Metadata } from "next";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Download as DownloadIcon } from "@phosphor-icons/react/dist/ssr/Download";
import { Plus as PlusIcon } from "@phosphor-icons/react/dist/ssr/Plus";
import { Upload as UploadIcon } from "@phosphor-icons/react/dist/ssr/Upload";
import dayjs from "dayjs";

import { config } from "@/config";
import { CustomersFilters } from "@/components/dashboard/customer/customers-filters";
import { CustomersTable } from "@/components/dashboard/customer/customers-table";
import type { Customer } from "@/components/dashboard/customer/customers-table";
import { collection, getDocs, query, where } from "@firebase/firestore";
import { db } from "@/utils/firebase";
import { Card, Chip } from "@mui/material";

// export const metadata = {
//   title: `Customers | Dashboard | ${config.site.name}`,
// } satisfies Metadata;

type Locale = "BRASILIA-DF" | "UBERLANDIA-MG" | "";

export default function Page(): React.JSX.Element {
  const [cadastros, setCadastros] = React.useState<any[]>([]);
  const [filterLocale, setFilterLocale] = React.useState<Locale>("");
  const page = 0;
  const rowsPerPage = 5;
  const paginatedCustomers = applyPagination(cadastros, page, rowsPerPage);
  const ref = collection(db, "whatsapp_lectures");
  const q = query(ref, where("location", "==", filterLocale));

  const getRegisters = React.useCallback(async () => {
    const queried = filterLocale === "" ? ref : q;
    const snapshot = await getDocs(queried);
    let data: any[] = [];
    snapshot.forEach((doc) => {
      data.push(doc.data());
    });
    setCadastros(data);
  }, [filterLocale]);

  React.useEffect(() => {
    getRegisters();
  }, [getRegisters]);

  return (
    <Stack spacing={3}>
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
        {/* <div>
          <Button
            startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />}
            variant="contained"
          >
            Add
          </Button>
        </div> */}
      </Stack>
      <Card sx={{ px: 4, py: 2 }} elevation={5}>
        <Typography variant="subtitle1" pb={1}>
          Filtrar por Localização:
        </Typography>

        <Stack direction="row" columnGap={2}>
          {["BRASILIA-DF", "UBERLANDIA-MG"].map((item, index) => (
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
      </Card>
      <CustomersTable
        page={page}
        count={cadastros.length}
        rows={cadastros}
        rowsPerPage={rowsPerPage}
      />
    </Stack>
  );
}

function applyPagination(
  rows: Customer[],
  page: number,
  rowsPerPage: number
): Customer[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
