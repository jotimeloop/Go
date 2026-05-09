// Mock data + shared utilities
const VEHICLES = [
  { id: "v1", name: "Swift VXi", brand: "Maruti", type: "4W", year: 2023, fuel: "Petrol", transmission: "Manual", seats: 5, pricePerDay: 1500, pricePerWeek: 9000, pricePerMonth: 32000, image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&q=80", city: "Bangalore", available: true, rating: 4.6, agency: "DriveEasy" },
  { id: "v2", name: "Creta SX", brand: "Hyundai", type: "4W", year: 2024, fuel: "Diesel", transmission: "Automatic", seats: 5, pricePerDay: 2800, pricePerWeek: 17000, pricePerMonth: 60000, image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80", city: "Mumbai", available: true, rating: 4.8, agency: "UrbanWheels" },
  { id: "v3", name: "Nexon EV", brand: "Tata", type: "4W", year: 2024, fuel: "Electric", transmission: "Automatic", seats: 5, pricePerDay: 2500, pricePerWeek: 15000, pricePerMonth: 54000, image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80", city: "Delhi", available: true, rating: 4.7, agency: "EcoRide" },
  { id: "v4", name: "Activa 6G", brand: "Honda", type: "2W", year: 2023, fuel: "Petrol", transmission: "Automatic", seats: 2, pricePerDay: 350, pricePerWeek: 2000, pricePerMonth: 7000, image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&q=80", city: "Bangalore", available: true, rating: 4.5, agency: "DriveEasy" },
  { id: "v5", name: "Classic 350", brand: "Royal Enfield", type: "2W", year: 2024, fuel: "Petrol", transmission: "Manual", seats: 2, pricePerDay: 900, pricePerWeek: 5500, pricePerMonth: 19000, image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&q=80", city: "Goa", available: true, rating: 4.9, agency: "RoadKing" },
  { id: "v6", name: "Innova Crysta", brand: "Toyota", type: "4W", year: 2023, fuel: "Diesel", transmission: "Manual", seats: 7, pricePerDay: 3500, pricePerWeek: 21000, pricePerMonth: 75000, image: "https://images.unsplash.com/photo-1631295868223-63265b40d9e4?w=800&q=80", city: "Chennai", available: false, rating: 4.7, agency: "UrbanWheels" },
  { id: "v7", name: "Duke 390", brand: "KTM", type: "2W", year: 2024, fuel: "Petrol", transmission: "Manual", seats: 2, pricePerDay: 1200, pricePerWeek: 7000, pricePerMonth: 25000, image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&q=80", city: "Mumbai", available: true, rating: 4.8, agency: "RoadKing" },
  { id: "v8", name: "Model 3", brand: "Tesla", type: "4W", year: 2024, fuel: "Electric", transmission: "Automatic", seats: 5, pricePerDay: 6500, pricePerWeek: 40000, pricePerMonth: 150000, image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&q=80", city: "Delhi", available: true, rating: 4.9, agency: "EcoRide" },
];

const BOOKINGS = [
  { id: "b1", vehicleId: "v1", vehicleName: "Maruti Swift VXi", customer: "Ravi Kumar", startDate: "2026-05-10", endDate: "2026-05-13", duration: "daily", total: 4500, status: "approved" },
  { id: "b2", vehicleId: "v3", vehicleName: "Tata Nexon EV", customer: "Priya Sharma", startDate: "2026-05-08", endDate: "2026-05-15", duration: "weekly", total: 15000, status: "active" },
  { id: "b3", vehicleId: "v5", vehicleName: "Royal Enfield Classic 350", customer: "Arjun Mehta", startDate: "2026-05-12", endDate: "2026-05-14", duration: "daily", total: 1800, status: "pending" },
  { id: "b4", vehicleId: "v2", vehicleName: "Hyundai Creta SX", customer: "Sneha Patel", startDate: "2026-04-20", endDate: "2026-04-25", duration: "daily", total: 14000, status: "completed" },
  { id: "b5", vehicleId: "v7", vehicleName: "KTM Duke 390", customer: "Vikram Singh", startDate: "2026-05-15", endDate: "2026-05-22", duration: "weekly", total: 7000, status: "pending" },
];

const USERS = [
  { id: "u1", name: "Ravi Kumar", email: "ravi@example.com", role: "customer", joined: "2026-01-12" },
  { id: "u2", name: "Priya Sharma", email: "priya@example.com", role: "customer", joined: "2026-02-04" },
  { id: "u3", name: "DriveEasy Inc", email: "ops@driveeasy.in", role: "agency", joined: "2025-11-20" },
  { id: "u4", name: "EcoRide Pvt", email: "hello@ecoride.in", role: "agency", joined: "2025-10-08" },
];

const CITIES = ["Bangalore", "Mumbai", "Delhi", "Chennai", "Goa", "Hyderabad", "Pune"];

// Icons (inline SVG strings)
const ICON = {
  car: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>',
  bike: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18.5" cy="17.5" r="3.5"/><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="15" cy="5" r="1"/><path d="M12 17.5V14l-3-3 4-3 2 3h2"/></svg>',
  fuel: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="22" x2="15" y2="22"/><line x1="4" y1="9" x2="14" y2="9"/><path d="M14 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18"/><path d="M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2a2 2 0 0 0 2-2V9.83a2 2 0 0 0-.59-1.42L18 5"/></svg>',
  cog: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"/><path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/><path d="M12 2v2M12 22v-2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M22 12h-2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>',
  users: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  pin: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 7-8 12-8 12s-8-5-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
  star: '<svg width="12" height="12" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
  cal: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
  shield: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/></svg>',
  zap: '<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z"/></svg>',
  arrow: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>',
  back: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>',
  menu: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>',
  rupee: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h12M6 8h12M6 13l8.5 8M6 13h3a5 5 0 0 0 0-10"/></svg>',
  trend: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>',
  building: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/></svg>',
  alert: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
  check: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
  x: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
  plus: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
  wrench: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',
  search: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
  sliders: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg>',
};

function fmt(n){return "₹" + n.toLocaleString("en-IN")}
function qs(name){return new URLSearchParams(location.search).get(name)}

function toast(msg, type="success"){
  let wrap = document.querySelector(".toast-wrap");
  if(!wrap){wrap = document.createElement("div"); wrap.className="toast-wrap"; document.body.appendChild(wrap)}
  const t = document.createElement("div"); t.className="toast "+type; t.textContent=msg;
  wrap.appendChild(t); setTimeout(()=>t.remove(), 3000);
}

function header(active){
  const items = [["index.html","Home"],["browse.html","Browse"],["bookings.html","My Bookings"],["agency.html","Agency"],["admin.html","Admin"]];
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
      <div class="nav-cta">
        <a href="login.html" class="btn btn-ghost">Sign in</a>
        <a href="browse.html" class="btn btn-primary">Rent now</a>
      </div>
      <button class="menu-toggle btn-ghost" onclick="document.getElementById('mobile-menu').classList.toggle('open')" aria-label="Menu">${ICON.menu}</button>
    </div>
    <div id="mobile-menu" class="mobile-menu">
      ${items.map(([h,l])=>`<a href="${h}">${l}</a>`).join("")}
      <a href="login.html">Sign in</a>
    </div>
  </header>`;
}

function footer(){
  return `
  <footer>
    <div class="container foot-grid">
      <div>
        <div class="brand"><span class="brand-logo">${ICON.car}</span><span>RentiGo</span></div>
        <p style="color:var(--muted);font-size:14px;margin-top:12px">Rent two & four wheelers, by the day, week or month.</p>
      </div>
      <div><h4>Product</h4><ul><li><a href="browse.html">Browse vehicles</a></li><li><a href="bookings.html">My bookings</a></li></ul></div>
      <div><h4>For partners</h4><ul><li><a href="agency.html">Agency dashboard</a></li><li><a href="admin.html">Admin console</a></li></ul></div>
      <div><h4>Company</h4><ul><li>About</li><li>Contact</li><li>Privacy</li></ul></div>
    </div>
    <div class="foot-bottom">© 2026 RentiGo. All rights reserved.</div>
  </footer>`;
}

function vehicleCard(v){
  return `
  <a href="vehicle.html?id=${v.id}" class="vcard">
    <div class="vcard-img">
      <img src="${v.image}" alt="${v.brand} ${v.name}" loading="lazy">
      <div class="vcard-badges">
        <span class="badge">${v.type==='2W'?'2-Wheeler':'4-Wheeler'}</span>
        ${!v.available?'<span class="badge badge-destructive">Unavailable</span>':''}
      </div>
      <div class="vcard-rating">${ICON.star} ${v.rating}</div>
    </div>
    <div class="vcard-body">
      <p class="vcard-brand">${v.brand}</p>
      <h3 class="vcard-name">${v.name}</h3>
      <div class="vcard-meta">
        <span>${ICON.fuel}${v.fuel}</span>
        <span>${ICON.cog}${v.transmission}</span>
        <span>${ICON.users}${v.seats}</span>
        <span>${ICON.pin}${v.city}</span>
      </div>
      <div class="vcard-foot">
        <div><span class="price">${fmt(v.pricePerDay)}</span><small>/day</small></div>
        <span style="font-size:13px;color:var(--primary);font-weight:600">View →</span>
      </div>
    </div>
  </a>`;
}

function mountLayout(activePage, mainHTML){
  document.body.innerHTML = header(activePage) + `<main>${mainHTML}</main>` + footer();
}
