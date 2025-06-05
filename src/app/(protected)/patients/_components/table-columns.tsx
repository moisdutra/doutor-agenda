"use client";

import { ColumnDef } from "@tanstack/react-table";

import { patientsTable } from "@/db/schema";

import PatientTableActions from "./table-actions";

type Patient = typeof patientsTable.$inferSelect;

export const patientTableColumns: ColumnDef<Patient>[] = [
  {
    id: "name",
    accessorKey: "name",
    header: "Nome",
  },
  {
    id: "email",
    accessorKey: "email",
    header: "Email",
  },
  {
    id: "phoneNumber",
    accessorKey: "phoneNumber",
    header: "Telefone",
    cell: (params) => {
      const phoneNumber = params.row.original.phoneNumber;
      if (!phoneNumber) return "-";
      return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 7)}-${phoneNumber.slice(7)}`;
    },
  },
  {
    id: "gender",
    accessorKey: "gender",
    header: "Gênero",
    cell: (params) => {
      const patient = params.row.original;
      return patient.gender === "male"
        ? "Masculino"
        : patient.gender === "female"
          ? "Feminino"
          : "Outro";
    },
  },
  {
    id: "actions",
    cell: (params) => {
      const patient = params.row.original;
      return <PatientTableActions patient={patient} />;
    },
  },
];
