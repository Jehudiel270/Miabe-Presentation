// Auto-generated from your Supabase schema
// Regenerate with: npx supabase gen types typescript --project-id YOUR_PROJECT_ID > lib/supabase/types.ts

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          name: string | null;
          email: string;
          password: string | null;
          created_at: string | null;
          is_admin: boolean | null;
        };
        Insert: Omit<Database["public"]["Tables"]["users"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["users"]["Insert"]>;
      };
      courses: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          school_id: string | null;
          field_id: string | null;
          class_id: string | null;
          cloudinary_url: string | null;
          created_at: string | null;
        };
        Insert: Omit<Database["public"]["Tables"]["courses"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["courses"]["Insert"]>;
      };
      enrollments: {
        Row: {
          id: string;
          user_id: string | null;
          course_id: string | null;
          status: string | null;
          created_at: string | null;
        };
        Insert: Omit<Database["public"]["Tables"]["enrollments"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["enrollments"]["Insert"]>;
      };
      progress: {
        Row: {
          id: string;
          user_id: string | null;
          course_id: string | null;
          progress_percent: number | null;
          last_accessed: string | null;
        };
        Insert: Omit<Database["public"]["Tables"]["progress"]["Row"], "id">;
        Update: Partial<Database["public"]["Tables"]["progress"]["Insert"]>;
      };
      activities: {
        Row: {
          id: string;
          user_id: string | null;
          type: string | null;
          description: string | null;
          created_at: string | null;
        };
        Insert: Omit<Database["public"]["Tables"]["activities"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["activities"]["Insert"]>;
      };
      chapters: {
        Row: {
          id: string;
          course_id: string | null;
          title: string | null;
          content: string | null;
          order_index: number | null;
        };
        Insert: Omit<Database["public"]["Tables"]["chapters"]["Row"], "id">;
        Update: Partial<Database["public"]["Tables"]["chapters"]["Insert"]>;
      };
      exercises: {
        Row: {
          id: string;
          chapter_id: string | null;
          question: string | null;
          type: string | null;
          difficulty: string | null;
        };
        Insert: Omit<Database["public"]["Tables"]["exercises"]["Row"], "id">;
        Update: Partial<Database["public"]["Tables"]["exercises"]["Insert"]>;
      };
      user_answers: {
        Row: {
          id: string;
          user_id: string | null;
          exercise_id: string | null;
          answer: string | null;
          is_correct: boolean | null;
          created_at: string | null;
        };
        Insert: Omit<Database["public"]["Tables"]["user_answers"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["user_answers"]["Insert"]>;
      };
      leaderboard: {
        Row: {
          id: string;
          user_id: string | null;
          score: number | null;
          rank: number | null;
          updated_at: string | null;
        };
        Insert: Omit<Database["public"]["Tables"]["leaderboard"]["Row"], "id" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["leaderboard"]["Insert"]>;
      };
      rewards: {
        Row: {
          id: string;
          user_id: string | null;
          type: string | null;
          description: string | null;
          created_at: string | null;
        };
        Insert: Omit<Database["public"]["Tables"]["rewards"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["rewards"]["Insert"]>;
      };
      schools: {
        Row: { id: string; name: string };
        Insert: Omit<Database["public"]["Tables"]["schools"]["Row"], "id">;
        Update: Partial<Database["public"]["Tables"]["schools"]["Insert"]>;
      };
      fields: {
        Row: { id: string; name: string };
        Insert: Omit<Database["public"]["Tables"]["fields"]["Row"], "id">;
        Update: Partial<Database["public"]["Tables"]["fields"]["Insert"]>;
      };
      classes: {
        Row: { id: string; name: string };
        Insert: Omit<Database["public"]["Tables"]["classes"]["Row"], "id">;
        Update: Partial<Database["public"]["Tables"]["classes"]["Insert"]>;
      };
      exams: {
        Row: {
          id: string;
          title: string | null;
          year: number | null;
          school_id: string | null;
          field_id: string | null;
          class_id: string | null;
          cloudinary_url: string | null;
          created_at: string | null;
          course_id: string | null;
        };
        Insert: Omit<Database["public"]["Tables"]["exams"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["exams"]["Insert"]>;
      };
      bans: {
        Row: {
          id: string;
          user_id: string | null;
          reason: string | null;
          banned_at: string | null;
        };
        Insert: Omit<Database["public"]["Tables"]["bans"]["Row"], "id" | "banned_at">;
        Update: Partial<Database["public"]["Tables"]["bans"]["Insert"]>;
      };
    };
  };
};

// ─── Convenient Row aliases ──────────────────────────────────────────────────
export type UserRow        = Database["public"]["Tables"]["users"]["Row"];
export type CourseRow      = Database["public"]["Tables"]["courses"]["Row"];
export type EnrollmentRow  = Database["public"]["Tables"]["enrollments"]["Row"];
export type ProgressRow    = Database["public"]["Tables"]["progress"]["Row"];
export type ActivityRow    = Database["public"]["Tables"]["activities"]["Row"];
export type ChapterRow     = Database["public"]["Tables"]["chapters"]["Row"];
export type ExerciseRow    = Database["public"]["Tables"]["exercises"]["Row"];
export type UserAnswerRow  = Database["public"]["Tables"]["user_answers"]["Row"];
export type LeaderboardRow = Database["public"]["Tables"]["leaderboard"]["Row"];
export type RewardRow      = Database["public"]["Tables"]["rewards"]["Row"];

// ─── Dashboard-specific joined types ────────────────────────────────────────
export type EnrollmentWithCourse = EnrollmentRow & {
  courses: CourseRow | null;
  progress: ProgressRow[] | null;
};

export type ActivityTyped = ActivityRow & {
  // type values used in your DB: "completed" | "quiz" | "discussion" | "started" | "review"
  type: "completed" | "quiz" | "discussion" | "started" | "review" | string;
};
