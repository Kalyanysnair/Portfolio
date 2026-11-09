# Kalyany S Nair — Personal Developer Portfolio

A modern, high-performance, recruiter-ready developer portfolio website showcasing software development, full-stack web applications, databases, software testing, and emerging AI solutions.

- **Headline:** Technology Enthusiast | Software Developer | Integrated MCA Student
- **Supporting Statement:** Building practical technology solutions through software development, modern web technologies, databases, and emerging AI applications.
- **Live URL:** [https://kalyanysnair.github.io/Portfolio/](https://kalyanysnair.github.io/Portfolio/)
- **Repository:** [https://github.com/Kalyanysnair/Portfolio](https://github.com/Kalyanysnair/Portfolio)

---

## 🛠️ Tech Stack

- **HTML5:** Semantic markup, accessible ARIA attributes, and Open Graph metadata.
- **CSS3:** Custom design system with CSS custom properties (variables), modern responsive grid & flexbox, and fluid typography.
- **JavaScript (ES6+):** Pure vanilla JavaScript without external framework overhead for optimal speed and zero build-step requirement.
- **FontAwesome 6.5.1:** High-quality developer and brand icons.
- **Google Fonts:** Outfit (Headings), Inter (Body), and JetBrains Mono (Code & Technical tags).

---

## 📁 Project Structure

```text
Portfolio/
├── assets/
│   ├── hero-bg.png                     # Celestial orbital visual graphic asset
│   ├── projects/
│   │   ├── retailsphere.png            # Verified RetailSphere AI interface screenshot
│   │   └── arcade.png                  # Verified Arcade E-Learning platform artwork
│   └── resume/
│       └── Kalyany_S_Nair_Resume.pdf   # Verified up-to-date resume PDF
├── index.html                          # Primary homepage entrypoint
├── index.css                           # Core design system & responsive styling
├── index.js                            # Interactive logic, theme toggle, cert filters & form handling
├── kalyanysnair.html                   # Synchronized mirror page
└── README.md                           # Documentation & configuration guide
```

---

## 🌟 Key Highlights & Design Innovations

1. **Distinctive & Personal Landing Page Architecture:**
   - Moves away from generic AI-generated split-screen templates and floating code editor cards.
   - Re-imagines the portfolio's original planetary identity with an **orbital celestial stage**: an animated aperture framing `assets/hero-bg.png` surrounded by rotating technical coordinate rings, live telemetry indicators, and orbiting competency nodes (`TypeScript`, `FastAPI`, `PostgreSQL`, `Spring Boot`).
   - Features a real-time availability status pill (`Open to IT & Tech Roles 2026/27`), engineering coordinate tags, and a direct-connect email action with instant clipboard feedback.

2. **Broad & Versatile Professional Positioning:**
   - Structured for diverse technology opportunities across the IT industry: Software Development, Full-Stack Development, Frontend & Backend Development, Application Development, Database Engineering, Software Testing & QA, AI-integrated systems, and Graduate Engineer Trainee roles.
   - Headline: *"Technology Enthusiast | Software Developer | Integrated MCA Student"*.
   - Statement: *"Building practical technology solutions through software development, modern web technologies, databases, and emerging AI applications."*
   - Avoids pigeonholing into a single job title or niche, while demonstrating concrete mastery across core CS disciplines.

3. **5 Editorial Featured Projects:**
   - **RetailSphere AI (Flagship Showcase):** Intelligent furniture retail and custom manufacturing platform featuring real UI screenshots, Vercel deployment badge, FastAPI backend, PostgreSQL, and LLM/RAG integration.
   - **Arcade:** Next.js and Spring Boot e-learning platform in active development, featuring verified game/course artwork and dual-architecture tags.
   - **PlayTown:** Full-stack toy e-commerce application deployed on AWS EC2 with PHP, MySQL, product catalog, cart mechanics, and role-based access.
   - **SwiftAid:** Web-based emergency and scheduled ambulance dispatch platform deployed on AWS EC2 with GPS tracking and automated hospital alerting.
   - **Luminah (Fashion Magazine CMS):** Dynamic digital magazine portal engineered with WordPress and Elementor CMS, user/admin roles, structured content taxonomy, and responsive reading layouts (no fabricated repository).

4. **Curated & Interactive Certifications Showcase:**
   - Curated from an inventory of 57 credentials down to **38 high-value technical certifications**, excluding personal documents, redundant certificates, and college IDs.
   - Grouped into 5 interactive filter categories:
     - **Cloud Computing & AWS** (15 credentials: AWS Cloud Practitioner, S3, EC2, IAM, VPC, CloudFront, CompTIA Cloud+, etc.)
     - **Programming & Web Development** (6 credentials: Java Programming, PHP & MySQL, REST APIs, JavaScript, Full-Stack foundations)
     - **Databases & Software Development** (7 credentials: MySQL RDBMS, Google Linux & SQL, Agile methodologies, Version Control, etc.)
     - **Cybersecurity & Networking** (7 credentials: Cisco CyberOps, Network Defense, Ethical Hacking, Network Addressing, etc.)
     - **AI & Emerging Technologies** (3 credentials: Oracle Cloud Infrastructure 2025 AI Foundations, GenAI Concepts, etc.)
   - Instant client-side category filtering with live badge counts and issuer recognition (AWS, Oracle, Cisco, Google, Infosys, Coursera).

5. **Verified Achievements & Activities:**
   - **Smart India Hackathon 2025 — Institution Level Winner:** Verified directly from certificate register and official award documentation (accurately represented as institutional winner).
   - **I2U (Idea to Utility) Funded Project Holder — Phase 2:** College-funded innovation grant recipient.
   - **Patent Application in Preparation:** Self-Cleaning Washbasin for Public Use.
   - **NASA Space Apps Challenge:** Local lead volunteer and participant (2024 & 2025).
   - **Intellectual Property Rights (IPR) Cell:** Active departmental volunteer and representative.

6. **Theme & Contact Systems:**
   - Dark theme as the refined primary default (`#090d16`) with seamless light-mode toggle.
   - Primary verified email: `kalyanysnair.in@gmail.com` integrated into one-click copy buttons, header pills, and direct mailto handlers.
   - Robust contact form with live input validation and optional EmailJS integration.

---

## 📧 Contact Form & Email Setup

### Current Behavior:
The contact form includes client-side validation. By default, when a visitor clicks **Send Message**, it triggers a pre-filled `mailto:` client addressed to `kalyanysnair.in@gmail.com` with the visitor's name, email, subject, and message populated automatically. This guarantees zero lost inquiries and complete confidentiality without external backend dependencies.

### Optional Automated Sending via EmailJS:
If you would like the form to send emails directly in the background without opening the visitor's email client:

1. Create a free account at [EmailJS](https://www.emailjs.com/).
2. Add an **Email Service** (e.g. Gmail) and note your `Service ID`.
3. Create an **Email Template** and note your `Template ID`.
4. Get your `Public Key` from **Account > API Keys**.
5. Open `index.js` and enter your credentials in the configuration object at the top:
   ```javascript
   const EMAILJS_CONFIG = {
     SERVICE_ID: "YOUR_SERVICE_ID",
     TEMPLATE_ID: "YOUR_TEMPLATE_ID",
     PUBLIC_KEY: "YOUR_PUBLIC_KEY",
   };
   ```
6. Add the EmailJS SDK script to the `<head>` of `index.html`:
   ```html
   <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
   ```

---

## 📄 Updating Your Resume

The resume download buttons link directly to:
```text
assets/resume/Kalyany_S_Nair_Resume.pdf
```
Whenever you have an updated version of your resume:
1. Export your latest resume as a PDF.
2. Rename the file to `Kalyany_S_Nair_Resume.pdf`.
3. Replace the existing file inside `assets/resume/`.

---

## 🚀 Local Development

To preview the portfolio locally, you can open `index.html` directly in your browser or run any local HTTP server:

Using Python:
```bash
python -m http.server 8000
```
Then navigate to `http://localhost:8000`.

---

## 👤 Author

**Kalyany S Nair**
- **Email:** [kalyanysnair.in@gmail.com](mailto:kalyanysnair.in@gmail.com)
- **LinkedIn:** [https://linkedin.com/in/kalyanysnair](https://linkedin.com/in/kalyanysnair)
- **GitHub:** [https://github.com/Kalyanysnair](https://github.com/Kalyanysnair)
- **Phone:** +91 9778237180
- **Location:** Kottayam, Kerala, India
