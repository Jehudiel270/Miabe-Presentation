-- ============================================================================
-- RESET + RLS COMPLET SAFE
-- ============================================================================

-- USERS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can read their own data" ON public.users;
DROP POLICY IF EXISTS "Admins can read all users" ON public.users;

CREATE POLICY "Users can read their own data"
ON public.users
FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Admins can read all users"
ON public.users
FOR SELECT
USING (
  (SELECT is_admin FROM public.users WHERE id = auth.uid()) = true
);

-- ============================================================================
-- PROGRESS
-- ============================================================================
ALTER TABLE public.progress ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users see their own progress" ON public.progress;

CREATE POLICY "Users see their own progress"
ON public.progress
FOR ALL
USING (auth.uid() = user_id);

-- ============================================================================
-- ENROLLMENTS
-- ============================================================================
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users see their own enrollments" ON public.enrollments;

CREATE POLICY "Users see their own enrollments"
ON public.enrollments
FOR ALL
USING (auth.uid() = user_id);

-- ============================================================================
-- ACTIVITIES
-- ============================================================================
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users see their own activities" ON public.activities;

CREATE POLICY "Users see their own activities"
ON public.activities
FOR SELECT
USING (auth.uid() = user_id);

-- ============================================================================
-- REWARDS
-- ============================================================================
ALTER TABLE public.rewards ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users see their own rewards" ON public.rewards;

CREATE POLICY "Users see their own rewards"
ON public.rewards
FOR SELECT
USING (auth.uid() = user_id);

-- ============================================================================
-- LEADERBOARD
-- ============================================================================
ALTER TABLE public.leaderboard ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users see their own leaderboard entry" ON public.leaderboard;

CREATE POLICY "Users see their own leaderboard entry"
ON public.leaderboard
FOR SELECT
USING (auth.uid() = user_id);

-- ============================================================================
-- USER ANSWERS
-- ============================================================================
ALTER TABLE public.user_answers ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users manage their answers" ON public.user_answers;

CREATE POLICY "Users manage their answers"
ON public.user_answers
FOR ALL
USING (auth.uid() = user_id);

-- ============================================================================
-- COURSES (PUBLIC)
-- ============================================================================
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Courses are public" ON public.courses;

CREATE POLICY "Courses are public"
ON public.courses
FOR SELECT
USING (true);

-- ============================================================================
-- CHAPTERS (PUBLIC)
-- ============================================================================
ALTER TABLE public.chapters ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Chapters are public" ON public.chapters;

CREATE POLICY "Chapters are public"
ON public.chapters
FOR SELECT
USING (true);

-- ============================================================================
-- EXERCISES (PUBLIC)
-- ============================================================================
ALTER TABLE public.exercises ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Exercises are public" ON public.exercises;

CREATE POLICY "Exercises are public"
ON public.exercises
FOR SELECT
USING (true);

-- ============================================================================
-- EXAMS (PUBLIC)
-- ============================================================================
ALTER TABLE public.exams ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Exams are public" ON public.exams;

CREATE POLICY "Exams are public"
ON public.exams
FOR SELECT
USING (true);

-- ============================================================================
-- STATIC TABLES (PUBLIC)
-- ============================================================================
ALTER TABLE public.schools ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Schools public" ON public.schools;

CREATE POLICY "Schools public"
ON public.schools
FOR SELECT
USING (true);

ALTER TABLE public.fields ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Fields public" ON public.fields;

CREATE POLICY "Fields public"
ON public.fields
FOR SELECT
USING (true);

ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Classes public" ON public.classes;

CREATE POLICY "Classes public"
ON public.classes
FOR SELECT
USING (true);

-- ============================================================================
-- BANS (ADMIN ONLY)
-- ============================================================================
ALTER TABLE public.bans ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admins manage bans" ON public.bans;

CREATE POLICY "Admins manage bans"
ON public.bans
FOR ALL
USING (
  (SELECT is_admin FROM public.users WHERE id = auth.uid()) = true
);

-- ============================================================================
-- FIN
-- ============================================================================



-- ============================================================================
-- RLS AVANCÉ : INSERT / UPDATE / DELETE + SÉCURITÉ
-- ============================================================================

-- ============================================================================
-- USERS (profil utilisateur)
-- ============================================================================
DROP POLICY IF EXISTS "Users can insert their profile" ON public.users;
DROP POLICY IF EXISTS "Users can update their profile" ON public.users;

-- Création du profil (important pour Supabase Auth)
CREATE POLICY "Users can insert their profile"
ON public.users
FOR INSERT
WITH CHECK (auth.uid() = id);

-- Modification de son propre profil uniquement
CREATE POLICY "Users can update their profile"
ON public.users
FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- ============================================================================
-- PROGRESS (anti-triche)
-- ============================================================================
DROP POLICY IF EXISTS "Users insert their progress" ON public.progress;
DROP POLICY IF EXISTS "Users update their progress" ON public.progress;

CREATE POLICY "Users insert their progress"
ON public.progress
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users update their progress"
ON public.progress
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- ============================================================================
-- ENROLLMENTS
-- ============================================================================
DROP POLICY IF EXISTS "Users insert enrollments" ON public.enrollments;

CREATE POLICY "Users insert enrollments"
ON public.enrollments
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- ============================================================================
-- USER ANSWERS (quiz sécurisé)
-- ============================================================================
DROP POLICY IF EXISTS "Users insert answers" ON public.user_answers;
DROP POLICY IF EXISTS "Users update answers" ON public.user_answers;

CREATE POLICY "Users insert answers"
ON public.user_answers
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users update answers"
ON public.user_answers
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- ============================================================================
-- ACTIVITIES (logs)
-- ============================================================================
DROP POLICY IF EXISTS "Users insert activities" ON public.activities;

CREATE POLICY "Users insert activities"
ON public.activities
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- ============================================================================
-- REWARDS
-- ============================================================================
DROP POLICY IF EXISTS "System inserts rewards" ON public.rewards;

-- Empêche les users de se donner des récompenses eux-mêmes
CREATE POLICY "System inserts rewards"
ON public.rewards
FOR INSERT
WITH CHECK (
  (SELECT is_admin FROM public.users WHERE id = auth.uid()) = true
);

-- ============================================================================
-- LEADERBOARD (anti-cheat)
-- ============================================================================
DROP POLICY IF EXISTS "System updates leaderboard" ON public.leaderboard;

CREATE POLICY "System updates leaderboard"
ON public.leaderboard
FOR UPDATE
USING (
  (SELECT is_admin FROM public.users WHERE id = auth.uid()) = true
);

-- ============================================================================
-- ADMIN GLOBAL ACCESS
-- ============================================================================
DROP POLICY IF EXISTS "Admins full access users" ON public.users;
DROP POLICY IF EXISTS "Admins full access progress" ON public.progress;
DROP POLICY IF EXISTS "Admins full access enrollments" ON public.enrollments;
DROP POLICY IF EXISTS "Admins full access answers" ON public.user_answers;
DROP POLICY IF EXISTS "Admins full access activities" ON public.activities;

-- USERS
CREATE POLICY "Admins full access users"
ON public.users
FOR ALL
USING (
  (SELECT is_admin FROM public.users WHERE id = auth.uid()) = true
);

-- PROGRESS
CREATE POLICY "Admins full access progress"
ON public.progress
FOR ALL
USING (
  (SELECT is_admin FROM public.users WHERE id = auth.uid()) = true
);

-- ENROLLMENTS
CREATE POLICY "Admins full access enrollments"
ON public.enrollments
FOR ALL
USING (
  (SELECT is_admin FROM public.users WHERE id = auth.uid()) = true
);

-- ANSWERS
CREATE POLICY "Admins full access answers"
ON public.user_answers
FOR ALL
USING (
  (SELECT is_admin FROM public.users WHERE id = auth.uid()) = true
);

-- ACTIVITIES
CREATE POLICY "Admins full access activities"
ON public.activities
FOR ALL
USING (
  (SELECT is_admin FROM public.users WHERE id = auth.uid()) = true
);

-- ============================================================================
-- PROTECTION BONUS (optionnel mais recommandé)
-- ============================================================================
-- Empêche un user de supprimer ses données critiques

DROP POLICY IF EXISTS "Prevent user delete progress" ON public.progress;

CREATE POLICY "Prevent user delete progress"
ON public.progress
FOR DELETE
USING (false);

-- ============================================================================
-- FIN
-- ============================================================================