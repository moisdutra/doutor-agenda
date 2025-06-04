"use client";

import { AtSignIcon, PhoneIcon, UserIcon } from "lucide-react";
import { useState } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { patientsTable } from "@/db/schema";

import UpsertPatientForm from "./upsert-patient-form";

interface PatientCardProps {
  patient: typeof patientsTable.$inferSelect;
}

const formatPhoneNumber = (phoneNumber: string) => {
  // Remove tudo que não for número
  const numbers = phoneNumber.replace(/\D/g, "");
  // Aplica a máscara
  return numbers.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
};

const PatientCard = ({ patient }: PatientCardProps) => {
  const [isUpsertPatientDialogOpen, setIsUpsertPatientDialogOpen] =
    useState(false);
  const patientInitials = patient.name
    .split(" ")
    .map((name) => name[0])
    .join("");

  const genderLabels = {
    male: "Masculino",
    female: "Feminino",
    other: "Outro",
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Avatar className="h-10 w-10">
            <AvatarFallback>{patientInitials}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-sm font-medium">{patient.name}</h3>
            <p className="text-muted-foreground text-sm">
              {genderLabels[patient.gender]}
            </p>
          </div>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="flex flex-col gap-2">
        <Badge variant={"outline"}>
          <AtSignIcon className="mr-1" />
          {patient.email}
        </Badge>
        <Badge variant={"outline"}>
          <PhoneIcon className="mr-1" />
          {formatPhoneNumber(patient.phoneNumber)}
        </Badge>
        <Badge variant={"outline"}>
          <UserIcon className="mr-1" />
          {genderLabels[patient.gender]}
        </Badge>
      </CardContent>
      <Separator />
      <CardFooter>
        <Dialog
          open={isUpsertPatientDialogOpen}
          onOpenChange={setIsUpsertPatientDialogOpen}
        >
          <DialogTrigger asChild>
            <Button className="w-full">Ver detalhes</Button>
          </DialogTrigger>
          <UpsertPatientForm
            isOpen={isUpsertPatientDialogOpen}
            patient={patient}
            onSuccess={() => setIsUpsertPatientDialogOpen(false)}
          />
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default PatientCard;
