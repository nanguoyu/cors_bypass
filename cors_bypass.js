let headers = $response.headers;

// 统一大小写，避免浏览器误解
if (headers["access-control-allow-origin"]) {
    delete headers["access-control-allow-origin"];
}
if (headers["Access-Control-Allow-Origin"]) {
    delete headers["Access-Control-Allow-Origin"];
}

// 重新添加正确的 CORS 头
headers["Access-Control-Allow-Origin"] = "https://visa.vfsglobal.com";
headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS";
headers["Access-Control-Allow-Headers"] = "*";

// 确保 Vary 头不会干扰 CORS
if (headers["Vary"]) {
    delete headers["Vary"];
}

$done({headers});
