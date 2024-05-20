type Handler = (
  c: {
    json: (json: object, status?: number) => Promise<Response>;
    text: (text: string, status?: number) => Promise<Response>;
    redirect: (url: string, status?: number) => Promise<Response>;
    sendFile: (filePath: string, status?: number) => Promise<Response>;
    param: {
      get: (key: string) => string | null;
    };
    query: {
      get: (key: string) => string | null;
    };
    req: Request;
  },
  req: Request
) => Promise<Response>;
type NotFound = () => Response;
type Methods = "GET" | "POST" | "PUT" | "DELETE";
type Routes = { method: Methods; path: string; handler: Handler };
type Route = { method: Methods; path: string; handler: Handler };
type Plugins = { logger?: boolean; cors?: CorsOptions; notFound?: NotFound; pretterJson?: boolean };
type CorsOptions = { origin: string; methods: Methods[] };

export type { Handler, NotFound, Methods, Routes, Route, Plugins, CorsOptions };
