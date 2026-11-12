import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { QuestionPaper, Category, DownloadRecord, ViewRecord } from '../types';
import { paperService } from '../services/paperService';

interface PaperContextType {
  papers: QuestionPaper[];
  categories: Category[];
  favoriteIds: string[];
  downloads: DownloadRecord[];
  views: ViewRecord[];
  categoryCounts: Record<string, number>;
  activeViewingPaper: QuestionPaper | null;
  openPdfViewer: (paper: QuestionPaper) => void;
  closePdfViewer: () => void;
  downloadPaper: (paper: QuestionPaper) => void;
  toggleFavorite: (paperId: string) => boolean;
  isFavorite: (paperId: string) => boolean;
  createPaper: (data: {
    title: string;
    category?: string;
    year?: number | string;
    description?: string;
    fileName: string;
    fileSize: number;
    fileBlob?: Blob;
    fileDataUrl?: string;
  }) => QuestionPaper;
  updatePaper: (
    id: string,
    data: Partial<Omit<QuestionPaper, 'id' | 'uploadedAt'>> & {
      fileBlob?: Blob;
      fileDataUrl?: string;
    }
  ) => QuestionPaper | null;
  deletePaper: (id: string) => boolean;
  createCategory: (name: string, description?: string) => Category;
  updateCategory: (id: string, name: string, description?: string) => Category | null;
  deleteCategory: (id: string) => boolean;
  refreshData: () => void;
}

const PaperContext = createContext<PaperContextType | undefined>(undefined);

export const PaperProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [papers, setPapers] = useState<QuestionPaper[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [downloads, setDownloads] = useState<DownloadRecord[]>([]);
  const [views, setViews] = useState<ViewRecord[]>([]);
  const [activeViewingPaper, setActiveViewingPaper] = useState<QuestionPaper | null>(null);

  const refreshData = useCallback(() => {
    setPapers(paperService.getPapers());
    setCategories(paperService.getCategories());
    setFavoriteIds(paperService.getFavoriteIds());
    setDownloads(paperService.getUserDownloads());
    setViews(paperService.getUserViews());
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const openPdfViewer = (paper: QuestionPaper) => {
    paperService.recordView(paper.id);
    setActiveViewingPaper(paper);
    refreshData();
  };

  const closePdfViewer = () => {
    setActiveViewingPaper(null);
  };

  const downloadPaper = (paper: QuestionPaper) => {
    paperService.downloadPaperFile(paper);
    refreshData();
  };

  const toggleFavorite = (paperId: string): boolean => {
    const res = paperService.toggleFavorite(paperId);
    setFavoriteIds(paperService.getFavoriteIds());
    return res;
  };

  const isFavorite = (paperId: string): boolean => {
    return favoriteIds.includes(paperId);
  };

  const createPaper = (data: {
    title: string;
    category?: string;
    year?: number | string;
    description?: string;
    fileName: string;
    fileSize: number;
    fileBlob?: Blob;
    fileDataUrl?: string;
  }) => {
    const created = paperService.createPaper(data);
    refreshData();
    return created;
  };

  const updatePaper = (
    id: string,
    data: Partial<Omit<QuestionPaper, 'id' | 'uploadedAt'>> & {
      fileBlob?: Blob;
      fileDataUrl?: string;
    }
  ) => {
    const updated = paperService.updatePaper(id, data);
    refreshData();
    return updated;
  };

  const deletePaper = (id: string) => {
    const res = paperService.deletePaper(id);
    refreshData();
    return res;
  };

  const createCategory = (name: string, description?: string) => {
    const created = paperService.createCategory(name, description);
    refreshData();
    return created;
  };

  const updateCategory = (id: string, name: string, description?: string) => {
    const updated = paperService.updateCategory(id, name, description);
    refreshData();
    return updated;
  };

  const deleteCategory = (id: string) => {
    const res = paperService.deleteCategory(id);
    refreshData();
    return res;
  };

  // Compute category counts
  const categoryCounts = papers.reduce((acc, p) => {
    const cat = p.category || 'Uncategorized';
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <PaperContext.Provider
      value={{
        papers,
        categories,
        favoriteIds,
        downloads,
        views,
        categoryCounts,
        activeViewingPaper,
        openPdfViewer,
        closePdfViewer,
        downloadPaper,
        toggleFavorite,
        isFavorite,
        createPaper,
        updatePaper,
        deletePaper,
        createCategory,
        updateCategory,
        deleteCategory,
        refreshData,
      }}
    >
      {children}
    </PaperContext.Provider>
  );
};

export function usePapers() {
  const context = useContext(PaperContext);
  if (!context) {
    throw new Error('usePapers must be used within a PaperProvider');
  }
  return context;
}
