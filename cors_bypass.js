let headers = $response.headers;
headers["Access-Control-Allow-Origin"] = "https://visa.vfsglobal.com"; // 只保留一个值
$done({headers});
