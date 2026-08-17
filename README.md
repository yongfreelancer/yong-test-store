# Lookbook Project — Beginner's Guide

## 📑 Table of Contents

- [What is This Project?](#what-is-this-project)
- [Project Structure](#project-structure)
- [Key Files Explained](#key-files-explained-for-beginners)
- [How Does It Work?](#how-does-it-work-step-by-step)
- [Getting Started](#getting-started)
- [Creating Lookbooks](#creating-lookbooks-adding-content)
- [Making Changes](#making-changes)
- [Understanding Components](#understanding-the-component-hierarchy)
- [Performance Optimizations](#performance-optimizations)
- [Image Grid Layout](#image-grid-layout)
- [Troubleshooting](#troubleshooting)
- [Customization Tips](#customization-tips)
- [Useful Shopify Terms](#useful-shopify-terms)
- [Need Help?](#need-help)
- [Summary](#summary)

---

## What is This Project?

This is a **Shopify store theme** with a special **Lookbook feature**. A lookbook is like an interactive catalog where customers can browse product photos arranged in an editorial grid, then click to see products and prices.

---

## Project Structure

```
yong-test-store/
├── src/
│   └── lookbook/
│       ├── index.jsx          ← Entry point (where React starts)
│       ├── lookbook.jsx        ← Main React component (the actual display)
│       ├── queries.js          ← Shopify API questions (GraphQL)
│       ├── storefront-client.js ← Handles API communication
│       └── style.css           ← Styling (how things look)
├── sections/
│   ├── lookbook-home.liquid    ← Home page lookbook section
│   └── lookbook-product.liquid ← Product page lookbook section
├── assets/
│   ├── lookbook-bundle.js      ← Generated compiled React code
│   └── lookbook-bundle.css     ← Generated compiled styles
├── config/
│   └── settings_data.json      ← Theme settings & API token
├── .gitignore                  ← Files to not upload to GitHub
├── package.json                ← Project dependencies
└── README.md                   ← This file!
```

---

## Key Files Explained (For Beginners)

### 1. **src/lookbook/index.jsx** — The Starting Point
This is where React "wakes up" and starts running. It:
- Finds all the lookbook sections on the page
- Gets the configuration data from Shopify settings
- Starts the React app by rendering the `Lookbook` component

**Simple analogy:** Like turning on a light switch — this file flips the switch.

### 2. **src/lookbook/lookbook.jsx** — The Main Component
This is the **brain** of the lookbook. It:
- Loads lookbook data from Shopify
- Displays the product images in a grid
- Handles carousel navigation (next/previous buttons)
- Shows product titles and prices
- Displays loading animations while fetching data

**Simple analogy:** Like a recipe — it tells React what to display and how to behave.

### 3. **src/lookbook/queries.js** — Asking Shopify for Data
This file contains the "questions" we ask Shopify's API:
- "Give me the lookbook with handle XYZ"
- "Give me product details for these product handles"

**Simple analogy:** Like a shopping list — what do we need to ask for?

### 4. **src/lookbook/storefront-client.js** — Communication Handler
This file handles talking to Shopify:
- Sends the questions to Shopify
- Waits for answers
- Returns the data to use

**Simple analogy:** Like a translator — it speaks Shopify's API language.

### 5. **src/lookbook/style.css** — Styling
This is standard CSS that makes things look pretty:
- Layout (grid, positioning)
- Colors and fonts
- Animations (like the spinning loader)

---

## How Does It Work? (Step by Step)

1. **Page loads** → `index.jsx` runs and finds all lookbook sections
2. **Configuration** → Gets settings from Shopify (API token, store domain, etc.)
3. **React starts** → Creates the `Lookbook` component
4. **Load data** → Uses `queries.js` to ask Shopify for lookbook info
5. **Display** → `lookbook.jsx` renders the product grid and navigation
6. **User interacts** → Clicks arrows or pagination dots → React updates the view
7. **User sees products** → Photos change, prices display

---

## Getting Started

### Prerequisites
- **Node.js** installed (download from nodejs.org)
- **npm** (comes with Node.js)
- Access to your Shopify store admin

### Setup

1. **Open terminal** and go to the project folder:
   ```bash
   cd /Users/sherlygracevillalon/Documents/GitHub/yong-test-store
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Build the project:**
   ```bash
   npm run build
   ```
   This combines all the React code into `assets/lookbook-bundle.js`

### That's it! 🎉

The code is now ready to use in your Shopify theme.

---

## Creating Lookbooks (Adding Content)

Once the code is set up, you need to create the **lookbook content** in Shopify. A lookbook is stored as a **metaobject** — think of it like a custom form where you enter lookbook information.

### Step-by-Step: Create a New Lookbook

1. **Log in to your Shopify Admin**
   - Go to `https://admin.shopify.com` and log in with your store credentials

2. **Navigate to Metaobjects**
   - In the admin sidebar, go to **Settings** → **Metaobjects**
   - Look for **Lookbook** in the list (should already be created)
   - Click on **Lookbook**

3. **Create a New Lookbook Entry**
   - Click the **Add lookbook** button (usually top right)
   - Fill in the following fields:

#### Field 1: **Handle** (Required)
- This is a unique identifier for your lookbook
- Use lowercase letters, numbers, and hyphens only
- Example: `summer-collection`, `winter-sale`, `best-sellers`
- This is what the code uses to find and display your lookbook

#### Field 2: **Title** (Required)
- The name of your lookbook that displays on the page
- Example: `Summer 2024 Collection`
- This appears as the heading on the lookbook section

#### Field 3: **Description** (Optional)
- A short description or tagline
- Example: `Discover our latest summer pieces`
- This appears below the title

#### Field 4: **Products** (Required)
- A list of product handles to display in this lookbook
- **Format:** Enter product handles separated by commas
- Example: `tee-shirt, summer-dress, beach-bag, sunglasses`

**How to find product handles:**
1. Go to **Products** in your Shopify admin
2. Click on a product
3. Look at the URL: `https://admin.shopify.com/admin/products/12345678`
4. Or scroll to the **Product organization** section and find the "Handle" field
5. The handle is usually the product name in lowercase with hyphens

Example product handles:
```
classic-white-tee
vintage-leather-jacket
summer-beach-dress
```

4. **Save the Lookbook**
   - Click **Save** when you're done
   - It's now live and will appear on your store!

---

### Example Lookbook Setup

Let's say you want to create a lookbook called "Summer Vibes":

| Field | Example Value |
|-------|---|
| **Handle** | `summer-vibes` |
| **Title** | `Summer Vibes Collection` |
| **Description** | `Fresh looks for the sunny season` |
| **Products** | `linen-shirt, straw-hat, sunglasses, beach-bag, linen-shorts` |

After saving, this lookbook will:
- Show on your store using the title "Summer Vibes Collection"
- Display all 5 products in a carousel with product photos
- Let customers click through each product to see details

---

### Adding Multiple Lookbooks

You can create as many lookbooks as you want! Each one appears as a separate section:

- Create a lookbook for each collection
- Create seasonal lookbooks (Summer, Fall, Winter, Spring)
- Create themed lookbooks (Office, Casual, Formal, Weekend)

**Example:**
```
Lookbook 1: spring-collection
Lookbook 2: summer-sale
Lookbook 3: trending-now
Lookbook 4: gift-guide
```

Each one is independent and can have different products and descriptions.

---

### Troubleshooting Metaobjects

| Issue | Solution |
|-------|----------|
| **Lookbook doesn't show** | Check the handle matches what's in the Shopify section settings |
| **Wrong products appear** | Verify the product handles are spelled correctly (no spaces) |
| **Handle has spaces** | Handles must be lowercase with hyphens, not spaces (e.g., `my-lookbook` not `my lookbook`) |
| **Can't find product handle** | Go to Products → click the product → scroll to see the handle field |

---

## Making Changes

### If you want to change the **display** (HTML/JSX):
Edit: `src/lookbook/lookbook.jsx`

Example: To add a new text element:
```jsx
<p>New text here!</p>
```

### If you want to change the **styling** (how it looks):
Edit: `src/lookbook/style.css`

Example: To change the title color:
```css
.lookbook__title {
  color: red;
}
```

### If you want to change what **data** we get from Shopify:
Edit: `src/lookbook/queries.js`

### After any change:
1. Run `npm run build`
2. Check the output for errors
3. Upload the theme to Shopify
4. Test in your store

---

## Understanding the Component Hierarchy

Think of React components like building blocks:

```
Lookbook (main component)
├── LookbookSection (for each lookbook)
│   ├── Carousel
│   │   ├── Slides
│   │   │   └── LookbookProduct (each product)
│   │   │       ├── Images
│   │   │       └── Product Info
│   │   ├── Navigation Arrows
│   │   └── Pagination Dots
│   └── Header (title & description)
```

Each component is like a LEGO block. The big component is made of smaller components stacked together.

---

## Performance Optimizations

We've added several optimizations to make things faster:

1. **Lazy Loading Images** — Images only load when you scroll to them
2. **Responsive Images** — Different image sizes for different screen sizes
3. **Async Decoding** — Images load without blocking other tasks
4. **Low Priority Fetching** — Images don't slow down important stuff

**You don't need to do anything** — these are built in!

---

## Image Grid Layout

The lookbook displays products in a 6-column grid, with different image arrangements:

```
Image 1: 2 rows × 2 cols (big)
Image 2: 1 row × 1 col
Image 3: 1 row × 1 col
Image 4: 1 row × 1 col
Image 5: 1 row × 1 col
Image 6: 1 row × 1 col
(then repeat)
```

This creates a varied, editorial layout. Edit `src/lookbook/style.css` to change grid positions.

---

## Troubleshooting

### Issue: `npm run build` fails
**Solution:** Check for syntax errors in `.jsx` or `.js` files. Look for missing brackets or quotes.

### Issue: Lookbook doesn't show on the page
**Solution:** 
1. Make sure the Shopify section is added to the page
2. Check the API token is correct in Shopify settings
3. Make sure product handles are correct in the lookbook settings

### Issue: "React is not defined" error
**Solution:** Make sure `import React from "react"` is at the top of `.jsx` files.

### Issue: Images don't load
**Solution:** Check the Storefront API token has access to product images. Or check the image URLs in the API response.

---

## Customization Tips

### Change the number of columns in the grid:
Edit `src/lookbook/style.css` and modify the grid properties.

### Change carousel transition speed:
Edit `src/lookbook/style.css` and adjust animation timing.

### Change product text formatting:
Edit the theme customizer in Shopify Admin → theme settings (no coding needed!)

### Add new data from products:
1. Add fields to the GraphQL query in `src/lookbook/queries.js`
2. Access them in `src/lookbook/lookbook.jsx` as `product.fieldName`

---

## Useful Shopify Terms

| Term | Meaning |
|------|---------|
| **Metaobject** | Custom data in Shopify (our lookbook info) |
| **Storefront API** | Shopify's way to send product data |
| **GraphQL** | Language to ask for data from APIs |
| **Liquid** | Shopify's template language |
| **Schema** | Settings you can change in the theme customizer |

---

## Need Help?

- **Shopify Docs:** https://shopify.dev
- **React Docs:** https://react.dev
- **GraphQL Docs:** https://graphql.org

---

## Summary

You have a Shopify theme with a React-powered lookbook. React handles the interactivity, CSS makes it pretty, and the API talks to Shopify. Build with `npm run build`, test, and upload to Shopify!

Happy coding! 🚀
