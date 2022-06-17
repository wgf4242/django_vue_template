from rest_framework import serializers

from . import models


class RecursiveSerializer(serializers.Serializer):

    def to_representation(self, value):
        serializer = self.parent.parent.__class__(value, context=self.context)
        return serializer.data


class DepartmentSerializer(serializers.Serializer):
    name = serializers.CharField(allow_null=True, allow_blank=True)
    parent = serializers.PrimaryKeyRelatedField(read_only=True)
    depts = RecursiveSerializer(many=True)

    class Meta:
        model = models.Department
        fields = '__all__'


class UserSerializer(serializers.Serializer):
    username = serializers.CharField()
    name = serializers.SerializerMethodField()

    def get_name(self, instance):
        if hasattr(instance, 'hseuser'):
            return instance.hseuser.name
        return instance.get_full_name()


    # name = serializers.CharField(source='hse_user.name')
