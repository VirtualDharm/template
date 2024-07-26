```
python/pip --version

django-admin startproject backendpy
pip install django mysqlclient
python manage.py startapp myapp

#backend/settings.py
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'mydb',
        'USER': 'root',
        'PASSWORD': 'root',
        'HOST': 'localhost',
        'PORT': '3306',
    }
}
INSTALLED_APPS = [ 'myapp', ]

#myapp/views.py
import pandas as pd
from django.http import JsonResponse
from django.db import connection

def get_data(request):
    with connection.cursor() as cursor:
        query = "SELECT * FROM mytable LIMIT 5"
        df = pd.read_sql_query(query, connection)
        results = df.to_dict(orient='records')
    return JsonResponse(results, safe=False)

#myapp/urls.py
from django.urls import path
from .views import get_data

urlpatterns = [
    path('data/', get_data, name='get_data'),
]

#backend/urls.py
path('api/', include('myapp.urls')),

pip install django-cors-headers
'corsheaders','corsheaders.middleware.CorsMiddleware',CORS_ALLOW_ALL_ORIGINS = True

python manage.py migrate
python manage.py runserver


node/npm --version

npm init
npm install cors express mysql2 nodemon

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'mydb'
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

app.get('/data', (req, res) => {
  db.query('SELECT * FROM mytable limit 2', (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


CREATE DATABASE mydb;
CREATE TABLE mytable (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255)
);
INSERT INTO sample_table (name) VALUES ('Sample Data 1'),('Sample Data 2');

react:

#App.js
npx create-react-app frontend
npm install axios

import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [datajs, setDatajs] = useState([]);
  const [datapy, setDatapy] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/data')
      .then(response => {
        setDatapy(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
    axios.get('http://localhost:3001/data')
      .then(response => {
        setDatajs(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  return (
    <div className="App">
      <h1>Data from js</h1>
      <ul>
        {datajs.map(item => ( <li key={item.id}>{item.name}</li> ))}
      </ul>
      <h1>Data from django</h1>
      <ul>
        {datapy.map(item => ( <li key={item.id}>{item.name}</li> ))}
      </ul>
    </div>
  );
}

export default App;

npm start
```
