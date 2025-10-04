# E-Commerce Web App

A modern e-commerce web application built with Next.js, React, Redux, and Material-UI. Features include browsing products, managing a cart, favourites, undo actions, and smooth animations with Framer Motion. Fully responsive with synchronized state across Home, Cart, and Favourites pages.



## Features

- Browse products with detailed view
- Add/remove items to/from Cart
- Favourite products with synced state
- Undo actions for cart and favourites
- Responsive design for all screen sizes
- Smooth animations using Framer Motion



### Tech Stack

- **Frontend:** Next.js 15, React 18
- **State Management:** Redux (cart and favourites)
- **UI Library:** Material-UI (MUI)
- **Animations:** Framer Motion
- **Data Fetching:** React Query
- **API:** Mock API / JSON server
- **Styling:** CSS-in-JS with MUI `sx` prop



#### Architecture

- **Pages:**
  - `Home`: Browse products, add to cart/favourites.
  - `Cart`: View products in the cart, adjust quantity, remove, undo actions.
  - `Favourites`: View favourite products, remove, add to cart, undo actions.
- **Components:** Reusable UI components for product cards, dialogs, buttons.
- **Hooks:**
  - `useCart`: Manage cart state.
  - `useFavourites`: Manage favourites state.
- **Redux:** Centralized store for cart and favourites to sync state across pages.

---

##### Installation & Setup

1. clone the repo:
   git clone https://github.com/sadem11/ecommerce-app.git
   cd ecommerce-app

2. Install dependencies:
npm install 
or
 yarn install

3. Start the development server:
npm run dev
 or
yarn dev

4. stsrt server: npm run json-server 

5.  Open http://localhost:3000 in your browser

###### Folder Structure 
src/
├─ app/  
├    ├─[locale]  
├             ├─[id]   
├             ├    ├─page.tsx
├             ├─cart
├             ├   ├─page.tsx
├             ├─favourite
├                   ├─page.tsx
├
├─ domain/           Models 
├─ hooks/            Custom hooks (useCart, useFavourites)
├─ infrastructure/   API functions
├─ store/            Redux slices
└─ presentation/  atoms, molecules , ans organisms
└─ providers
└─ services
└─ slices
└─ theme