"use client";

import { EditIcon, MoreVerticalIcon, TrashIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { patientsTable } from "@/db/schema";

import UpsertPatientForm from "./upsert-patient-form";

interface PatientTableActionsProps {
  patient: typeof patientsTable.$inferSelect;
}

const PatientTableActions = ({ patient }: PatientTableActionsProps) => {
  const [isUpsertDialogOpen, setIsUpsertDialogOpen] = useState(false);
  return (
    <Dialog open={isUpsertDialogOpen} onOpenChange={setIsUpsertDialogOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreVerticalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{patient.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setIsUpsertDialogOpen(true)}>
            <EditIcon />
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem>
            <TrashIcon />
            Excluir
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <UpsertPatientForm
        isOpen={isUpsertDialogOpen}
        patient={patient}
        onSuccess={() => setIsUpsertDialogOpen(false)}
      />
    </Dialog>
  );
};

export default PatientTableActions;
