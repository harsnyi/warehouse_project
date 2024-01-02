from django.urls import path
from . import views
from .views import (
    Hello_view,
    Add_new_occupier_view
)

urlpatterns = [
    path('hello/', Hello_view.as_view(), name='hello-view'),
    path('addNewOccupier/', Add_new_occupier_view.as_view(), name='add-new-occupier-view')
]