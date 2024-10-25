import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "../../components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

type Params = {
  currentPage: number;
  onPageChange: (newPage: number) => void;
  totalPages: number;
  limit: number;
  onLimitChange: (newLimit: number) => void;
};

export const PaginationStrip = ({
  currentPage,
  totalPages,
  limit,
  onPageChange,
  onLimitChange,
}: Params) => {
  return (
    <div className="flex flex-col items-center">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => {
                if (currentPage <= 0) {
                  return;
                }

                onPageChange(currentPage - 1);
              }}
            />
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              onClick={() => {
                if (currentPage > totalPages) {
                  return;
                }

                onPageChange(currentPage + 1);
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      <div className="flex justify-center items-center gap-2">
        <p>Showing</p>
        <Select
          onValueChange={(value) => {
            onLimitChange(Number(value));
            onPageChange(0);
          }}
          defaultValue={limit.toString()}
        >
          <SelectTrigger className="w-[50px]">
            <SelectValue placeholder="Items per page" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="50">50</SelectItem>
          </SelectContent>
        </Select>
        <p>items per page</p>
      </div>
    </div>
  );
};
