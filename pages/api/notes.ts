/* ---------------------------------
notes
--------------------------------- */

import { connectToDatabase } from "../../util/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();

  const notes = await db
    .collection("notes")
    // .find({ userId: user?._id },)
    .find()
    .sort({ timestamp: -1 })
    .limit(20)
    .toArray();

  res.json(notes);
};
