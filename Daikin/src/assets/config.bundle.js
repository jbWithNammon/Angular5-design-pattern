var config = {
    ApiEndpoint: "http://192.168.10.192:1050/EDBWebService.asmx/",
    ApiPhoto: "http://192.168.10.000/",
    AppLanguage: "TH",
    AppIdle: { Idle: 60, TimeOut: 10, Ping: 120 }
}
setElement();
function setElement() {
    let config = getConfig();
    var link = document.getElementsByTagName("link")[0];
    var att = document.createAttribute("config");
    att.value = window.btoa(JSON.stringify(config));
    link.setAttributeNode(att);
}
function getConfig() {
    return config;
}