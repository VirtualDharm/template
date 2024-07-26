from django.shortcuts import render

# Create your views here.
# myapp/views.py

from django.http import JsonResponse
from django.db import connection

def get_data(request):
    with connection.cursor() as cursor:
        query = "SELECT * FROM mytable limit 5"
        cursor.execute(query)
        columns = [col[0] for col in cursor.description]
        results = [dict(zip(columns, row)) for row in cursor.fetchall()]

    return JsonResponse(results, safe=False)
