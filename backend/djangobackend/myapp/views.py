from django.shortcuts import render

# Create your views here.
# myapp/views.py
import pandas as pd
from django.http import JsonResponse
from django.db import connection

def get_data(request):
    with connection.cursor() as cursor:
        query = "SELECT * FROM mytable LIMIT 5"
        df = pd.read_sql_query(query, connection)
        results = df.to_dict(orient='records')
    return JsonResponse(results, safe=False)