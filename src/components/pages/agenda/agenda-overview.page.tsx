import { TableSkeleton } from "@/components/skeletons/table-skeleton";
import { Button } from "@/components/ui/button";
import { BodyBase, H2 } from "@/components/ui/typography";
import { parsePaginationParams } from "@/lib/parse-pagination-params";
import { getAgendas } from "@/server/retrievers/agenda";
import { Calendar, PlusCircle } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { AgendaTable } from "./_components/agenda-table/table";

export const AgendaOverview = async ({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    pageSize?: string;
    search?: string;
  }>;
}) => {
  const { page, pageSize, search } = parsePaginationParams(await searchParams);
  const agendaData = await getAgendas(
    page ?? undefined,
    pageSize ?? undefined,
    search,
  );

  return (
    <div className="container mx-auto space-y-6 py-6">
      <div className="flex flex-col items-start justify-between gap-y-4 md:flex-row md:items-center">
        <div>
          <H2 className="text-primary-800 mb-1 font-bold tracking-tight">
            Manajemen Agenda
          </H2>
          <BodyBase className="text-neutral-500">
            Kelola acara dan aktivitas fakultas
          </BodyBase>
        </div>
        <div className="flex items-center gap-x-2">
          <Button asChild>
            <Link href="/admin/agenda/new">
              <PlusCircle className="mr-2 h-4 w-4" />
              Tambah Agenda
            </Link>
          </Button>
          <Button asChild>
            <Link href="/admin/calendar">
              <Calendar className="mr-2 h-4 w-4" />
              Lihat Kalender
            </Link>
          </Button>
        </div>
      </div>
      <Suspense fallback={<TableSkeleton />}>
        <AgendaTable agendaData={agendaData} />
      </Suspense>
    </div>
  );
};
