from django.urls import path
from . import views
from .views import (
    HelloView,
    AddNewOccupierView,
    GetAllOccupiersView,
    GetOccupierView,
    UpdateOccupierView
)

urlpatterns = [
    path('hello', HelloView.as_view(), name='hello-view'),
    path('addNewOccupier', AddNewOccupierView.as_view(), name='add-new-occupier-view'),
    path('getOccupiers', GetAllOccupiersView.as_view(), name='get-all-occupiers'),
    path('getOccupier/<int:pk>', GetOccupierView.as_view(), name='get-occupier-by-id'),
    path('updateOccupier/<int:pk>', UpdateOccupierView.as_view(), name='update-occupier'),
]