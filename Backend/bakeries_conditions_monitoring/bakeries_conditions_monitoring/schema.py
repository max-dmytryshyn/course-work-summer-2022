import graphene
from bakery.schema import Query as BakeryQuery


class Query(BakeryQuery, graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query)
