// const { sendJson } = require('./parsing/sendJson');
// let db = [
//   {
//     "orderId": 1,
//     "customerName": "Arun",
//     "product": "Wireless Mouse",
//     "quantity": 2,
//     "status": "Pending"
//   }
// ]
// function getId(pathName){
//     const id = Number(pathName.split('/')[2],10);
//     return isNaN(id) ? null : id;
// }

// function show() {
//   return db;
// }

// function add(newBook) {
//   newBook.orderId = db.length > 0 ? Math.max(...db.map(d => d.orderId)) + 1 : 1;
//   newBook.status = "pending";
//   db.push(newBook);
// }

// function update(res, pathName, updatedOrder) {
//   const id = getId(pathName);
//   if (!id) return sendJson(res, 400, { error: "INVALID ID FORMAT" });

//   const index = db.findIndex(d => d.orderId === id);
//   if (index === -1) return sendJson(res, 400, { error: "ID is not Found" });

//   db[index] = { ...db[index], ...updatedOrder };
//   return true;
// }

// function deleteOrder(res, pathName) {
//   const id = getId(pathName);
//   console.log(id)
//   if (!id) return sendJson(res, 400, { error: "INVALID ID FORMAT" });

//   const index = db.findIndex(d => d.orderId === id);
//   if (index === -1) return sendJson(res, 400, { error: "ID is not Found" });

//   db = db.filter(d => d.orderId !== id);
//   return true;
// }

// module.exports = { db, show, add, update, deleteOrder };

// data.js
const { getDB } = require("./db");
const { ObjectId } = require("mongodb");

// 📥 Show all orders
async function show() {
  const db = await getDB();
  return db.collection("orders").find().toArray();
}

// ➕ Add new order
async function add(newOrder) {
  const db = await getDB();
  newOrder.status = "Pending";
  await db.collection("orders").insertOne(newOrder);
}

// ✏️ Update order
async function update(id, updatedOrder) {
  const db = await getDB();
  const result = await db.collection("orders").updateOne(
    { _id: new ObjectId(id) },
    { $set: updatedOrder }
  );
  return result.modifiedCount > 0;
}

// 🗑️ Delete order
async function deleteOrder(id) {
  const db = await getDB();
  const result = await db.collection("orders").deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount > 0;
}

module.exports = { show, add, update, deleteOrder };
