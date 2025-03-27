from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from .views import (
    InputFieldListCreate, BulkInputFieldUpdate, BulkInputFieldDelete,
    SaveZakatHistoryView, AdminDeleteUserView, ManageZakatHistoryAPIView,
    AdminNonStaffUserListView, WaqfProjectListCreateView, WaqfProjectDetailView,
    send_contact_email, RequestPasswordResetView, ResetPasswordView,
    WaqfProjectReadOnlyListView, WaqfProjectReadOnlyDetailView,
    create_table,  get_table_data ,rename_table, modify_table, delete_table,WaqfProjectListView ,calculate_zakat,create_company_with_fields,delete_company,update_company_with_fields
)
from . import views  # or from your_app_name import views if outside
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
    
    path("admin/rename-table/", rename_table, name="rename-table"),
    path("admin/modify-table/", modify_table, name="modify-table"),
    path("admin/delete-table/<str:table_name>/", delete_table, name="delete-table"),
    path("list/waqf-projects/", WaqfProjectListView.as_view(), name="waqf-projects-list"),
    path('calculate-zakat/', calculate_zakat, name="calculate_zakat"),
    path('create-company-with-fields/', create_company_with_fields, name="create_company_with_fields"),
    path('delete-company/<int:company_type_id>/', delete_company, name="delete_company"),
    path('update-company/<int:company_type_id>/', update_company_with_fields, name="update_company"),
    path('company-type/<int:company_type_id>/fields/', views.get_company_type_fields),
    
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
