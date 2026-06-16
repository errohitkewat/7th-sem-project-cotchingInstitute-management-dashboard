import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Card } from "../components/ui/card";
import { getResource } from "../services/resources";
import type { Student } from "../types";

export const StudentDetails = () => {
  const { id = "" } = useParams();
  const { data } = useQuery({ queryKey: ["students", id], queryFn: () => getResource<Student>("students", id), enabled: Boolean(id) });
  return (
    <Card className="max-w-3xl">
      <h2 className="text-lg font-semibold">{data?.name ?? "Student Profile"}</h2>
      <div className="mt-5 grid gap-3 text-sm md:grid-cols-2">
        <p>Email: {data?.email}</p>
        <p>Phone: {data?.phone}</p>
        <p>Parent: {data?.parentName}</p>
        <p>Fees: {data?.feesStatus}</p>
        <p className="md:col-span-2">Address: {data?.address}</p>
      </div>
    </Card>
  );
};
