const mongoose = require("mongoose");

const MONGO_URI = `mongodb+srv://lenson:Lenson27@cluster0.jfibqlk.mongodb.net/blog`;
mongoose.set('strictQuery', false);

mongoose
  .connect(MONGO_URI)
  .then((res) => console.log("MongoDB connected "))
  .catch((err) => console.log(err));
