Paste your rich text content here. Y

# 📦 ImageUploader Package

A powerful and flexible image uploading utility for Node.js, Express, or NestJS apps.

*    ✅ Upload single or multiple images     
*    🌐 Automatically serves uploaded images via `/uploads`   
*    💾 Saves metadata to PostgreSQL, MySQL, or MongoDB    
*    🧠 Auto-detects base URL if not provided    
*    ⚙️ Automatically configures Express route internally  
*    📦 Works even after deployment (e.g. with domain names)   
*    🗃 Handles disk storage, UUID file naming, and temp cleanup    

* * *

## 🔗 GitHub Repo

🔗 [https://github.com/Jaybhanu12/image-upload-kit](https://github.com/Jaybhanu12/image-upload-kit)

* * *

## 📦 Install Package

```
npm install image-upload-kit
```

* * *

## 🧰 How to Use

### 1\. Import and Initialize

```
import express from 'express';
import { ImageUploader } from 'image-upload-kit';

const app = express();

const uploader = new ImageUploader({
  uploadDir: 'F:/uploads', // Just a folder path where files will be saved
  db: {
    type: 'postgres', // or 'mysql' or 'mongodb'
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'password',
    database: 'testdb',
  },
});

await uploader.init(app); // Required to enable /upload and /upload/many routes + serve /uploads static

app.listen(4000, () => console.log('✅ Server running at http://localhost:4000'));
```

No need to manually define routes or static middleware — the package handles everything.

* * *

### 2\. Upload via Postman or Client

*    Method: `POST`    
*    URL: `http://localhost:4000/upload` → for **single** image     
*    URL: `http://localhost:4000/upload/many` → for **multiple** images  

**Form-Data Body:**

*    Key: `file` or `files[]`
*    Type: File   

* * *

### 3\. Get Response and View Uploaded Image

```
{
  "name": "cat.jpg",
  "url": "http://localhost:4000/uploads/uuid-cat.jpg"
}
```

The returned `url` is public and usable in browser, frontend, etc.

* * *

## 🗃 Supported Databases

You can use any one of the following:

### ✅ PostgreSQL

```
npm install pg
```

```
  db: {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'password',
    database: 'testdb',
  }
```

### ✅ MySQL

```
npm install mysql
```

```
  db: {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'testdb',
  }
```

### ✅ MongoDB

```
npm install mongodb
```

```
  db: {
    type: 'mongodb',
    host: 'localhost',
    port: 27017,
    username: '',
    password: '',
    database: 'testdb',
  }
```

* * *

## 📌 Summary

This package simplifies image uploading and serving in any backend app by:

*    Accepting single/multiple image uploads via `POST /upload` and `/upload/many`  
*    Storing images in the user-defined local folder 
*    Creating public image URLs (served from `/uploads`)   
*    Automatically saving metadata to database  
*    Auto-configuring the Express app to serve routes — no extra setup needed    
*    Auto-detecting base URL when not provided (in production too)  

* * *

## 🔐 Production Usage Tips

*    Use absolute folder paths in `uploadDir` like `/var/www/myapp/uploads`  
*    Add file type checks in your client/frontend (if needed)   
*    Deploy behind a reverse proxy like Nginx   
*    Use HTTPS in production   

* * *

## ✅ You’re Done!

This image uploader gives you:

*    🔥 Dynamic upload API  
*    📂 Local file storage    
*    🌍 Auto image serving    
*    🧠 Smart URL generation    
*    🗃 Metadata storage   

For contributions or issues: 👉 [GitHub Issues](https://github.com/Jaybhanu12/image-upload-kit)
