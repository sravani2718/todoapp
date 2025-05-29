const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
const port = 3000;
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://tirumalagirisravani123:VnVozKUB5s6Y1mp7@todoapp.gv16ivm.mongodb.net/")
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error:", err));
const trySchema = new mongoose.Schema({ name: String });
const Item = mongoose.model("Task", trySchema);
const todo = new Item({ name: "Sravi" });
//todo.save();
app.get("/", (_, res) => {
    Item.find({})
        .then(foundItems => {
            res.render("list", { ejes: foundItems });

        })
        .catch(err => {
            console.log(err);
            res.status(500).send("Something went wrong");
        });
});
app.post("/", (req, res) => {
    const ItemName = req.body.ele1;
    const todo = new Item({ name: ItemName });
    todo.save();
    res.redirect("/");
});
app.post("/delete", async (req, res) => {
    const checked = req.body.checkbox1;
    try {
        await Item.findByIdAndDelete(checked);
        console.log("Deleted items by Id", checked);
        res.redirect("/");
    }
    catch (err) {
        console.error("Error deleting item", err);
        res.status(500).send("Error deleting item");
    }
});
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});


