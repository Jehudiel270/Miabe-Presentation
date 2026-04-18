// lib/supabase/dashboard.queries.ts
// All Supabase queries needed for the dashboard page.
// Call these in your Server Component (app/dashboard/page.tsx).

import { createClient } from "@/lib/supabase/server";
import type { EnrollmentWithCourse, ActivityTyped } from "@/lib/supabase/types";

// ─── Current authenticated user ─────────────────────────────────────────────
export async function getDashboardUser() {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) return null;

  // Fetch profile from public.users table using Auth ID (more secure)
  const { data: profile, error: profileError } = await supabase
    .from("users")
    .select("id, name, email, is_admin")
    .eq("id", user.id)
    .single();

  if (profileError) {
    console.error("[getDashboardUser] Profile fetch error:", profileError);
  }

  return profile;
}

// ─── Enrollments + progress for the current user ─────────────────────────────
export async function getUserEnrollments(
  userId: string,
): Promise<EnrollmentWithCourse[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("enrollments")
    .select(
      `
      *,
      courses (
        id, title, description, cloudinary_url,
        fields ( name ),
        classes ( name )
      ),
      progress: progress (
        progress_percent, last_accessed
      )
      `,
    )
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[getUserEnrollments]", error.message);
    return [];
  }

  return (data ?? []) as EnrollmentWithCourse[];
}

// ─── Global progression (avg across all enrolled courses) ────────────────────
export async function getGlobalProgress(userId: string): Promise<number> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("progress")
    .select("progress_percent")
    .eq("user_id", userId);

  if (error || !data?.length) return 0;

  const avg =
    data.reduce((sum, row) => sum + (row.progress_percent ?? 0), 0) /
    data.length;

  return Math.round(avg);
}

// ─── Recently accessed courses (last_accessed DESC, limit 3) ─────────────────
export async function getRecentCourses(userId: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("progress")
    .select(
      `
      last_accessed,
      progress_percent,
      courses ( id, title, cloudinary_url )
      `,
    )
    .eq("user_id", userId)
    .not("last_accessed", "is", null)
    .order("last_accessed", { ascending: false })
    .limit(3);

  if (error) {
    console.error("[getRecentCourses]", error.message);
    return [];
  }

  return data ?? [];
}

// ─── Recent activity feed ─────────────────────────────────────────────────────
export async function getRecentActivities(
  userId: string,
): Promise<ActivityTyped[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("activities")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(5);

  if (error) {
    console.error("[getRecentActivities]", error.message);
    return [];
  }

  return (data ?? []) as ActivityTyped[];
}

// ─── Pending exercises (unanswered) ──────────────────────────────────────────
export async function getPendingExercisesCount(
  userId: string,
): Promise<number> {
  const supabase = createClient();

  // All exercises for enrolled courses
  const { data: enrollments } = await supabase
    .from("enrollments")
    .select("course_id")
    .eq("user_id", userId);

  if (!enrollments?.length) return 0;

  const courseIds = enrollments
    .map((e) => e.course_id)
    .filter(Boolean) as string[];

  const { data: chapters } = await supabase
    .from("chapters")
    .select("id")
    .in("course_id", courseIds);

  if (!chapters?.length) return 0;

  const chapterIds = chapters.map((c) => c.id);

  const { count: totalExercises } = await supabase
    .from("exercises")
    .select("id", { count: "exact", head: true })
    .in("chapter_id", chapterIds);

  const { count: answeredExercises } = await supabase
    .from("user_answers")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId);

  return Math.max(0, (totalExercises ?? 0) - (answeredExercises ?? 0));
}

// ─── Leaderboard rank ────────────────────────────────────────────────────────
export async function getUserLeaderboardEntry(userId: string) {
  const supabase = createClient();

  const { data } = await supabase
    .from("leaderboard")
    .select("score, rank")
    .eq("user_id", userId)
    .single();

  return data ?? null;
}

// ─── Rewards / badges ────────────────────────────────────────────────────────
export async function getUserRewards(userId: string) {
  const supabase = createClient();

  const { data } = await supabase
    .from("rewards")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(3);

  return data ?? [];
}

// ─── Last studied chapter (for "Continue" button) ────────────────────────────
export async function getLastStudiedChapter(userId: string) {
  const supabase = createClient();

  const { data } = await supabase
    .from("progress")
    .select(
      `
      last_accessed,
      courses (
        id, title,
        chapters ( id, title, order_index )
      )
      `,
    )
    .eq("user_id", userId)
    .not("last_accessed", "is", null)
    .order("last_accessed", { ascending: false })
    .limit(1)
    .single();

  if (!data?.courses) return null;

  interface CourseWithChapters {
    id: string;
    title: string;
    chapters: Array<{
      id: string;
      title: string;
      order_index: number | null;
    }> | null;
  }

  const course = data.courses as unknown as CourseWithChapters;
  const chapters = (course.chapters ?? []).sort(
    (a, b) => (a.order_index ?? 0) - (b.order_index ?? 0),
  );

  return {
    courseId: course.id,
    courseTitle: course.title,
    chapter: chapters[0] ?? null,
  };
}
