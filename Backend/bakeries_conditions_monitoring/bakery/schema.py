import graphene
from graphene_django import DjangoObjectType
from bakery.models import Bakery


def resolve_bakery_logo_uri(bakery, info):
    return "http://192.168.0.124:8000" + bakery.logo.url


class BakeryType(DjangoObjectType):
    class Meta:
        model = Bakery
        fields = ["id", "name", "address", "temperature_records", "humidity_records"]

    logo_uri = graphene.String(resolver=resolve_bakery_logo_uri)


class Query(graphene.ObjectType):
    current_user_bakeries = graphene.List(BakeryType)

    def resolve_current_user_bakeries(root, info):
        return Bakery.objects.filter(owner=info.context.user).all()


schema = graphene.Schema(query=Query)
