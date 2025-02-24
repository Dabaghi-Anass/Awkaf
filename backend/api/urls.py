from django.urls import path
from .views import InputFieldListCreate,BulkInputFieldUpdate, BulkInputFieldDelete,SaveZakatHistoryView,AdminDeleteUserView,ManageZakatHistoryAPIView,   WaqfProjectListCreateView, WaqfProjectDetailView,send_contact_email,RequestPasswordResetView, ResetPasswordView

urlpatterns = [
    # InputField URLs
    path("inputfields/", InputFieldListCreate.as_view(), name="inputfield-list-create"),
    path("inputfields/bulk-update/", BulkInputFieldUpdate.as_view(), name="inputfield-bulk-update"),
    path("inputfields/bulk-delete/", BulkInputFieldDelete.as_view(), name="inputfield-bulk-delete"),
    path("save-zakat-history/", SaveZakatHistoryView.as_view(), name="save_zakat_history"),
    path('admin/delete-user/<int:user_id>/', AdminDeleteUserView.as_view(), name='admin-delete-user'),
    path('admin/manage-zakat/', ManageZakatHistoryAPIView.as_view(), name='manage-zakat'),
    path("waqf-projects/", WaqfProjectListCreateView.as_view(), name="waqfproject-list-create"),
    path("waqf-projects/<int:pk>/", WaqfProjectDetailView.as_view(), name="waqfproject-detail"),
    path("send-email/", send_contact_email, name="send_email"),
    path("user/request-password-reset/", RequestPasswordResetView.as_view(), name="request-password-reset"),
    path("user/reset-password/<str:uidb64>/<str:token>/", ResetPasswordView.as_view(), name="reset-password")
    
]