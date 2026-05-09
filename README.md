# RentiGo — Vehicle Rental Management System

Two deliverables in one bundle:

```
rentigo/
├── frontend/    # Static HTML/CSS/JS (deploy anywhere — Vercel static, Netlify, S3)
└── backend/     # Node.js + Express + MongoDB REST API (deploy to Vercel)
```

## Roles & access (real-world auth model)

Authentication uses **JWT** (HTTP `Authorization: Bearer <token>`) signed by the server.
Passwords are hashed with **bcrypt** (cost 12). Role is stored on the `User` document
in MongoDB and verified server-side on every protected request — clients can never
escalate by editing localStorage.

| Page | Who can see it |
|---|---|
| `/index.html`, `/browse.html`, `/vehicle.html`, `/login.html`, `/register.html` | Everyone |
| `/bookings.html` | Any signed-in user |
| `/agency.html` | `role = "agency"` (or `admin`) |
| `/admin.html` | `role = "admin"` only |

Defense-in-depth:
1. **Client guard** (`auth.js → Auth.require(role)`) hides the page and shows a 403 for the wrong role.
2. **Nav menu** is rendered from the JWT-stored role — Agency/Admin links only appear for those users.
3. **Server enforcement** — every `/api/...` write is protected by `requireAuth` + `requireRole(...)` middleware. Even if a malicious user calls the API directly with a forged client, the JWT is verified and the role is re-checked against MongoDB.

## Backend — local dev

```bash
cd backend
cp .env.example .env     # then fill MONGODB_URI + JWT_SECRET
npm install
npm run dev              # http://localhost:4000
```

### REST endpoints

```
POST  /api/auth/register      { name, email, password, role: "customer"|"agency", preferences? }
POST  /api/auth/login         { email, password }            → { token, user }
GET   /api/auth/me                                            (auth)

GET   /api/vehicles?type=&city=&fuel=&maxPrice=
GET   /api/vehicles/:id
POST  /api/vehicles                                           (auth, agency)
GET   /api/vehicles/owner/me                                  (auth, agency)
PATCH /api/vehicles/:id/approve                               (auth, admin)

GET   /api/bookings/availability/:vehicleId?start=&end=
POST  /api/bookings                                           (auth)
GET   /api/bookings/me                                        (auth)
GET   /api/bookings/agency                                    (auth, agency)
PATCH /api/bookings/:id/status                                (auth, agency|admin)
GET   /api/bookings                                           (auth, admin)
```

### Promote a user to admin

There is no public admin signup (by design). Create an admin in Mongo shell:

```js
db.users.updateOne({ email: "you@example.com" }, { $set: { role: "admin" } })
```

## Frontend — local dev

Open `frontend/index.html` directly, or serve it:

```bash
cd frontend
python3 -m http.server 5500
```

By default it calls the API at `http://localhost:4000`. To point at a deployed
backend, add this **before** `data.js` in each HTML file (or in an inline script):

```html
<script>window.RENTIGO_API = "https://your-rentigo-api.vercel.app";</script>
```

## Deploy to Vercel

**Backend** (`backend/`):
```bash
cd backend
vercel --prod
# Add env vars in Vercel dashboard: MONGODB_URI, JWT_SECRET, CORS_ORIGIN
```

**Frontend** (`frontend/`): drag-and-drop the folder into Vercel, or `vercel --prod`
from inside it. Set `window.RENTIGO_API` to your backend URL.

## Security checklist (already implemented)

- ✅ Passwords hashed with bcrypt (cost 12), never returned in API responses
- ✅ JWT signed with server-only `JWT_SECRET`, 7-day expiry
- ✅ Server-side role check on every protected route (`requireRole`)
- ✅ Zod input validation on auth endpoints
- ✅ Rate limit on `/api/auth/*` (30 req / 15 min / IP)
- ✅ CORS configurable via `CORS_ORIGIN`
- ✅ MongoDB connection cached for serverless cold starts
