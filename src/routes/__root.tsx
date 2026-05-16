import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Glamupbykirthi — Luxury Makeup & Hairstyling Studio in Melbourne" },
      { name: "description", content: "Glamupbykirthi is a luxury makeup and hairstyling studio in Docklands, Melbourne. Bridal, HD, soft glam and hairstyling — book on WhatsApp." },
      { property: "og:title", content: "Glamupbykirthi — Luxury Makeup & Hairstyling Studio in Melbourne" },
      { property: "og:description", content: "Glamupbykirthi is a luxury makeup and hairstyling studio in Docklands, Melbourne. Bridal, HD, soft glam and hairstyling — book on WhatsApp." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Glamupbykirthi — Luxury Makeup & Hairstyling Studio in Melbourne" },
      { name: "twitter:description", content: "Glamupbykirthi is a luxury makeup and hairstyling studio in Docklands, Melbourne. Bridal, HD, soft glam and hairstyling — book on WhatsApp." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/c432a870-8577-4f02-bcce-6ce624724086/id-preview-cb118e9b--66096df3-4e2c-4041-9838-85934b3c7a4c.lovable.app-1778917583604.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/c432a870-8577-4f02-bcce-6ce624724086/id-preview-cb118e9b--66096df3-4e2c-4041-9838-85934b3c7a4c.lovable.app-1778917583604.png" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppFloating } from "@/components/WhatsAppButton";
import { Toaster } from "sonner";

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const path = typeof window !== "undefined" ? window.location.pathname : "";
  const isAdmin = path.startsWith("/admin");

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col">
        {!isAdmin && <Navbar />}
        <main className="flex-1">
          <Outlet />
        </main>
        {!isAdmin && <Footer />}
        {!isAdmin && <WhatsAppFloating />}
        <Toaster position="top-center" richColors />
      </div>
    </QueryClientProvider>
  );
}
