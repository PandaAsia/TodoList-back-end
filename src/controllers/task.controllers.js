import { pool } from "../db.js";

export const getAllTask = async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM taks");
  res.json(rows);
};

export const getTask = async (req, res) => {
  const { id } = req.params;
  const { rows } = await pool.query(`SELECT * FROM taks WHERE id=${id}`);
  if (rows.length === 0)
    return res.status(404).json({ message: "Task not fount" });
  return res.json(rows[0]);
};

export const postTask = async (req, res) => {
  try {
    const data = req.body;
    const { rows } = await pool.query(
      "INSERT INTO taks (taskName, completed) VALUES ($1, $2) RETURNING *",
      [data.title, data.completed]
    );
    return res.json(rows[0]);
  } catch (error) {
    console.log(error);
    if (error?.code === "23505") {
      return res.status(409).json({ message: "el task ya existe" });
    }

    return res.status(500).json({ message: "Internal already exits" });
  }
};

export const putTask = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const { rows } = await pool.query(
    "UPDATE taks SET taskName=$1, completed=$2 WHERE id=$3 RETURNING *",
    [data.title, data.completed, id]
  );
  return res.json(rows[0]);
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  const { rows, rowCount } = await pool.query(
    "DELETE FROM taks WHERE id=$1 RETURNING *",
    [id]
  );
  if (rowCount === 0)
    return res.status(404).json({ message: "Task not fount" });
  return res.sendStatus(204);
  //return res.json(rows);
};
