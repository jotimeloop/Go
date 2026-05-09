// Auth client: talks to Express backend, stores JWT, handles role gating
const API_BASE = (window.RENTIGO_API || "http://localhost:4000") + "/api";

const Auth = {
  token: () => localStorage.getItem("rentigo_token"),
  user:  () => { try { return JSON.parse(localStorage.getItem("rentigo_user")||"null"); } catch { return null; } },
  isAuthed: () => !!Auth.token(),
  role: () => (Auth.user()||{}).role || null,
  save(token, user){ localStorage.setItem("rentigo_token",token); localStorage.setItem("rentigo_user",JSON.stringify(user)); },
  logout(){ localStorage.removeItem("rentigo_token"); localStorage.removeItem("rentigo_user"); location.href="index.html"; },

  async api(path, { method="GET", body, auth=false } = {}){
    const headers = { "Content-Type": "application/json" };
    if (auth && Auth.token()) headers["Authorization"] = "Bearer " + Auth.token();
    const res = await fetch(API_BASE + path, { method, headers, body: body?JSON.stringify(body):undefined });
    let data = null; try { data = await res.json(); } catch {}
    if (!res.ok) throw new Error((data && data.error) || res.statusText);
    return data;
  },

  // Guard a page: redirect if not signed in or wrong role
  require(role){
    if (!Auth.isAuthed()){
      sessionStorage.setItem("rentigo_redirect", location.pathname + location.search);
      location.replace("login.html");
      return false;
    }
    if (role && Auth.role() !== role){
      sessionStorage.setItem("rentigo_flash", `Access restricted — the ${role} area requires a ${role} account. You are signed in as ${Auth.role()}.`);
      location.replace("index.html");
      return false;
    }
    return true;
  },
};

// Role-aware header replacement (overrides the default in data.js)
function header(active){
  const u = Auth.user();
  const role = u?.role;
  const base = [["index.html","Home"],["browse.html","Browse"]];
  const customer = [["bookings.html","My Bookings"]];
  const agency = [["agency.html","Agency"]];
  const admin = [["admin.html","Admin"]];
  let items = base.slice();
  if (role === "customer") items = items.concat(customer);
  if (role === "agency")   items = items.concat(agency);
  if (role === "admin")    items = items.concat(admin, agency, customer);
  const cta = u
    ? `<span class="nav-user">Hi, ${u.name.split(" ")[0]} <small style="color:var(--muted)">(${role})</small></span>
       <button class="btn btn-ghost" onclick="Auth.logout()">Sign out</button>`
    : `<a href="login.html" class="btn btn-ghost">Sign in</a>
       <a href="register.html" class="btn btn-primary">Create account</a>`;
  return `
  <header class="site">
    <div class="container nav">
      <a href="index.html" class="brand">
        <span class="brand-logo">${ICON.car}</span>
        <span>RentiGo</span>
      </a>
      <nav class="nav-links">
        ${items.map(([h,l])=>`<a href="${h}" class="${active===h?'active':''}">${l}</a>`).join("")}
      </nav>
      <div class="nav-cta">${cta}</div>
      <button class="menu-toggle btn-ghost" onclick="document.getElementById('mobile-menu').classList.toggle('open')" aria-label="Menu">${ICON.menu}</button>
    </div>
    <div id="mobile-menu" class="mobile-menu">
      ${items.map(([h,l])=>`<a href="${h}">${l}</a>`).join("")}
      ${u ? `<a href="#" onclick="Auth.logout();return false">Sign out (${role})</a>` : `<a href="login.html">Sign in</a><a href="register.html">Create account</a>`}
    </div>
  </header>`;
}

// Show flash message after a guard redirect
window.addEventListener("DOMContentLoaded", () => {
  const f = sessionStorage.getItem("rentigo_flash");
  if (f) { sessionStorage.removeItem("rentigo_flash"); setTimeout(()=>toast(f, "error"), 50); }
});
