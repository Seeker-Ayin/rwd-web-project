const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

const app = express();
const PORT = process.env.PORT || 3000;

// 只允許查詢這兩張資料表
const ALLOWED_TABLES = new Set([
  "sales_original_300",
  "sales_updated_300"
]);

app.use(cors());
app.use(express.json());

// TiDB Cloud 連線設定
const pool = mysql.createPool({
  host: process.env.MYSQLHOST,
  port: Number(process.env.MYSQLPORT || 4000),
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE || "sales_project",

  // TiDB Cloud 通常要求 TLS。
  // 請依 Connect 頁面提供的 CA 憑證設定驗證。
  ssl: process.env.MYSQL_SSL === "true"
    ? { rejectUnauthorized: true }
    : undefined,

  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 20,
  connectTimeout: 15000
});

// 首頁：確認 API 正常啟動
app.get("/", (req, res) => {
  res.json({
    message: "Sales API is running",
    endpoints: [
      "/health",
      "/api/sales?table=sales_original_300",
      "/api/sales?table=sales_updated_300"
    ]
  });
});

// 健康檢查
app.get("/health", (req, res) => {
  res.json({ ok: true });
});

// 查詢銷售資料
app.get("/api/sales", async (req, res) => {
  const table = req.query.table;

  if (!ALLOWED_TABLES.has(table)) {
    return res.status(400).json({
      error: "Invalid table name",
      allowedTables: [...ALLOWED_TABLES]
    });
  }

  try {
    // table 必須先通過白名單驗證
    const [rows] = await pool.query(
      `SELECT * FROM \`${table}\` LIMIT 5000`
    );

    res.set("Cache-Control", "no-store");

    res.json({
      table,
      count: rows.length,
      rows
    });
  } catch (error) {
    // 不將資料庫帳密或內部細節傳給前端
    console.error("Database query failed:", error.message);

    res.status(500).json({
      error: "Database query failed",
      message: "請檢查 TiDB 連線設定、TLS 憑證與資料表是否存在。"
    });
  }
});

// 關閉未使用的路由
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Sales API listening on port ${PORT}`);
});
