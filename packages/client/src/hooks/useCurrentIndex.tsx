let Result: any = null;

const returnTotalNumberOfPages = (totalRecords: any, limit: any) => {
  if (totalRecords && limit) return (Result = Math.ceil(totalRecords / limit));
};

const returnCurrentPage = (pageRecords: any, limit: any) => {
  if (pageRecords && limit) return (Result = Math.ceil(pageRecords / limit));
};

export const useCurrentIndex = (data: any, totalLength: any, limit: any) => {
  const totalPages = returnTotalNumberOfPages(totalLength, limit);

  const currentPageRecordsCount = data?.length;

  const activePage: any = returnCurrentPage(currentPageRecordsCount, limit);

  return { activePage };
};
