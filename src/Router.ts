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
      // Param Routes Parsing
      if (route.path.includes(":") && route.method === req.method) {
        const path = route.path.split("/");
        const urlPath = url.pathname.split("/");
        const params = {};

        if (path.length !== urlPath.length) {
          return notFound();
        }

        for (let i = 0; i < path.length; i++) {
          if (path[i].includes(":")) {
            // @ts-ignore
            params[path[i].replace(":", "")] = urlPath[i];
          } else {
            if (path[i] !== urlPath[i]) {
              return notFound();
            }
          }
        }

        const c = Context(req);
        c.params = params;
        // @ts-ignore
        return handler(c);
      }

      // For none param routes
      if (req.method === route.method && url.pathname === route.path) {
        const c = Context(req);

        // @ts-ignore
        return handler(c);
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
