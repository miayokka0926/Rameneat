let URLs = {};

if (process.env.NODE_ENV === "production"){
    URLs = {
        baseURL: "/api",
        //heruku 的地址
        socketURL: "", 
    };
}else{
    URLs = {
        baseURL: "http://localhost:5500/api",
        socketURL: "http://localhost:5500/api", 
    }
}
export default URLs;