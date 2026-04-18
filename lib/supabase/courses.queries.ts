/**
 * Optimized Supabase queries for courses
 * All queries use proper relations and select only needed fields
 * Reduces number of API calls and improves performance
 */

import { supabase } from "@/lib/supabaseClient";
import type {
  Course,
  CourseWithDetails,
  CourseDetailResponse,
  FilterOptions,
  ChapterDetail,
} from "@/types/courses";

/**
 * Fetch all courses with optimized relations
 * Uses API route to bypass RLS policy recursion issues
 */
export async function fetchAllCourses(options?: FilterOptions) {
  try {
    const limit = options?.limit || 20;
    const offset = options?.offset || 0;

    // Build URL params
    const params = new URLSearchParams({
      limit: limit.toString(),
      offset: offset.toString(),
    });

    if (options?.classId) {
      params.append("classId", options.classId);
    }
    if (options?.fieldId) {
      params.append("fieldId", options.fieldId);
    }

    // Call API route instead of direct Supabase query
    const response = await fetch(`/api/courses/fetch?${params}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      console.error("[fetchAllCourses] API response not ok:", response.status);
      return { courses: [], total: 0, hasMore: false };
    }

    const { courses, total, hasMore } = await response.json();

    const courseData: CourseWithDetails[] = (courses || []).map(
      (course: Course) => ({
        ...course,
        chapterCount: course.chapters?.length || 0,
      }),
    );

    return {
      courses: courseData,
      total: total || 0,
      hasMore: hasMore || false,
    };
  } catch (err) {
    console.error("[fetchAllCourses] Exception:", err);
    return { courses: [], total: 0, hasMore: false };
  }
}

/**
 * Search courses by title/description
 * Uses API route with filtering
 */
export async function searchCourses(
  query: string,
  options?: Omit<FilterOptions, "search">,
) {
  if (!query || query.length < 2) {
    return { courses: [], total: 0 };
  }

  try {
    const searchQuery = query.toLowerCase();

    // Get courses from API route
    const params = new URLSearchParams({
      limit: "100",
      offset: "0",
    });

    if (options?.classId) {
      params.append("classId", options.classId);
    }
    if (options?.fieldId) {
      params.append("fieldId", options.fieldId);
    }

    const response = await fetch(`/api/courses/fetch?${params}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      return { courses: [], total: 0 };
    }

    const { courses: allCourses } = await response.json();

    // Filter results locally by title/description
    const filtered = (allCourses || []).filter(
      (course: Course) =>
        course.title.toLowerCase().includes(searchQuery) ||
        (course.description?.toLowerCase().includes(searchQuery) ?? false),
    );

    const courses: CourseWithDetails[] = filtered.map((course: Course) => ({
      ...course,
      chapterCount: course.chapters?.length || 0,
    }));

    return { courses, total: filtered.length };
  } catch (err) {
    console.error("[searchCourses] Exception:", err);
    return { courses: [], total: 0 };
  }
}

/**
 * Fetch single course with all details and chapters
 * Optimized for course detail page
 */
export async function fetchCourseDetail(
  courseId: string,
  userId?: string,
): Promise<CourseDetailResponse | null> {
  try {
    // Fetch course with chapters in one query
    const { data: courseData, error: courseError } = await supabase
      .from("courses")
      .select(
        `
        id,
        title,
        description,
        cloudinary_url,
        chapters(
          id,
          title,
          description,
          content,
          order_index
        ),
        classes:class_id(id, name),
        fields:field_id(id, name),
        schools:school_id(id, name)
      `,
      )
      .eq("id", courseId)
      .single();

    if (courseError || !courseData) {
      console.error("[fetchCourseDetail]", courseError?.message);
      return null;
    }

    // Sort chapters by order
    const chapters = (courseData.chapters || []).sort(
      (a: ChapterDetail, b: ChapterDetail) =>
        (a.order_index || 0) - (b.order_index || 0),
    );

    // Fetch user progress if userId provided
    let userProgress = undefined;
    if (userId) {
      const { data: progressData } = await supabase
        .from("progress")
        .select("*")
        .eq("course_id", courseId)
        .eq("user_id", userId)
        .single();

      userProgress = progressData || undefined;
    }

    return {
      course: courseData,
      chapters,
      userProgress,
    };
  } catch (err) {
    console.error("[fetchCourseDetail] Exception:", err);
    return null;
  }
}

/**
 * Fetch all available classes and fields for filtering
 * Cached result (call once on app load)
 */
export async function fetchFilterOptions() {
  try {
    const [classesResult, fieldsResult] = await Promise.all([
      supabase
        .from("course_classes")
        .select("id, name")
        .order("name", { ascending: true }),
      supabase
        .from("fields")
        .select("id, name")
        .order("name", { ascending: true }),
    ]);

    return {
      classes: classesResult.data || [],
      fields: fieldsResult.data || [],
    };
  } catch (err) {
    console.error("[fetchFilterOptions] Exception:", err);
    return { classes: [], fields: [] };
  }
}

/**
 * Get user's enrolled courses
 */
export async function fetchUserEnrolledCourses(userId: string) {
  try {
    const { data, error } = await supabase
      .from("enrollments")
      .select(
        `
        id,
        status,
        course_id,
        courses(
          id,
          title,
          cloudinary_url,
          chapters:chapters(id)
        ),
        progress:progress(progress_percent, last_accessed)
      `,
      )
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[fetchUserEnrolledCourses]", error.message);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error("[fetchUserEnrolledCourses] Exception:", err);
    return [];
  }
}
