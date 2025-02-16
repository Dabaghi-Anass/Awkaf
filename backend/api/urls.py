from django.urls import path
from .views import InputFieldListCreate,BulkInputFieldUpdate, BulkInputFieldDelete,SaveZakatHistoryView

urlpatterns = [
    # InputField URLs
    path("inputfields/", InputFieldListCreate.as_view(), name="inputfield-list-create"),
    path("inputfields/bulk-update/", BulkInputFieldUpdate.as_view(), name="inputfield-bulk-update"),
    path("inputfields/bulk-delete/", BulkInputFieldDelete.as_view(), name="inputfield-bulk-delete"),
      path("save-zakat-history/", SaveZakatHistoryView.as_view(), name="save_zakat_history"),
]