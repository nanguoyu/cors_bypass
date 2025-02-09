let headers = $request.headers;

// 添加用户代理，伪装为普通用户请求
headers["User-Agent"] = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36";

// 让 Surge 代理原始请求，绕过 CORS
$httpClient.get({
    url: $request.url,
    headers: headers
}, (error, response, body) => {
    if (error) {
        $done({ status: 500, body: "Proxy request failed" });
    } else {
        let resHeaders = response.headers;

        // 确保 CORS 头正确
        resHeaders["Access-Control-Allow-Origin"] = "https://visa.vfsglobal.com";
        resHeaders["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS";
        resHeaders["Access-Control-Allow-Headers"] = "*";

        // 删除 Cloudflare 相关头，防止 WAF 误判
        delete resHeaders["set-cookie"];
        delete resHeaders["cf-ray"];
        delete resHeaders["cf-cache-status"];
        delete resHeaders["cf-bm"];

        $done({ status: response.status, headers: resHeaders, body: body });
    }
});
