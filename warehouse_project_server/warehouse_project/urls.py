from django.urls import path
from . import views
from .views import (
    Hello_view
)

urlpatterns = [
    path('hello/', Hello_view.as_view(), name='hello-view')
]