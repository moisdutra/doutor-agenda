"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";

import { appointmentsTable } from "@/db/schema";

import AppointmentTableActions from "./table-actions";

type Appointment = typeof appointmentsTable.$inferSelect & {
  patient: {
    name: string;
  };
  doctor: {
    name: string;
    specialty: string;
  };
};

export const appointmentTableColumns: ColumnDef<Appointment>[] = [
  {
    id: "patient",
    header: "Paciente",
    accessorKey: "patient.name",
  },
  {
    id: "doctor",
    header: "Médico",
    accessorKey: "doctor.name",
  },
  {
    id: "specialty",
    header: "Especialidade",
    accessorKey: "doctor.specialty",
  },
  {
    id: "date",
    header: "Data e hora",
    accessorKey: "date",
    cell: (params) => {
      const appointment = params.row.original;
      return format(new Date(appointment.date), "dd/MM/yyyy 'às' HH:mm", {
        locale: ptBR,
      });
    },
  },
  {
    id: "price",
    accessorKey: "appointmentPriceInCents",
    header: "Valor",
    cell: (params) => {
      const appointment = params.row.original;
      const price = appointment.appointmentPriceInCents / 100;
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(price);
    },
  },
  {
    id: "actions",
    cell: (params) => {
      const appointment = params.row.original;
      return <AppointmentTableActions appointment={appointment} />;
    },
  },
];
