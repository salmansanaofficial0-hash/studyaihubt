const SUPABASE_URL = "https://wcqwtuuzxheylcvkubsa.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndjcXd0dXV6eGhleWxjdmt1YnNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk0MTU5MTcsImV4cCI6MjA5NDk5MTkxN30.5VA6Tv5CrzockpuzqirJ8hixrTHV61vkhasQIMaatIY";

async function query(table, method = "GET", body = null) {
  const opts = {
    method,
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
    },
  };
  if (body) {
    opts.body = JSON.stringify(body);
    opts.headers["Prefer"] = "return=representation";
  }
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, opts);
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`);
  return res.json();
}

async function run() {
  const categories = await query("categories?select=*");
  console.log(JSON.stringify(categories, null, 2));
}
run().catch(console.error);
