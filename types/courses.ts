// ─── Base types from Supabase ──────────────────────────────────────────────
import type { CourseRow, ChapterRow, ProgressRow } from "@/lib/supabase/types";

// ─── Extended course types ──────────────────────────────────────────────────
export type Course = CourseRow & {
  chapters?: ChapterRow[];
  classes?: { id: string; name: string } | null;
  fields?: { id: string; name: string } | null;
  schools?: { id: string; name: string } | null;
};

export type CourseWithDetails = Course & {
  chapterCount: number;
  progressPercent?: number;
};

export type Chapter = ChapterRow;

export type ChapterDetail = {
  id: string;
  title: string | null;
  description: string | null;
  content: string | null;
  order_index: number | null;
};

export type CourseDetail = {
  id: string;
  title: string;
  description: string | null;
  cloudinary_url: string | null;
  chapters: ChapterDetail[];
  classes: { id: string; name: string }[] | null;
  fields: { id: string; name: string }[] | null;
  schools: { id: string; name: string }[] | null;
};

// ─── API Response types ─────────────────────────────────────────────────────
export type CourseDetailResponse = {
  course: CourseDetail;
  chapters: ChapterDetail[];
  userProgress?: ProgressRow;
};

// ─── Filter and search types ────────────────────────────────────────────────
export type FilterOptions = {
  limit?: number;
  offset?: number;
  classId?: string;
  fieldId?: string;
  search?: string;
};

export type FilterValues = {
  classId?: string;
  fieldId?: string;
  search?: string;
  selectedClass?: string;
  selectedField?: string;
  selectedLevel?: string;
};

export type CoursesResponse = {
  courses: CourseWithDetails[];
  total: number;
  hasMore: boolean;
};

export type SearchResponse = {
  courses: CourseWithDetails[];
  total: number;
};
