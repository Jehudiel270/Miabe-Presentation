-- ============================================================================
-- RLS POLICIES - CORRECTIONS CIBLÉES
-- ============================================================================
-- Ne corrige QUE les problèmes identifiés dans tes policies existantes
-- ============================================================================

-- ============================================================================
-- 1. AJOUTER les 3 tables MANQUANTES
-- ============================================================================

-- QUIZ_QUESTIONS
CREATE POLICY "quiz_questions_select_public"
  ON public.quiz_questions FOR SELECT
  USING (true);

CREATE POLICY "quiz_questions_admin_manage"
  ON public.quiz_questions FOR ALL
  USING (
    (SELECT is_admin FROM public.users WHERE id = auth.uid()) = true
  );

CREATE POLICY "quiz_questions_enrolled_users_select"
  ON public.quiz_questions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM enrollments e
      WHERE e.user_id = auth.uid()
        AND e.course_id = (
          SELECT quiz_id FROM public.exams 
          WHERE quiz_questions.quiz_id = quiz_id LIMIT 1
        )
    )
  );

-- QUIZZES
CREATE POLICY "quizzes_select_public"
  ON public.quizzes FOR SELECT
  USING (true);

CREATE POLICY "quizzes_admin_manage"
  ON public.quizzes FOR ALL
  USING (
    (SELECT is_admin FROM public.users WHERE id = auth.uid()) = true
  );

-- USER_XP
CREATE POLICY "user_xp_users_insert"
  ON public.user_xp FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "user_xp_users_select"
  ON public.user_xp FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "user_xp_users_update"
  ON public.user_xp FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "user_xp_admin_manage"
  ON public.user_xp FOR ALL
  USING (
    (SELECT is_admin FROM public.users WHERE id = auth.uid()) = true
  );

-- ============================================================================
-- 2. CORRIGER exams - Restreindre aux ADMINS UNIQUEMENT (pas tout auth)
-- ============================================================================

-- Supprimer les permissions trop larges
DROP POLICY IF EXISTS "Authenticated can insert exams" ON public.exams;
DROP POLICY IF EXISTS "Authenticated can update exams" ON public.exams;
DROP POLICY IF EXISTS "Authenticated can delete exams" ON public.exams;

-- Ajouter des policies restrictives (admin only pour write)
CREATE POLICY "exams_admin_insert"
  ON public.exams FOR INSERT
  WITH CHECK (
    (SELECT is_admin FROM public.users WHERE id = auth.uid()) = true
  );

CREATE POLICY "exams_admin_update"
  ON public.exams FOR UPDATE
  USING (
    (SELECT is_admin FROM public.users WHERE id = auth.uid()) = true
  );

CREATE POLICY "exams_admin_delete"
  ON public.exams FOR DELETE
  USING (
    (SELECT is_admin FROM public.users WHERE id = auth.uid()) = true
  );

-- ============================================================================
-- 3. CORRIGER rewards - Permettre système (sans auth.uid())
-- ============================================================================

DROP POLICY IF EXISTS "System inserts rewards" ON public.rewards;

-- Nouvelle policy: système peut insérer (avec WITH CHECK true pour les triggers)
CREATE POLICY "system_insert_rewards"
  ON public.rewards FOR INSERT
  WITH CHECK (true);

-- Ajouter une policy alternative pour les admins
CREATE POLICY "rewards_admin_insert"
  ON public.rewards FOR INSERT
  WITH CHECK (
    (SELECT is_admin FROM public.users WHERE id = auth.uid()) = true
  );

-- ============================================================================
-- 4. CORRIGER leaderboard - Permettre updates système
-- ============================================================================

DROP POLICY IF EXISTS "System updates leaderboard" ON public.leaderboard;

-- Nouvelle policy: système peut updater (avec WITH CHECK true pour les triggers)
CREATE POLICY "system_update_leaderboard"
  ON public.leaderboard FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Garder la policy admin
CREATE POLICY "leaderboard_admin_insert"
  ON public.leaderboard FOR INSERT
  WITH CHECK (
    (SELECT is_admin FROM public.users WHERE id = auth.uid()) = true
  );

-- ============================================================================
-- 5. AJOUTER policies manquantes pour xp_logs
-- ============================================================================

DROP POLICY IF EXISTS "Users insert xp logs" ON public.xp_logs;

-- New restrictive policies
CREATE POLICY "xp_logs_users_insert"
  ON public.xp_logs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "xp_logs_users_select"
  ON public.xp_logs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "xp_logs_admin_manage"
  ON public.xp_logs FOR ALL
  USING (
    (SELECT is_admin FROM public.users WHERE id = auth.uid()) = true
  );

-- ============================================================================
-- 6. AJOUTER policies pour exam_attempts UPDATE/DELETE
-- ============================================================================

CREATE POLICY "exam_attempts_users_update"
  ON public.exam_attempts FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "exam_attempts_admin_manage"
  ON public.exam_attempts FOR ALL
  USING (
    (SELECT is_admin FROM public.users WHERE id = auth.uid()) = true
  );

-- ============================================================================
-- VÉRIFICATION - Exécute cette query après déploiement
-- ============================================================================
/*
SELECT 
  schemaname, 
  tablename, 
  COUNT(*) as policy_count,
  string_agg(policyname, ', ') as policies
FROM pg_policies
WHERE schemaname = 'public'
GROUP BY schemaname, tablename
ORDER BY tablename;

-- Tables qui DOIVENT avoir au moins 3 policies:
-- quiz_questions, quizzes, user_xp, xp_logs, exam_attempts
*/
