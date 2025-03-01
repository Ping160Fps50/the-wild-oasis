import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://igzkjagahapwbitxlxqt.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlnemtqYWdhaGFwd2JpdHhseHF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg0MjQxNDcsImV4cCI6MjA1NDAwMDE0N30.aU5VUQMhnKyYmL8oMWEYga-vpSd9fZLhom5UwjNDfao";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
