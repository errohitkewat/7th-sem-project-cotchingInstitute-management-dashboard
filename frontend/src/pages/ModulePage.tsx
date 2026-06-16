import {
  Plus,
  Search,
  Trash2,
  Download,
  Save,
  Eye,
  Pencil,
  X
} from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Skeleton } from "../components/ui/skeleton";
import {
  createResource,
  deleteResource,
  listResource,
  updateResource
} from "../services/resources";
import type { Paginated } from "../types";
import { exportCsv } from "../utils/csv";

export type Field = {
  key: string;
  label: string;
  type?: "text" | "number" | "date" | "select" | "textarea";
  options?: string[];
  required?: boolean;
};

type Props = {
  resource: string;
  title: string;
  description: string;
  fields: Field[];
  columns: string[];
};

const initialValue = (field: Field) => (field.type === "number" ? 0 : field.type === "select" ? field.options?.[0] ?? "" : "");

const toCamelKey = (label: string) =>
  label
    .split(" ")
    .map((part, index) => (index === 0 ? part.toLowerCase() : part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()))
    .join("");

export const ModulePage = ({ resource, title, description, fields, columns }: Props) => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const [selectedRow, setSelectedRow] =
    useState<Record<string, unknown> | null>(null);

  const [deleteId, setDeleteId] =
    useState<string | null>(null);
  const [form, setForm] = useState<Record<string, unknown>>(() =>
    Object.fromEntries(fields.map((field) => [field.key, initialValue(field)]))
  );
  const { data, isLoading } = useQuery({
    queryKey: [resource, search],
    queryFn: () => listResource<Record<string, unknown>>(resource, search)
  });

  const createMutation = useMutation({
    mutationFn: (payload: Record<string, unknown>) => createResource(resource, payload),
    onSuccess: () => {
      setForm(Object.fromEntries(fields.map((field) => [field.key, initialValue(field)])));
      setFormOpen(false);
      queryClient.invalidateQueries({ queryKey: [resource] });
    }
  });

  const editMutation = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: Record<string, unknown>;
    }) =>
      updateResource(resource, id, payload),

    onSuccess: () => {
      setEditOpen(false);

      queryClient.invalidateQueries({
        queryKey: [resource],
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteResource(resource, id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [resource] })
  });

  const rows = useMemo(() => (data as Paginated<Record<string, unknown>> | undefined)?.items ?? [], [data]);

  return (
    <div className="space-y-5">
      <Card className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="mt-1 text-sm text-slate-500">{description}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="ghost" onClick={() => exportCsv(`${resource}.csv`, rows)}>
            <Download size={16} /> Export CSV
          </Button>
          <Button onClick={() => setFormOpen((value) => !value)}>
            <Plus size={16} /> Add
          </Button>
        </div>
      </Card>

      {formOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-5 backdrop-blur-sm">
        <Card className="max-h-[90vh] w-full max-w-5xl overflow-y-auto">
          <form
            className="grid gap-4 md:grid-cols-2 xl:grid-cols-3"
            onSubmit={(event) => {
              event.preventDefault();
              createMutation.mutate(form);
            }}
          >
            {fields.map((field) => (
              <label key={field.key} className={field.type === "textarea" ? "md:col-span-2 xl:col-span-3" : ""}>
                <span className="mb-1 block text-sm font-medium text-slate-600 dark:text-slate-300">{field.label}</span>
                {field.type === "select" ? (
                  <select
                    className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm dark:border-slate-800 dark:bg-slate-950"
                    value={String(form[field.key] ?? "")}
                    onChange={(event) => setForm((current) => ({ ...current, [field.key]: event.target.value }))}
                  >
                    {field.options?.map((option) => <option key={option}>{option}</option>)}
                  </select>
                ) : field.type === "textarea" ? (
                  <textarea
                    className="min-h-24 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-primary dark:border-slate-800 dark:bg-slate-950"
                    value={String(form[field.key] ?? "")}
                    onChange={(event) => setForm((current) => ({ ...current, [field.key]: event.target.value }))}
                  />
                ) : (
                  <Input
                    type={field.type ?? "text"}
                    required={field.required}
                    value={String(form[field.key] ?? "")}
                    onChange={(event) => setForm((current) => ({ ...current, [field.key]: event.target.value }))}
                  />
                )}
              </label>
            ))}
            <div className="flex items-end">
              <Button disabled={createMutation.isPending}>
                <Save size={16} /> Save
              </Button>
            </div>
          </form>
          </Card>
        </div>
      )}

      <Card>
        <div className="mb-4 flex max-w-sm items-center gap-2 rounded-md border border-slate-200 px-3 dark:border-slate-800">
          <Search size={16} className="text-slate-400" />
          <Input className="border-0 bg-transparent px-0 focus:ring-0" placeholder={`Search ${title.toLowerCase()}`} value={search} onChange={(event) => setSearch(event.target.value)} />
        </div>
        {isLoading ? (
          <Skeleton className="h-72" />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 dark:border-slate-800">
                  {columns.map((column) => <th key={column} className="py-3 font-medium">{column}</th>)}
                  <th className="py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={String(row.id)} className="border-b border-slate-100 last:border-0 dark:border-slate-900">
                    {columns.map((column) => {
                      const key = toCamelKey(column);
                      const value = row[key] ?? row[column] ?? "";
                      return (
                        <td key={column} className="py-3 pr-4">
                          {String(column).toLowerCase().includes("status") ? <Badge>{String(value)}</Badge> : String(value)}
                        </td>
                      );
                    })}
                    <td className="py-3 text-right">
                      <div className="flex justify-end gap-2">

                        <Button
                          variant="ghost"
                          className="h-8 w-8 px-0"
                          onClick={() => {
                            setSelectedRow(row);
                            setViewOpen(true);
                          }}
                        >
                          <Eye size={16} />
                        </Button>

                        <Button
                          variant="ghost"
                          className="h-8 w-8 px-0"
                          onClick={() => {
                            setSelectedRow(row);
                            setForm(row);
                            setEditOpen(true);
                          }}
                        >
                          <Pencil size={16} />
                        </Button>

                        {viewOpen && selectedRow && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">

    <Card className="max-h-[80vh] w-full max-w-3xl overflow-y-auto">

      <div className="mb-5 flex items-center justify-between">

        <h2 className="text-xl font-bold">
          {title} Details
        </h2>

        <Button
          variant="ghost"
          onClick={() => setViewOpen(false)}
        >
          <X size={18} />
        </Button>

      </div>

      <div className="grid gap-4 md:grid-cols-2">

        {Object.entries(selectedRow).map(
          ([key, value]) => (
            <div
              key={key}
              className="rounded-xl border p-3"
            >
              <p className="text-xs text-slate-500">
                {key}
              </p>

              <p className="font-medium">
                {String(value)}
              </p>
            </div>
          )
        )}

      </div>

    </Card>

  </div>
)}

                        <Button
                          variant="ghost"
                          className="h-8 w-8 px-0 text-red-500"
                          onClick={() =>
                            setDeleteId(String(row.id))
                          }
                        >
                          <Trash2 size={16} />
                        </Button>

                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">

          <Card className="w-full max-w-md">

            <h2 className="text-xl font-bold">
              Confirm Delete
            </h2>

            <p className="mt-3 text-slate-500">
              Are you sure you want to delete this record?
            </p>

            <div className="mt-6 flex justify-end gap-3">

              <Button
                variant="ghost"
                onClick={() => setDeleteId(null)}
              >
                Cancel
              </Button>

              <Button
                variant="danger"
                onClick={() => {
                  deleteMutation.mutate(deleteId);
                  setDeleteId(null);
                }}
              >
                Delete
              </Button>

            </div>

          </Card>

        </div>
      )}
    </div>
  );
};
