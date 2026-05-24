# Menu Editing Guide — Maa Harsiddhi Darbar Foods

## 🍽 How to update your menu

All menu items live in **one file**: `menu.json` (right here in this folder).

Every dish has 5 fields:

```json
{
  "id": "c1",
  "name": "Chilli Paneer",
  "price": 249,
  "category": "Chinese",
  "image": "https://..."
}
```

| Field | What it means | Rules |
|-------|--------------|-------|
| `id` | Unique code for the dish | Don't change for existing items. Use a fresh code like `"new1"` for new dishes |
| `name` | Dish name shown on website | Any text |
| `price` | Price in ₹ | Whole numbers only (e.g. `249`, not `249.00`) |
| `category` | Section it appears under | Must match one of the existing categories exactly |
| `image` | Direct image URL | Must start with `https://` |

## ✏️ Common edits

### 1. Change a price
Find the dish in `menu.json` and update the `price` value.
```json
{ "id": "c1", "name": "Chilli Paneer", "price": 259, ... }
```

### 2. Change a dish image
Upload a new image, copy its public URL, paste it in the `image` field.
```json
{ "id": "c1", ..., "image": "https://your-new-image-url.jpg" }
```

### 3. Add a new dish
Add a new entry inside the `[ ... ]` array. Use a unique `id`:
```json
{
  "id": "new1",
  "name": "Paneer Lazeez",
  "price": 279,
  "category": "Main Course",
  "image": "https://..."
}
```
Remember a comma `,` after the previous item.

### 4. Remove a dish
Delete its `{ ... }` block (including the trailing comma).

### 5. Reorder dishes within a category
Just move the `{ ... }` block up or down. The website shows items in the order they appear in this file.

## 📂 Categories currently in use

The order below is also the order tabs appear on the website:

1. Chinese
2. Main Course
3. Breads
4. Curd
5. Green Vegetable
6. Tandoor Starter
7. Dal
8. Salad
9. Rice
10. Dessert
11. Combo
12. Thali

To add a new category, just give a dish that new category name — it will automatically appear as a new tab.

## ⚠️ After editing

1. **Save** the file.
2. The website auto-reloads — no need to restart anything.
3. Open the site and verify the change.

## 🆘 If the site breaks after an edit

The most common cause is a **missing comma** or an **extra comma** in the JSON file.
Paste the file content into https://jsonlint.com to spot the error, then fix and save.
