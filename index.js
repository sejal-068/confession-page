const express= require("express");
const app = express();
const port =8080;
const path= require("path");
const {v4: uuidv4}=require('uuid');
const methodOverride= require("method-override");

app.use(express.urlencoded({extended: true}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname, "views") );
app.use(methodOverride("_method"));

app.use(express.static(path.join(__dirname, "public")));


let confessions = [
  {
    id: uuidv4(),
    content: "Everything I like is expensive, fattening, and won't text me back.",
    createdAt: "Sept 3, 2019"
  },
  {
    id: uuidv4(),
    content: "Don’t rush something that you want to last forever.",
    createdAt: "Sept 3, 2019"
  },
  {
    id: uuidv4(),
    content: "I looked into your eyes and found my favorite color.",
    createdAt: "Sept 3, 2019"
  },
  {
    id: uuidv4(),
    content: "I pretend I’m okay every day, but I’m really not.",
    createdAt: "Sept 20, 2019"
  }
]

app.get("/page/:id", (req, res) =>{
  let {id}=req.params;
  let confession = confessions.find((p) => id===p.id);
  res.render("show.ejs", { confession });
});

app.post("/page", (req,res) =>{
  console.log(req.body);
  let {content,createdAt} =req.body;
  let id= uuidv4();
  confessions.push({id,content,createdAt});
  res.redirect("/page");

});

app.delete("/page/:id", (req,res) =>{
  let {id} =req.params;
  confessions = confessions.filter((p) => id !== p.id);
  res.redirect("/page")

})

app.patch("/page/:id", (req,res) =>{
  let {id} =req.params;
  let newContent=req.body.content;
   let confession= confessions.find((p)=> id===p.id);
  confession.content=newContent;
  console.log(confession);
  res.redirect("/page");

})

app.get("/page/:id/edit", (req,res) =>{
  let {id}=req.params;
 let confession=confessions.find((p) => id===p.id);
 res.render("edit.ejs", {confession});
});

app.get("/page", (req,res) =>{
     res.render("index.ejs",{confessions});
})

app.listen(port, ()=>{
    console.log(`listening to port ${port}`);
})

