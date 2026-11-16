CREATE TABLE public.poll_votes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  poll_id text NOT NULL DEFAULT 'reduce-unemployment',
  option_key text NOT NULL CHECK (option_key IN ('small_business', 'vocational', 'youth', 'industries')),
  voter_id uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (poll_id, voter_id)
);

GRANT INSERT ON public.poll_votes TO anon, authenticated;
GRANT ALL ON public.poll_votes TO service_role;

ALTER TABLE public.poll_votes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can cast a vote"
  ON public.poll_votes FOR INSERT TO anon, authenticated
  WITH CHECK (poll_id = 'reduce-unemployment');

CREATE OR REPLACE FUNCTION public.get_poll_results(p_poll_id text)
RETURNS TABLE (option_key text, votes bigint)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT v.option_key, count(*)::bigint AS votes
  FROM public.poll_votes v
  WHERE v.poll_id = p_poll_id
  GROUP BY v.option_key;
$$;

REVOKE ALL ON FUNCTION public.get_poll_results(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_poll_results(text) TO anon, authenticated;