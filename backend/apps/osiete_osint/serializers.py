from rest_framework import serializers

from apps.osiete_osint.models import (
    OsintList, Service, UrlScan, VtComments, VtSummary)


class ServiceSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Service
        fields = ('name', 'slug', 'url')


class OsintListSerializer(serializers.ModelSerializer):
    class Meta:
        model = OsintList
        fields = ('osint_id', 'osint_type', 'updated_at', 'malicious_level')


class UrlScanSerializer(serializers.ModelSerializer):
    class Meta:
        model = UrlScan
        fields = ('osint_id', 'date', 'domain', 'primary_ip', 'server', 'asn', 
                  'asnname', 'ptr', 'screenshot') 


class VtCommentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = VtComments
        fields = ('osint_id', 'date', 'comment')


class VtSummarySerializer(serializers.ModelSerializer):
    data = OsintListSerializer(read_only=True)
    class Meta:
        model = VtSummary
        fields = ('__all__')
