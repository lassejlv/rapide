import type { Route, Handler, Methods, NotFound } from "./types";
import Context from "./Context";

async function Router(req: Request) {
  const url = new URL(req.url);

  // Needs to store: path, method, handler
  const routes = new Map<Route, Handler>();

  function route(method: Methods, path: string, handler: Handler) {
    routes.set({ method, path, handler }, handler);
  }

  const run = async ({ notFound = () => new Response("Not Found", { status: 404 }) }: { notFound?: NotFound }) => {
    for (const [route, handler] of routes) {
      if (req.method === route.method && url.pathname === route.path) {
        const c = Context(req);

        // @ts-ignore
        return handler(c, req);
      }
    }

    return notFound();
  };

  return {
    run,
    route,
  };
}
export default Router;
