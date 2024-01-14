from django.urls import path
from .views_storage import (
    DeleteOccupierView,
    AddNewStorageView,
    GetAllStorageView,
    DeleteStorageView
)

from .views_occupiers import (
    AddNewOccupierView,
    GetAllOccupiersView,
    GetOccupierView,
    UpdateOccupierView,
)

urlpatterns = [
    path('addNewOccupier', AddNewOccupierView.as_view(), name='add-new-occupier-view'),
    path('getOccupiers', GetAllOccupiersView.as_view(), name='get-all-occupiers'),
    path('getOccupier/<int:pk>', GetOccupierView.as_view(), name='get-occupier-by-id'),
    path('updateOccupier/<int:pk>', UpdateOccupierView.as_view(), name='update-occupier'),
    path('deleteOccupier/<int:pk>', DeleteOccupierView.as_view(), name='delete-occupier'),
    path('addNewStorage', AddNewStorageView.as_view(), name='add-new-storage'),
    path('getAllStorage', GetAllStorageView.as_view(), name='get-all-storage'),
    path('deleteStorage/<int:pk>', DeleteStorageView.as_view(), name='delete-storage')
]