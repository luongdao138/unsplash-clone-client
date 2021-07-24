export interface Image {
  _id: string;
  label: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
  __v?: number;
}

export interface ImageStateType {
  list: Image[];
  page_info: {
    total_results: number;
    items_per_page: number;
  };
  loading: {
    fetch: boolean;
    create: boolean;
  };
  error: string | null;
  searchTerm: string;
}
