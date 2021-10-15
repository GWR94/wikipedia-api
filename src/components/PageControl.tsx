import React from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { PageControlProps } from "../interfaces/pageControl.i";

const PageControl: React.FC<PageControlProps> = ({
  resultsLength,
  pageNum,
  setPageNum,
}): JSX.Element => {
  return (
    <div className="wiki__pagination-container">
      <Pagination size="lg" aria-label="Article Page Navigation">
        <PaginationItem>
          <PaginationLink first onClick={(): void => setPageNum(1)} />
        </PaginationItem>
        <PaginationItem active={pageNum === 1}>
          <PaginationLink onClick={(): void => setPageNum(1)}>1</PaginationLink>
        </PaginationItem>
        {resultsLength >= 10 && (
          <PaginationItem active={pageNum === 2}>
            <PaginationLink onClick={(): void => setPageNum(2)}>
              2
            </PaginationLink>
          </PaginationItem>
        )}
        {resultsLength >= 20 && (
          <PaginationItem active={pageNum === 3}>
            <PaginationLink onClick={(): void => setPageNum(3)}>
              3
            </PaginationLink>
          </PaginationItem>
        )}
        {resultsLength >= 30 && (
          <PaginationItem active={pageNum === 4}>
            <PaginationLink onClick={(): void => setPageNum(4)}>
              4
            </PaginationLink>
          </PaginationItem>
        )}
        {resultsLength >= 40 && (
          <PaginationItem active={pageNum === 5}>
            <PaginationLink onClick={(): void => setPageNum(5)}>
              5
            </PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationLink last onClick={(): void => setPageNum(5)} />
        </PaginationItem>
      </Pagination>
    </div>
  );
};

export default PageControl;
