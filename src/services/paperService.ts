import { QuestionPaper, Category, FilterOptions, DownloadRecord, ViewRecord } from '../types';
import { generateQuestionPaperPdfBlob } from '../utils/pdfGenerator';
import { DEMO_PAPERS, DEMO_CATEGORIES } from '../data/samplePapers';

const PAPERS_STORAGE_KEY = 'uqph_papers_data_v2';
const CATEGORIES_STORAGE_KEY = 'uqph_categories_data_v2';
const FAVORITES_STORAGE_KEY = 'uqph_favorites_data_v2';
const DOWNLOADS_STORAGE_KEY = 'uqph_downloads_data_v2';
const VIEWS_STORAGE_KEY = 'uqph_views_data_v2';
const HIDDEN_DEMO_PAPERS_KEY = 'uqph_hidden_demo_ids_v1';
const DEMO_PAPER_OVERRIDES_KEY = 'uqph_demo_paper_overrides_v1';
const DEMO_METRICS_STORAGE_KEY = 'uqph_demo_metrics_v2';

// Retrieve user uploaded papers from local storage
function getStoredUserPapers(): QuestionPaper[] {
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
  return [];
}

// Retrieve hidden demo paper IDs (if admin deleted any demo paper)
function getHiddenDemoPaperIds(): string[] {
  try {
    const raw = localStorage.getItem(HIDDEN_DEMO_PAPERS_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {
    // ignore
  }
  return [];
}

// Retrieve demo paper updates made by admin
function getDemoPaperOverrides(): Record<string, Partial<QuestionPaper>> {
  try {
    const raw = localStorage.getItem(DEMO_PAPER_OVERRIDES_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {
    // ignore
  }
  return {};
}

// Retrieve live view/download counters for demo papers
function getDemoMetrics(): Record<string, { downloads?: number; views?: number }> {
  try {
    const raw = localStorage.getItem(DEMO_METRICS_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {
    // ignore
  }
  return {};
}

function saveDemoMetrics(metrics: Record<string, { downloads?: number; views?: number }>): void {
  try {
    localStorage.setItem(DEMO_METRICS_STORAGE_KEY, JSON.stringify(metrics));
  } catch {
    // ignore
  }
}

// Retrieve user-created categories
function getStoredUserCategories(): Category[] {
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
  return [];
}

export const paperService = {
  // -------------------------------------------------------------
  // PAPERS CRUD (Combines User Uploads + 12 Separate Demo Papers)
  // -------------------------------------------------------------

  getPapers(): QuestionPaper[] {
    const userUploadedPapers = getStoredUserPapers();
    const hiddenDemoIds = getHiddenDemoPaperIds();
    const demoOverrides = getDemoPaperOverrides();
    const demoMetrics = getDemoMetrics();

    // Process the 12 demo papers: apply admin edits and live interaction metrics
    const activeDemoPapers = DEMO_PAPERS.filter((dp) => !hiddenDemoIds.includes(dp.id)).map((dp) => {
      const override = demoOverrides[dp.id] || {};
      const metric = demoMetrics[dp.id] || {};

      return {
        ...dp,
        ...override,
        downloadCount: metric.downloads !== undefined ? metric.downloads : dp.downloadCount,
        viewCount: metric.views !== undefined ? metric.views : dp.viewCount,
      };
    });

    // Real uploaded papers take precedence, followed by the separate demo papers
    return [...userUploadedPapers, ...activeDemoPapers];
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
    const userPapers = getStoredUserPapers();
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
      isDemo: false,
    };

    // Stored separately in PAPERS_STORAGE_KEY for user uploads
    const updated = [newPaper, ...userPapers];
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
    // 1. Check if it is a user uploaded paper
    const userPapers = getStoredUserPapers();
    const userIndex = userPapers.findIndex((p) => p.id === id);

    if (userIndex !== -1) {
      const current = userPapers[userIndex];
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

      userPapers[userIndex] = updatedPaper;
      localStorage.setItem(PAPERS_STORAGE_KEY, JSON.stringify(userPapers));
      return updatedPaper;
    }

    // 2. Check if it is a demo paper
    const isDemo = DEMO_PAPERS.some((dp) => dp.id === id);
    if (isDemo) {
      const overrides = getDemoPaperOverrides();
      overrides[id] = {
        ...(overrides[id] || {}),
        ...updates,
        title: updates.title !== undefined ? updates.title.trim() : undefined,
        category: updates.category !== undefined ? updates.category.trim() || undefined : undefined,
        year: updates.year !== undefined ? updates.year : undefined,
        description: updates.description !== undefined ? updates.description.trim() || undefined : undefined,
        updatedAt: new Date().toISOString(),
      };
      localStorage.setItem(DEMO_PAPER_OVERRIDES_KEY, JSON.stringify(overrides));
      return this.getPaperById(id) || null;
    }

    return null;
  },

  deletePaper(id: string): boolean {
    // 1. Check user uploaded papers
    const userPapers = getStoredUserPapers();
    const filteredUserPapers = userPapers.filter((p) => p.id !== id);

    if (filteredUserPapers.length !== userPapers.length) {
      localStorage.setItem(PAPERS_STORAGE_KEY, JSON.stringify(filteredUserPapers));
      return true;
    }

    // 2. Check if it is a demo paper
    const isDemo = DEMO_PAPERS.some((dp) => dp.id === id);
    if (isDemo) {
      const hiddenIds = getHiddenDemoPaperIds();
      if (!hiddenIds.includes(id)) {
        hiddenIds.push(id);
        localStorage.setItem(HIDDEN_DEMO_PAPERS_KEY, JSON.stringify(hiddenIds));
      }
      return true;
    }

    return false;
  },

  // -------------------------------------------------------------
  // CATEGORIES CRUD (Combines User Created + 5 Demo Categories)
  // -------------------------------------------------------------

  getCategories(): Category[] {
    const userCategories = getStoredUserCategories();
    const categoryMap = new Map<string, Category>();

    // Add demo categories first
    DEMO_CATEGORIES.forEach((cat) => {
      categoryMap.set(cat.name.toLowerCase(), cat);
    });

    // Add user categories (can override or add new)
    userCategories.forEach((cat) => {
      categoryMap.set(cat.name.toLowerCase(), cat);
    });

    return Array.from(categoryMap.values());
  },

  createCategory(name: string, description?: string): Category {
    const userCategories = getStoredUserCategories();
    const newCategory: Category = {
      id: 'cat-' + Date.now().toString(36),
      name: name.trim(),
      description: description?.trim() || undefined,
      createdAt: new Date().toISOString(),
    };
    const updated = [...userCategories, newCategory];
    localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(updated));
    return newCategory;
  },

  updateCategory(id: string, name: string, description?: string): Category | null {
    const userCategories = getStoredUserCategories();
    const index = userCategories.findIndex((c) => c.id === id);

    if (index === -1) {
      // Check if trying to edit a demo category - clone it to user categories
      const demoCat = DEMO_CATEGORIES.find((c) => c.id === id);
      if (demoCat) {
        const cloned: Category = {
          ...demoCat,
          name: name.trim(),
          description: description !== undefined ? description.trim() : demoCat.description,
        };
        localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify([...userCategories, cloned]));
        return cloned;
      }
      return null;
    }

    const oldName = userCategories[index].name;
    const newName = name.trim();

    userCategories[index] = {
      ...userCategories[index],
      name: newName,
      description: description !== undefined ? description.trim() : userCategories[index].description,
    };
    localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(userCategories));

    // Also update any user papers assigned to oldName
    if (oldName !== newName) {
      const userPapers = getStoredUserPapers();
      const updatedUserPapers = userPapers.map((p) => (p.category === oldName ? { ...p, category: newName } : p));
      localStorage.setItem(PAPERS_STORAGE_KEY, JSON.stringify(updatedUserPapers));
    }

    return userCategories[index];
  },

  deleteCategory(id: string): boolean {
    const userCategories = getStoredUserCategories();
    const filtered = userCategories.filter((c) => c.id !== id);
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
    const userPapers = getStoredUserPapers();
    const userPaper = userPapers.find((p) => p.id === paperId);

    if (userPaper) {
      userPaper.downloadCount = (userPaper.downloadCount || 0) + 1;
      localStorage.setItem(PAPERS_STORAGE_KEY, JSON.stringify(userPapers));
    } else {
      // It's a demo paper
      const demoMetrics = getDemoMetrics();
      const current = demoMetrics[paperId] || {};
      demoMetrics[paperId] = {
        ...current,
        downloads: (current.downloads !== undefined ? current.downloads : 0) + 1,
      };
      saveDemoMetrics(demoMetrics);
    }

    // Store in user download log
    const allPapers = this.getPapers();
    const paper = allPapers.find((p) => p.id === paperId);
    if (!paper) return;

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
      const updatedDownloads = [newRecord, ...downloads].slice(0, 100);
      localStorage.setItem(DOWNLOADS_STORAGE_KEY, JSON.stringify(updatedDownloads));
    } catch {
      // ignore
    }
  },

  recordView(paperId: string): void {
    const userPapers = getStoredUserPapers();
    const userPaper = userPapers.find((p) => p.id === paperId);

    if (userPaper) {
      userPaper.viewCount = (userPaper.viewCount || 0) + 1;
      localStorage.setItem(PAPERS_STORAGE_KEY, JSON.stringify(userPapers));
    } else {
      // It's a demo paper
      const demoMetrics = getDemoMetrics();
      const current = demoMetrics[paperId] || {};
      demoMetrics[paperId] = {
        ...current,
        views: (current.views !== undefined ? current.views : 0) + 1,
      };
      saveDemoMetrics(demoMetrics);
    }

    // Store in user viewed history
    const allPapers = this.getPapers();
    const paper = allPapers.find((p) => p.id === paperId);
    if (!paper) return;

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

    // Search query filter (title, category, description, or tags)
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

  // Generates genuine multi-page PDF blob with answer keys and triggers browser download
  downloadPaperFile(paper: QuestionPaper): void {
    this.recordDownload(paper.id);
    let blob: Blob;

    if (paper.fileUrl && paper.fileUrl.startsWith('data:')) {
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
      blob = generateQuestionPaperPdfBlob(paper);
    }

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = paper.fileName || `${paper.title.replace(/[^a-zA-Z0-9_-]/g, '_')}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 4000);
  },
};
