import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

const Tasklistpagination = ({
  handleNext,
  handlePrev,
  handlePageChange,
  Page,
  totalPages,
}) => {
  const generatePages = () => {
    const pages = [];
    if (totalPages <= 4) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (Page < 2) {
        pages.push(1, 2, 3, "...", totalPages);
      } else if (Page >= totalPages - 1) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", Page, "...", totalPages);
      }
    }
    return pages;
  };

  const pagesToShow = generatePages();
  return (
    <div className="flex justify-center mt-4">
      <Pagination>
        <PaginationContent>
          {/* Trang trước */}
          <PaginationItem>
            <PaginationPrevious
              onClick={Page === 1 ? undefined : handlePrev}
              className={cn(
                "cursor-pointer",
                Page === 1 ? "pointer-events-none opacity-50" : "",
              )}
            />
          </PaginationItem>

          {pagesToShow.map((p, index) => (
            <PaginationItem key={index}>
              {p === "..." ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  isActive={p === Page}
                  onClick={() => {
                    if (p !== Page) {
                      handlePageChange(p);
                    }
                  }}
                  className="cursor-pointer"
                >
                  {p}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          {/* Trang sau */}
          <PaginationItem>
            <PaginationNext
              onClick={Page === totalPages ? undefined : handleNext}
              className={cn(
                "cursor-pointer",
                Page === totalPages ? "pointer-events-none opacity-50" : "",
              )}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
export default Tasklistpagination;
