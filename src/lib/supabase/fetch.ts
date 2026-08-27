import https from "node:https";

async function serializeBody(body: RequestInit["body"]): Promise<Buffer | undefined> {
  if (!body) return undefined;
  if (typeof body === "string") return Buffer.from(body);
  if (body instanceof Uint8Array) return Buffer.from(body);
  if (body instanceof ArrayBuffer) return Buffer.from(body);
  if (typeof body === "object" && "getReader" in body) {
    const reader = (body as ReadableStream<Uint8Array>).getReader();
    const chunks: Uint8Array[] = [];
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value) chunks.push(value);
    }
    return Buffer.concat(chunks.map((chunk) => Buffer.from(chunk)));
  }
  return undefined;
}

/** System TLS + reliable HTTPS for Supabase (Windows Node SSL/network fixes). */
export async function supabaseFetch(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> {
  if (input instanceof Request) {
    const headers = new Headers(input.headers);
    if (init?.headers) {
      new Headers(init.headers).forEach((value, key) => {
        headers.set(key, value);
      });
    }

    return supabaseFetch(input.url, {
      method: init?.method ?? input.method,
      headers,
      body: init?.body ?? input.body,
    });
  }

  const url = new URL(input);
  const body = await serializeBody(init?.body);

  const headers = init?.headers
    ? Object.fromEntries(new Headers(init.headers).entries())
    : {};

  if (body && !headers["Content-Length"] && !headers["content-length"]) {
    headers["Content-Length"] = String(body.length);
  }

  return new Promise((resolve, reject) => {
    const req = https.request(
      {
        hostname: url.hostname,
        port: url.port || 443,
        path: `${url.pathname}${url.search}`,
        method: init?.method ?? "GET",
        headers,
      },
      (res) => {
        const chunks: Buffer[] = [];
        res.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
        res.on("end", () => {
          const text = Buffer.concat(chunks).toString("utf8");
          resolve(
            new Response(text, {
              status: res.statusCode ?? 500,
              headers: res.headers as HeadersInit,
            })
          );
        });
      }
    );

    req.on("error", reject);
    if (body) req.write(body);
    req.end();
  });
}
