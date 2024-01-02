from django.urls import path
from . import views
from .views import (
    AddNewOccupierView,
    GetAllOccupiersView,
    GetOccupierView,
    UpdateOccupierView,
    DeleteOccupierView,
    AddNewStorageView,
    GetAllStorageView
)

urlpatterns = [
    path('addNewOccupier', AddNewOccupierView.as_view(), name='add-new-occupier-view'),
    path('getOccupiers', GetAllOccupiersView.as_view(), name='get-all-occupiers'),
    path('getOccupier/<int:pk>', GetOccupierView.as_view(), name='get-occupier-by-id'),
    path('updateOccupier/<int:pk>', UpdateOccupierView.as_view(), name='update-occupier'),
    path('deleteOccupier/<int:pk>', DeleteOccupierView.as_view(), name='delete-occupier'),
    path('addNewStorage', AddNewStorageView.as_view(), name='add-new-storage'),
    path('getAllStorage', GetAllStorageView.as_view(), name='get-all-storage')

]