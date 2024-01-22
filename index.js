let exp = require("express");
let app = exp();
let path = require("path");
const { v4: uuidv4 } = require('uuid');/*this function is require to produce unique ids for the posts
it is install by using "npm i uuid" */
let met = require("method-override");
/* html and css use only get and post requests its mean we have to change 
there request methods by using "method-override" pkg it is installed
by using "npm install method-override"  

*/
app.use(met('_method'));//add this line to use method-override in this document
let port = 8080;
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(exp.static(path.join(__dirname, "public")));
app.use(exp.urlencoded({extended:true}));
app.use(exp.json());
let posts = [
    {
        id: uuidv4(),//this function is used to create random & uniqe id
        name: "junaid khan",
        content: "I love Coding"
    },
    {
        id: uuidv4(),
        name: "saqib khan",
        content: "I love football"
    },
    {
        id: uuidv4(),
        name: "Bahader khan",
        content: "I love my family"
    }
];
app.listen(port, ()=>{
    console.log("server is runing");
});
app.get("/posts", (req, res)=>{
    res.render("index.ejs", {posts});
});
app.get("/posts/new", (req, res)=> {
    res.render("newpost.ejs");
});
app.post("/posts", (req, res)=>{
    let {name, content} = req.body;
    let id = uuidv4();
    posts.push({id,name,content });
    res.redirect("/posts");// it send get request to the post page
});
app.get("/posts/:id" , (req, res)=>{
    let { id } = req.params;
    let post = posts.find((p)=> id === p.id);
    // console.log(post.na);
    res.render("showid.ejs", { post });
});
app.patch("/posts/:id" , (req, res)=>{
    let {id} = req.params;
    let post = posts.find((p)=> id === p.id);
    let poste = req.body.content;//jo edit form sy request a ri ha us k content ko "poste" mn dal do or post.content ko poste k equal kr do 
    post.content = poste;
    console.log(poste);//new edited content
    res.redirect("/posts");//dobara posts waly page pr ly jao refresh kr k

});
app.get("/posts/:id/edit" , (req, res)=>{
    let { id} = req.params;
    let post = posts.find((p)=> id === p.id);
    // console.log(post.na);
    res.render("edit.ejs", { post });
});
app.delete("/posts/:id", (req , res)=>{
    let { id} = req.params;
    posts = posts.filter((p)=> id !== p.id);//jis ki id ya ho gi us ko 6or k sb ko show kro
    res.redirect("/posts"); 
})