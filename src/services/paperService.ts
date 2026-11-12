import { QuestionPaper, Category, FilterOptions, DownloadRecord, ViewRecord } from '../types';
import { generateMinimalExamPdfBlob } from '../utils/pdfGenerator';

const PAPERS_STORAGE_KEY = 'uqph_papers_data_v2';
const CATEGORIES_STORAGE_KEY = 'uqph_categories_data_v2';
const FAVORITES_STORAGE_KEY = 'uqph_favorites_data_v2';
const DOWNLOADS_STORAGE_KEY = 'uqph_downloads_data_v2';
const VIEWS_STORAGE_KEY = 'uqph_views_data_v2';
const CLEANUP_SENTINEL_KEY = 'uqph_initial_clean_slate_executed_v1';

// One-time cleanup: Remove old demo data, dummy records, and temporary uploads once.
// Never deletes newly entered data on subsequent reloads or application restarts.
function performOneTimeCleanup(): void {
  try {
    if (typeof window !== 'undefined') {
      const alreadyCleaned = localStorage.getItem(CLEANUP_SENTINEL_KEY);
      if (!alreadyCleaned) {
        // Clear all previous sample and demo storage keys
        localStorage.removeItem('uqph_papers_data_v1');
        localStorage.removeItem('uqph_categories_data_v1');
        localStorage.removeItem('uqph_favorites_data_v1');
        localStorage.removeItem('uqph_downloads_data_v1');
        localStorage.removeItem('uqph_views_data_v1');

        // Initialize fresh empty arrays for newly entered data
        localStorage.setItem(PAPERS_STORAGE_KEY, JSON.stringify([]));
        localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify([]));
        localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify([]));
        localStorage.setItem(DOWNLOADS_STORAGE_KEY, JSON.stringify([]));
        localStorage.setItem(VIEWS_STORAGE_KEY, JSON.stringify([]));

        // Mark cleanup as completed so this never executes again
        localStorage.setItem(CLEANUP_SENTINEL_KEY, 'true');
      }
    }
  } catch (err) {
    console.warn('One-time data cleanup notice:', err);
  }
}

// Execute one-time cleanup on initialization
performOneTimeCleanup();

function initializePapers(): QuestionPaper[] {
  try {
    const raw = localStorage.getItem(PAPERS_STORAGE_KEY);
    if (raw !== null) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch {
    // fallback
  }

  // Pure empty array - no automatic dummy data generation
  return [];
}

function initializeCategories(): Category[] {
  try {
    const raw = localStorage.getItem(CATEGORIES_STORAGE_KEY);
    if (raw !== null) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch {
    // fallback
  }

  // Pure empty array - no automatic dummy data generation
  return [];
}

export const paperService = {
  // -------------------------------------------------------------
  // PAPERS CRUD
  // -------------------------------------------------------------

  getPapers(): QuestionPaper[] {
    return initializePapers();
  },

  getPaperById(id: string): QuestionPaper | undefined {
    const papers = this.getPapers();
    return papers.find((p) => p.id === id);
  },

  createPaper(paperData: {
    title: string;
    category?: string;
    year?: number | string;
    description?: string;
    fileName: string;
    fileSize: number;
    fileBlob?: Blob;
    fileDataUrl?: string;
  }): QuestionPaper {
    const papers = this.getPapers();
    const newId = 'qp-' + Date.now().toString(36) + Math.random().toString(36).substring(2, 5);

    const newPaper: QuestionPaper = {
      id: newId,
      title: paperData.title.trim(),
      category: paperData.category?.trim() || undefined,
      year: paperData.year ? paperData.year : undefined,
      description: paperData.description?.trim() || undefined,
      fileName: paperData.fileName || 'examination_paper.pdf',
      fileSize: paperData.fileSize || 1024000,
      fileUrl: paperData.fileDataUrl || '',
      downloadCount: 0,
      viewCount: 0,
      uploadedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      uploadedBy: 'admin',
    };

    const updated = [newPaper, ...papers];
    localStorage.setItem(PAPERS_STORAGE_KEY, JSON.stringify(updated));
    return newPaper;
  },

  updatePaper(
    id: string,
    updates: Partial<Omit<QuestionPaper, 'id' | 'uploadedAt'>> & {
      fileBlob?: Blob;
      fileDataUrl?: string;
    }
  ): QuestionPaper | null {
    const papers = this.getPapers();
    const index = papers.findIndex((p) => p.id === id);
    if (index === -1) return null;

    const current = papers[index];
    const updatedPaper: QuestionPaper = {
      ...current,
      ...updates,
      title: updates.title !== undefined ? updates.title.trim() : current.title,
      category: updates.category !== undefined ? updates.category.trim() || undefined : current.category,
      year: updates.year !== undefined ? updates.year : current.year,
      description: updates.description !== undefined ? updates.description.trim() || undefined : current.description,
      fileUrl: updates.fileDataUrl !== undefined ? updates.fileDataUrl : current.fileUrl,
      updatedAt: new Date().toISOString(),
    };

    papers[index] = updatedPaper;
    localStorage.setItem(PAPERS_STORAGE_KEY, JSON.stringify(papers));
    return updatedPaper;
  },

  deletePaper(id: string): boolean {
    const papers = this.getPapers();
    const filtered = papers.filter((p) => p.id !== id);
    if (filtered.length === papers.length) return false;
    localStorage.setItem(PAPERS_STORAGE_KEY, JSON.stringify(filtered));
    return true;
  },

  // -------------------------------------------------------------
  // CATEGORIES CRUD
  // -------------------------------------------------------------

  getCategories(): Category[] {
    return initializeCategories();
  },

  createCategory(name: string, description?: string): Category {
    const categories = this.getCategories();
    const newCategory: Category = {
      id: 'cat-' + Date.now().toString(36),
      name: name.trim(),
      description: description?.trim() || undefined,
      createdAt: new Date().toISOString(),
    };
    const updated = [...categories, newCategory];
    localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(updated));
    return newCategory;
  },

  updateCategory(id: string, name: string, description?: string): Category | null {
    const categories = this.getCategories();
    const index = categories.findIndex((c) => c.id === id);
    if (index === -1) return null;

    const oldName = categories[index].name;
    const newName = name.trim();

    categories[index] = {
      ...categories[index],
      name: newName,
      description: description !== undefined ? description.trim() : categories[index].description,
    };
    localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(categories));

    // Also update any papers assigned to this category name
    if (oldName !== newName) {
      const papers = this.getPapers();
      const updatedPapers = papers.map((p) => (p.category === oldName ? { ...p, category: newName } : p));
      localStorage.setItem(PAPERS_STORAGE_KEY, JSON.stringify(updatedPapers));
    }

    return categories[index];
  },

  deleteCategory(id: string): boolean {
    const categories = this.getCategories();
    const target = categories.find((c) => c.id === id);
    if (!target) return false;

    const filtered = categories.filter((c) => c.id !== id);
    localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(filtered));
    return true;
  },

  getCategoryPaperCounts(): Record<string, number> {
    const papers = this.getPapers();
    const counts: Record<string, number> = {};
    papers.forEach((p) => {
      const cat = p.category || 'Uncategorized';
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return counts;
  },

  // -------------------------------------------------------------
  // METRICS & STATS
  // -------------------------------------------------------------

  recordDownload(paperId: string): void {
    const papers = this.getPapers();
    const paper = papers.find((p) => p.id === paperId);
    if (!paper) return;

    paper.downloadCount = (paper.downloadCount || 0) + 1;
    localStorage.setItem(PAPERS_STORAGE_KEY, JSON.stringify(papers));

    // Store in user download log
    try {
      const raw = localStorage.getItem(DOWNLOADS_STORAGE_KEY);
      const downloads: DownloadRecord[] = raw ? JSON.parse(raw) : [];
      const newRecord: DownloadRecord = {
        id: 'dl-' + Date.now().toString(36),
        paperId: paper.id,
        paperTitle: paper.title,
        category: paper.category,
        year: paper.year,
        downloadedAt: new Date().toISOString(),
        fileSize: paper.fileSize,
      };
      // Keep recent 100
      const updatedDownloads = [newRecord, ...downloads].slice(0, 100);
      localStorage.setItem(DOWNLOADS_STORAGE_KEY, JSON.stringify(updatedDownloads));
    } catch {
      // ignore
    }
  },

  recordView(paperId: string): void {
    const papers = this.getPapers();
    const paper = papers.find((p) => p.id === paperId);
    if (!paper) return;

    paper.viewCount = (paper.viewCount || 0) + 1;
    localStorage.setItem(PAPERS_STORAGE_KEY, JSON.stringify(papers));

    // Store in user viewed history
    try {
      const raw = localStorage.getItem(VIEWS_STORAGE_KEY);
      const views: ViewRecord[] = raw ? JSON.parse(raw) : [];
      const filtered = views.filter((v) => v.paperId !== paperId);
      const newRecord: ViewRecord = {
        paperId: paper.id,
        paperTitle: paper.title,
        viewedAt: new Date().toISOString(),
      };
      const updatedViews = [newRecord, ...filtered].slice(0, 50);
      localStorage.setItem(VIEWS_STORAGE_KEY, JSON.stringify(updatedViews));
    } catch {
      // ignore
    }
  },

  getUserDownloads(): DownloadRecord[] {
    try {
      const raw = localStorage.getItem(DOWNLOADS_STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  },

  getUserViews(): ViewRecord[] {
    try {
      const raw = localStorage.getItem(VIEWS_STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  },

  // -------------------------------------------------------------
  // USER FAVORITES
  // -------------------------------------------------------------

  getFavoriteIds(): string[] {
    try {
      const raw = localStorage.getItem(FAVORITES_STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  },

  toggleFavorite(paperId: string): boolean {
    const favs = this.getFavoriteIds();
    const exists = favs.includes(paperId);
    let updated: string[];
    if (exists) {
      updated = favs.filter((id) => id !== paperId);
    } else {
      updated = [paperId, ...favs];
    }
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(updated));
    return !exists;
  },

  isFavorite(paperId: string): boolean {
    const favs = this.getFavoriteIds();
    return favs.includes(paperId);
  },

  // -------------------------------------------------------------
  // SEARCH & FILTER ENGINE
  // -------------------------------------------------------------

  filterPapers(options: FilterOptions): QuestionPaper[] {
    let list = this.getPapers();

    // Search query filter (title or category or description)
    if (options.searchQuery && options.searchQuery.trim()) {
      const q = options.searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          (p.category && p.category.toLowerCase().includes(q)) ||
          (p.description && p.description.toLowerCase().includes(q)) ||
          (p.tags && p.tags.some((t) => t.toLowerCase().includes(q)))
      );
    }

    // Category filter
    if (options.category && options.category !== 'all') {
      list = list.filter((p) => p.category === options.category);
    }

    // Year filter
    if (options.year && options.year !== 'all') {
      list = list.filter((p) => String(p.year) === String(options.year));
    }

    // Sorting
    list = [...list].sort((a, b) => {
      if (options.sortBy === 'newest') {
        const yearA = Number(a.year) || 0;
        const yearB = Number(b.year) || 0;
        if (yearB !== yearA) return yearB - yearA;
        return new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime();
      }
      if (options.sortBy === 'oldest') {
        const yearA = Number(a.year) || 0;
        const yearB = Number(b.year) || 0;
        if (yearA !== yearB) return yearA - yearB;
        return new Date(a.uploadedAt).getTime() - new Date(b.uploadedAt).getTime();
      }
      if (options.sortBy === 'most_downloaded') {
        return (b.downloadCount || 0) - (a.downloadCount || 0);
      }
      if (options.sortBy === 'most_viewed') {
        return (b.viewCount || 0) - (a.viewCount || 0);
      }
      if (options.sortBy === 'title_asc') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

    return list;
  },

  getAvailableYears(): string[] {
    const papers = this.getPapers();
    const set = new Set<string>();
    papers.forEach((p) => {
      if (p.year) set.add(String(p.year));
    });
    return Array.from(set).sort((a, b) => Number(b) - Number(a));
  },

  // Generates real PDF blob and triggers browser download
  downloadPaperFile(paper: QuestionPaper): void {
    this.recordDownload(paper.id);
    let blob: Blob;

    if (paper.fileUrl && paper.fileUrl.startsWith('data:')) {
      // Decode data url to blob
      const arr = paper.fileUrl.split(',');
      const mime = arr[0].match(/:(.*?);/)?.[1] || 'application/pdf';
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      blob = new Blob([u8arr], { type: mime });
    } else {
      blob = generateMinimalExamPdfBlob(paper.title, paper.category || 'General', paper.year || '2024');
    }

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = paper.fileName || `${paper.title.replace(/[^a-zA-Z0-9_-]/g, '_')}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 3000);
  },
};
