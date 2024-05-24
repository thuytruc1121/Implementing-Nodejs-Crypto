const express = require('express');
let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('myDB');

db.serialize(function () {
    db.run("CREATE TABLE IF NOT EXISTS Users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, password TEXT, fname TEXT, sname TEXT, mobile TEXT, birthday DATE, address TEXT, city TEXT, state TEXT, pcode INT)");

    db.run("DELETE FROM Users");

    db.run("CREATE TABLE IF NOT EXISTS User_feedback (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, name TEXT, feedback TEXT)");

    db.run("DELETE FROM User_feedback");

});



db.close();
app.listen(port, () => {
    // When the application starts, print to the console that our app is
    // running at http://localhost:3000. Print another message indicating
    // how to shut the server down.
    console.log(`Web server running at: http://localhost:${port}`);
    console.log(`Type Ctrl+C to shut down the web server`);
})