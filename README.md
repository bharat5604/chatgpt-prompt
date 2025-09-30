# Vite + React Project

> **Node requirement:** This project requires **Node 20.9** or **Node 22.x.x** installed on your machine.

---

## Overview

A Vite + React starter with the following features:

- Reusable components built using **CVA (class-variance-authority)**.
- UI library: **Ant Design (Antd)**. Antd's `ConfigProvider` is used for direction (RTL/LTR) and language support.
- State management: **Redux Toolkit** for global state; **RTK Query** for loading local translation files.
- Form handling and validation: **React Hook Form** + **Zod** for schema validation.
- Integration with **OpenAI (GPT)** for text completion using the Chat Completions endpoint (`https://api.openai.com/v1/chat/completions`).

> ⚠️ **Important security note:** This project currently calls the OpenAI API from the **client (frontend)** using an environment variable `VITE_OPEN_AI`. **This exposes your secret key** to users and is highly insecure for production. The correct approach is to call OpenAI from a secure backend endpoint. The current client-side usage is only for the demo purposes.

---

## Quickstart

1. Clone the repo:

```bash
git clone <repo-url>
cd <repo-folder>
```

2. Install dependencies:

```bash
npm install
```

3. Create environment variables

Create a `.env` file in the project root (do **not** commit this file):

```
VITE_OPEN_AI=sk-...your_openai_key_here...
```

4. Run the dev server:

```bash
npm run dev
```

Open `http://localhost:5173` (or address shown in terminal).

5. Build & preview:

```bash
npm run build
npm run preview
```

---

## Key Implementation Notes

### CVA (class-variance-authority)

Used to create small, composition-friendly, and strongly-typed component variants (buttons, inputs, shell, etc.) so that UI components remain consistent and customizable.

### Ant Design + ConfigProvider

Antd's `ConfigProvider` is used to control locale and `direction` (to switch between `ltr` and `rtl`) globally. Example:

```tsx
<ConfigProvider locale={currentLocale} direction={direction}>
  <RouterProvider router={routes} />
</ConfigProvider>
```

### Redux Toolkit + RTK Query

- Redux Toolkit is used for global state ( UI settings such as `direction`, language, Steps).
- RTK Query is used to fetch local translation JSON files (keeps translation files cached and typed).

### Zod + React Hook Form

All forms use React Hook Form for performance and UX, and Zod for schema validation via the `zodResolver`.

### OpenAI GPT Integration (client-side)

This project uses the Chat Completions endpoint for text completion. Example client-side call (highly discouraged for production):

```ts
// src/components/forms/SituationDescription.tsx
async function sendMessage(textarea: string) {
  setLoading(true);
  try {
    const res = await fetch(import.meta.env.VITE_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_OPEN_AI}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: textarea }],
      }),
    });

    const data = await res.json();
    setOpen(true);
    setReply(data.choices?.[0]?.message?.content ?? "No reply");
  } catch (err: any) {
    setReply("Error: " + err.message);
  } finally {
    setLoading(false);
  }
}
```

**Recommended production approach (backend proxy):** create a server endpoint that holds the `OPENAI_API_KEY` on the server (never in client) and forwards requests to OpenAI.

---

**I kept translations for only a few fields, just to demonstrate that this website supports both direction and translation**

---

## Useful Links

- OpenAI API keys: [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
- OpenAI Chat Completions: `https://api.openai.com/v1/chat/completions`
- Vercel Link for this project: [https://chatgpt-prompt-orcin.vercel.app](https://chatgpt-prompt-orcin.vercel.app)

---

## Troubleshooting

- If you see any errors when running Vite, ensure your **Node version** matches the required versions listed above.
- If translations are not loading, check the RTK Query service logs and ensure the translation JSON files are available under the path expected by the service.

---
