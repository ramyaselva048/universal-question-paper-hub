export interface QuestionPaper {
  id: string;
  title: string;
  category?: string;
  year?: number | string;
  description?: string;
  fileName: string;
  fileSize: number; // in bytes
  fileUrl: string; // Blob URL, Data URL or static link
  downloadCount: number;
  viewCount: number;
  uploadedAt: string;
  updatedAt: string;
  uploadedBy?: string;
  tags?: string[];
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  iconName?: string;
  createdAt: string;
}

export interface AdminUser {
  username: string;
  role: 'admin';
  lastLogin: string;
}

export interface PublicUser {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  providerId: string;
  joinedAt?: string;
}

export interface FilterOptions {
  searchQuery: string;
  category: string;
  year: string;
  sortBy: 'newest' | 'oldest' | 'most_downloaded' | 'most_viewed' | 'title_asc';
}

export interface DownloadRecord {
  id: string;
  paperId: string;
  paperTitle: string;
  category?: string;
  year?: number | string;
  downloadedAt: string;
  fileSize: number;
}

export interface ViewRecord {
  paperId: string;
  paperTitle: string;
  viewedAt: string;
}
