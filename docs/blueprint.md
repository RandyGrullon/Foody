# **App Name**: IKEA Eats

## Core Features:

- Menu Management: Enable CRUD operations for menu categories (Breakfast/Lunch/Dinner), items, prices, and availability by store or shift. This is managed through a back-end admin interface.
- Persistent Shopping Cart: Maintain a persistent shopping cart for each user, storing their selected items and quantities. The shopping cart uses Firestore to save and retrieve cart data.
- Checkout Options: Offer two checkout options: Carry Out (immediate payment required) and In-Store Pre-order (unbilled pre-order finalized at the cash register).
- Secure Payment Processing: Integrate Stripe for secure payment processing, including saving card details for quick payments. Utilize Stripe Customers and Payment Methods APIs.
- Order Validation: Upon order creation, generate a unique QR code, barcode, and confirmation code for order validation at the cash register.
- AI-Powered Recommendation Tool: A personalized AI-powered recommendation tool suggests menu items based on past orders and preferences.

## Style Guidelines:

- Primary color: IKEA Yellow (#FFDA63) to evoke the brand's energy and recognition.
- Background color: Light gray (#F0F0F0) to provide a clean, neutral backdrop that highlights the food items.
- Accent color: IKEA Blue (#0058A3) to accent key interactive elements such as buttons and links, reinforcing brand identity while creating visual interest.
- Body and headline font: 'PT Sans', a humanist sans-serif font for a modern and warm user experience.
- Use simple, modern icons to represent menu categories and order actions, ensuring clarity and ease of use.
- Employ a clean, responsive layout optimized for both mobile and desktop, featuring clear sections for menu browsing, cart management, and order checkout.
- Subtle animations and transitions to provide feedback on user interactions (e.g., adding items to the cart) and enhance the overall user experience.