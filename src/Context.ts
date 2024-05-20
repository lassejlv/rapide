import * as path from "path/posix";

function Context(request: Request) {
  const json = async (json: object, status: number = 200) => {
    return new Response(JSON.stringify(json), {
      status,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const text = async (text: string, status: number = 200) => {
    return new Response(text, {
      status,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  };

  const redirect = async (url: string, status: number = 302) => {
    return new Response(null, {
      status,
      headers: {
        Location: url,
      },
    });
  };

  const sendFile = async (filePath: string, status: number = 200) => {
    const file = Bun.file(filePath);
    let rawFileName = path.basename(filePath);
    rawFileName = rawFileName.replace(/ /g, "_");
    rawFileName = rawFileName.replace(/\\/g, "_");
    rawFileName = rawFileName.split("_")[rawFileName.split("_").length - 1];
    return new Response(file, {
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `attachment; filename="${rawFileName}"`,
      },
      status,
    });
  };

  const query = {
    get: (key: string) => {
      return new URL(request.url).searchParams.get(key);
    },
  };

  return {
    json,
    text,
    redirect,
    sendFile,
    params: {},
    query,
    req: request,
  };
}

export default Context;
