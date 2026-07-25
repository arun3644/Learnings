// const database = require("./data");
// const { URL } = require('url');
// const { setHeaders } = require('./setHeaders');
// const { sendJson } = require('./parsing/sendJson');
// const { parseBody } = require('./parsing/parseBody');
// const routing = async (req, res) => {
//     try{
//          setHeaders(res);
    
//     const { method, url } = req;
//     const parsedUrl = new URL(url, `http://${req.headers.host}`);
//     const pathName = parsedUrl.pathname;

//     if (method === 'OPTIONS' || pathName === '/favicon.ico') {
//         return res.writeHead(204).end();
//     }

//     if (method === 'GET' && pathName === '/order') {
//         return sendJson(res, 200, database.show());
//     }

//     if (method === 'POST' && pathName === '/order') {
//         const newOrder = await parseBody(req, res);
//         if (!newOrder.customerName || !newOrder.product || !newOrder.quantity) {
//             return sendJson(res, 400, { error: "Feilds are missing" });
//         }
//         database.add(newOrder)
//         return sendJson(res, 201, database.show());
//     }
//     if (method === 'PATCH' && pathName.startsWith('/order/')) {
//         const updatedOrder = await parseBody(req, res);
//         if (!updatedOrder) {
//             return sendJson(res, 400, { message: "Empty JSON" })
//         }

//         const result = database.update(res, pathName, updatedOrder);
//         if (result === true)
//             return sendJson(res, 200, database.show());
//     }
//     if (method === "DELETE" && pathName.startsWith('/order/')) {
//         const result = database.deleteOrder(res, pathName);

//         if (result === true)
//             return sendJson(res, 200, { message: "Deleted Successfully" });
//     }
//     sendJson(res, 404, {error: "Path not found"})
//     }catch(err){
//         sendJson(res, 500, {error: "Internal Server Error"})
//     }
   
// }

// module.exports = { routing };


// routes.js
const database = require("./data");
const { URL } = require("url");
const { setHeaders } = require("./setHeaders");
const { sendJson } = require("./parsing/sendJson");
const { parseBody } = require("./parsing/parseBody");

const routing = async (req, res) => {
  try {
    setHeaders(res);
    const { method, url } = req;
    const parsedUrl = new URL(url, `http://${req.headers.host}`);
    const pathName = parsedUrl.pathname;

    if (method === "OPTIONS" || pathName === "/favicon.ico") {
      return res.writeHead(204).end();
    }

    // GET - Show all orders
    if (method === "GET" && pathName === "/order") {
      const data = await database.show();
      return sendJson(res, 200, data);
    }

    // POST - Add new order
    if (method === "POST" && pathName === "/order") {
      const newOrder = await parseBody(req, res);
      if (!newOrder.customerName || !newOrder.product || !newOrder.quantity) {
        return sendJson(res, 400, { error: "Fields are missing" });
      }
      await database.add(newOrder);
      const data = await database.show();
      return sendJson(res, 201, data);
    }

    // PATCH - Update order
    if (method === "PATCH" && pathName.startsWith("/order/")) {
      const id = pathName.split("/")[2];
      const updatedOrder = await parseBody(req, res);

      if (!updatedOrder || Object.keys(updatedOrder).length === 0) {
        return sendJson(res, 400, { error: "Empty JSON" });
      }

      const result = await database.update(id, updatedOrder);
      if (result) {
        const data = await database.show();
        return sendJson(res, 200, data);
      } else {
        return sendJson(res, 404, { error: "Order not found" });
      }
    }

    // DELETE - Remove order
    if (method === "DELETE" && pathName.startsWith("/order/")) {
      console.log(method)
      const id = pathName.split("/")[2];
      const result = await database.deleteOrder(id);
      if (result) return sendJson(res, 200, { message: "Deleted Successfully" });
      return sendJson(res, 404, { error: "Order not found" });
    }

    sendJson(res, 404, { error: "Path not found" });
  } catch (err) {
    console.error("Server Error:", err);
    sendJson(res, 500, { error: "Internal Server Error" });
  }
};

module.exports = { routing };
