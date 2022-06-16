from django.urls import path
from rest_framework import routers
from rest_framework.authtoken.views import obtain_auth_token
from users.views import UserViewSet


router = routers.DefaultRouter()
router.register("", UserViewSet)

urlpatterns = [path("login/", obtain_auth_token)]
urlpatterns += router.urls
