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

  const param = {
    get: (key: string) => {
      return new URL(request.url).searchParams.get(key);
    },
  };

  const query = {
    get: (key: string) => {
      return new URL(request.url).searchParams.get(key);
    },
  };

  return {
    json,
    text,
    param,
    query,
    req: request,
  };
}

export default Context;
