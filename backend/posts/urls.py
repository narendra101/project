from django.urls import path
from . import views
app_name = 'posts'
urlpatterns = [
    path('signup/', views.signup, name='signup'),
]