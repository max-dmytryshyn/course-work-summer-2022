import graphene
from django.contrib.auth.models import User
from graphene_django import DjangoObjectType
from django.shortcuts import get_object_or_404
from graphql import GraphQLError

from sensors_data.models import TemperatureSensorData, HumiditySensorData
from bakery.models import Bakery


class TemperatureSensorDataType(DjangoObjectType):
    class Meta:
        model = TemperatureSensorData
        fields = ["id", "temperature", "date", "bakery"]


class HumiditySensorDataType(DjangoObjectType):
    class Meta:
        model = HumiditySensorData
        fields = ["id", "humidity", "date", "bakery"]


class Query(graphene.ObjectType):
    bakery_temperature_records = graphene.List(TemperatureSensorDataType, bakery_id = graphene.Int(required=True))
    bakery_humidity_records = graphene.List(HumiditySensorDataType, bakery_id = graphene.Int(required=True))
    bakery_temperature_last_record = graphene.Field(TemperatureSensorDataType, bakery_id = graphene.Int(required=True))
    bakery_humidity_last_record = graphene.Field(HumiditySensorDataType, bakery_id=graphene.Int(required=True))

    def resolve_bakery_temperature_records(root, info, bakery_id):
        bakery = get_object_or_404(Bakery, pk=bakery_id)
        if bakery.owner == info.context.user:
            raise GraphQLError("You have no access to this bakery's records")
        else:
            return TemperatureSensorData.objects.filter(bakery=bakery).all()

    def resolve_bakery_humidity_records(root, info, bakery_id):
        bakery = get_object_or_404(Bakery, pk=bakery_id)
        if bakery.owner == info.context.user:
            raise GraphQLError("You have no access to this bakery's records")
        else:
            return HumiditySensorData.objects.filter(bakery=bakery).all()

    def resolve_bakery_temperature_last_record(root, info, bakery_id):
        bakery = get_object_or_404(Bakery, pk=bakery_id)
        if bakery.owner == info.context.user:
            raise GraphQLError("You have no access to this bakery's records")
        else:
            return TemperatureSensorData.objects.filter(bakery=bakery).last()

    def resolve_bakery_humidity_last_record(root, info, bakery_id):
        bakery = get_object_or_404(Bakery, pk=bakery_id)
        if bakery.owner == info.context.user:
            raise GraphQLError("You have no access to this bakery's records")
        else:
            return HumiditySensorData.objects.filter(bakery=bakery).last()


class CreateTemperatureRecord(graphene.Mutation):
    id = graphene.ID()
    date = graphene.Date()
    temperature = graphene.Float()
    bakery_id = graphene.ID()

    class Arguments:
        temperature = graphene.Float()
        bakery_id = graphene.ID()

    def mutate(self, info, temperature, bakery_id):
        if info.context.user != User.objects.get(pk=1):
            raise GraphQLError('You have no permission to create temperature record')
        bakery = get_object_or_404(Bakery, pk=bakery_id)
        temperature_record = TemperatureSensorData(temperature=temperature, bakery=bakery)
        temperature_record.save()

        return CreateTemperatureRecord(
            id=temperature_record.id,
            date=temperature_record.date,
            temperature=temperature_record.temperature,
            bakery_id=temperature_record.bakery.id
        )


class CreateHumidityRecord(graphene.Mutation):
    id = graphene.ID()
    date = graphene.Date()
    humidity = graphene.Float()
    bakery_id = graphene.ID()

    class Arguments:
        humidity = graphene.Float()
        bakery_id = graphene.ID()

    def mutate(self, info, humidity, bakery_id):
        if info.context.user != User.objects.get(pk=1):
            raise GraphQLError('You have no permission to create humidity record')
        if humidity < 0 or humidity > 100:
            raise GraphQLError('Humidity must be between 0 and 100')
        bakery = get_object_or_404(Bakery, pk=bakery_id)
        humidity_record = HumiditySensorData(humidity=humidity, bakery=bakery)
        humidity_record.save()

        return CreateHumidityRecord(
            id=humidity_record.id,
            date=humidity_record.date,
            humidity=humidity_record.humidity,
            bakery_id=humidity_record.bakery.id
        )


class Mutation(graphene.ObjectType):
    create_temperature_record = CreateTemperatureRecord.Field()
    create_humidity_record = CreateHumidityRecord.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
