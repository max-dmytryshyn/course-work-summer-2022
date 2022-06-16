from rest_framework import viewsets
from django.contrib.auth.models import User
from rest_framework.authentication import TokenAuthentication
from rest_framework import permissions

from users.serializers import UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    model = User
    serializer_class = UserSerializer
    queryset = User.objects.all()
    authentication_classes = [
        TokenAuthentication
    ]

    def get_permissions(self):
        if self.action in ["create"]:
            return [
                permissions.AllowAny()
            ]

        return [
            permissions.IsAuthenticated()
        ]


