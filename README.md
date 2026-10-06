# Page 26 — Cheesecakes & Bakes (Online Menu & WhatsApp Ordering)

A modern, mobile-first responsive web application for **Page 26**, allowing customers to browse artisanal eggless cheesecakes, cakes, brownies, muffins, and cupcakes, and place pre-orders directly via **WhatsApp** or **Phone Call**.

---

## ✨ Features

- 🍰 **Accurate Menu Mapping**: All categories, flavours, weights (500g, 1kg, 1.5kg, 2kg, Bento) and box sizes (Box of 4 & 6) from the original menu card.
- 📱 **1-Click WhatsApp Ordering**: Automatically compiles customer's selected items, sizes, quantities, total price, delivery date, Bengaluru address, and custom cake messages into a formatted WhatsApp message to `+91 8780547928`.
- 📞 **Direct Call Button**: Direct click-to-call link for quick inquiries.
- ⏳ **1-Week Notice Enforcement**: Date picker automatically defaults to a minimum of 7 days in advance according to the bakery's pre-order policy.
- 🟢 **Eggless & Couverture Chocolate Badges**: Highlights dietary guidelines and premium ingredient notes.
- 🔍 **Live Search & Category Filters**: Instant filtering across Cheesecakes, Cakes, Brownies, Muffins, and Cupcakes.
- 📜 **Original Menu Card Viewer**: Customers can open and view/download the original menu card image directly from the site.
- ⚡ **Zero-Dependency & Zero Cold Starts**: Pure static web application that loads instantly and can be hosted 100% free forever on Vercel.

---

## 📂 Project Structure

```text
page-26-menu/
├── index.html         # Main web page structure & layout
├── style.css          # Artisanal bakery styling & responsive design
├── app.js             # Cart, search, filtering & WhatsApp integration logic
├── menu-data.js       # Menu database (easy to edit prices & flavours!)
├── menu.png           # Original menu card image
├── vercel.json        # Vercel deployment configuration
├── package.json       # Metadata & local scripts
└── README.md          # Documentation & deployment guide
```

---

## 🚀 How to Run Locally

1. Open PowerShell or Terminal.
2. Navigate to the project folder:
   ```powershell
   cd D:\Projects\page-26-menu
   ```
3. Run with any local server (or simply double-click `index.html` to open in any web browser!):
   ```powershell
   npx serve .
   ```
4. Open the displayed URL (typically `http://localhost:3000`).

---

## 🌐 How to Deploy to Vercel for Free

### Method 1: Via GitHub (Recommended — Auto-updates whenever you push)

1. Initialize git and commit:
   ```powershell
   cd D:\Projects\page-26-menu
   git init
   git add .
   git commit -m "Initial commit of Page 26 menu app"
   ```
2. Create a new repository on [GitHub](https://github.com/new) named `page-26-menu`.
3. Push your code to GitHub:
   ```powershell
   git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/page-26-menu.git
   git branch -M main
   git push -u origin main
   ```
4. Go to [Vercel](https://vercel.com) and log in with your GitHub account.
5. Click **"Add New..."** > **"Project"**.
6. Select your `page-26-menu` repository.
7. Click **Deploy**. In under 15 seconds, Vercel gives you a free live URL (e.g. `https://page-26-menu.vercel.app`) with free SSL!

### Method 2: Via Vercel CLI

1. Run:
   ```powershell
   cd D:\Projects\page-26-menu
   npx vercel
   ```
2. Follow the on-screen prompts to log in and confirm deployment.
3. For production release, run:
   ```powershell
   npx vercel --prod
   ```

---

## ✏️ How to Update Prices or Flavours in the Future

Open `menu-data.js` in any text editor. All items and prices are neatly organized. Modify the price numbers or add new flavours, save, and commit!
