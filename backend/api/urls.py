from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from .views import (
    InputFieldListCreate, BulkInputFieldUpdate, BulkInputFieldDelete,
    SaveZakatHistoryView, AdminDeleteUserView, ManageZakatHistoryAPIView,
    AdminNonStaffUserListView, WaqfProjectListCreateView, WaqfProjectDetailView,
    send_contact_email, RequestPasswordResetView, ResetPasswordView,
    WaqfProjectReadOnlyListView, WaqfProjectReadOnlyDetailView,
    create_table,  get_table_data # ✅ Import create_table view
)

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
    path("user/reset-password/<str:uidb64>/<str:token>/", ResetPasswordView.as_view(), name="reset-password"),
    path("public/waqf-projects/", WaqfProjectReadOnlyListView.as_view(), name="public-waqfproject-list"),
    path("public/waqf-projects/<int:pk>/", WaqfProjectReadOnlyDetailView.as_view(), name="public-waqfproject-detail"),
    path('admin/non-staff-users/', AdminNonStaffUserListView.as_view(), name='admin-non-staff-user-list'),  # get users  
   
    # ✅ Add your new endpoint
    path("admin/create-table/", create_table, name="create-table"),
    path("admin/get-table/<str:table_name>/", get_table_data, name="get-table"),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
