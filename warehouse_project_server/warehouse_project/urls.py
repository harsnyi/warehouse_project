from django.urls import path

from .views.storage_views import (
    AddNewStorageView,
    GetAllStorageView,
    GetAllEmptyStorageView,
    GetAllRentedStorageView,
    GetStorageView,
    DeleteStorageView,
    UpdateStorageView
)
from .views.occupier_views import (
    AddNewOccupierView,
    GetAllOccupiersView,
    GetOccupierView,
    UpdateOccupierView,
    DeleteOccupierView,
    UpdateOccupierDebtView,
    UploadExcelView,
    UpdateDebtView
)

urlpatterns = [
    path('addNewOccupier', AddNewOccupierView.as_view(), name='add-new-occupier-view'),
    path('getOccupiers', GetAllOccupiersView.as_view(), name='get-all-occupiers'),
    path('getOccupier/<int:pk>', GetOccupierView.as_view(), name='get-occupier-by-id'),
    path('updateOccupier/<int:pk>', UpdateOccupierView.as_view(), name='update-occupier'),
    path('updateOccupierDebt/<int:pk>',UpdateOccupierDebtView.as_view(),name='update-occupier-debt'),
    path('deleteOccupier/<int:pk>', DeleteOccupierView.as_view(), name='delete-occupier'),
    path('addNewStorage', AddNewStorageView.as_view(), name='add-new-storage'),
    path('getAllStorage', GetAllStorageView.as_view(), name='get-all-storage'),
    path('getAllEmptyStorage', GetAllEmptyStorageView.as_view(), name='get-all-empty-storage'),
    path('getAllRentedStorage', GetAllRentedStorageView.as_view(), name='get-all-rented-storage'),
    path('getStorage/<int:pk>', GetStorageView.as_view(), name='get-storage-by-id'),
    path('updateStorage/<int:pk>', UpdateStorageView.as_view(), name='update-storage'),
    path('deleteStorage/<int:pk>', DeleteStorageView.as_view(), name='delete-storage'),
    
    path('uploadExcel', UploadExcelView.as_view(), name='upload-excel'),
    path('updateDebt', UpdateDebtView.as_view(), name = 'update-debt')
    
]