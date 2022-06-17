import graphene
from bakery.schema import Query as BakeryQuery
from sensors_data.schema import Query as SensorsDataQuery, Mutation as SensorsDataMutation


class Query(BakeryQuery, SensorsDataQuery, graphene.ObjectType):
    pass


class Mutation(SensorsDataMutation, graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)
