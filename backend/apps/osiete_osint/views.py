import json

from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser

from apps.osiete_osint.models import OsintList, Service, UrlScan, VtSummary
from apps.osiete_osint.serializers import (OsintListSerializer, 
UrlScanSerializer, VtSummarySerializer)

# Create your views here.

def top_page(request):
    """
    List all OSINTs, or create a new OSINT.
    This method is used by React Frontend(osiete osint react).
    """
    services = Service.objects.all()
    print(services)
    return HttpResponse(services)

@csrf_exempt
def osint_list(request):
    if request.method == 'GET':
        osints = OsintList.objects.all()
        serializer = OsintListSerializer(osints, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        req = JSONParser().parse(request)
        if OsintList.objects.filter(osint_id=req['osint_id']):
            try:
                vtsum = VtSummary.objects.get(osint_id__osint_id=req['osint_id'])
                vtsum_json = {'data_id': vtsum.osint_id.osint_id, 
                             'malicious_level': vtsum.malicious_level, 
                             'owner': vtsum.owner, 
                             'gui': vtsum.gui_url}
                vtsum_json = json.dumps(vtsum_json)
                return HttpResponse(vtsum_json, status=201)
            except:
                message = f'{req["osint_id"]} is not updated yet'
                return JsonResponse(message, status=202)
        else:
            serializer = OsintListSerializer(data=req)
            if serializer.is_valid():
                serializer.save()
                message = f'{req["osint_id"]} is not regisered yet'
                return JsonResponse(message, status=202)
            return JsonResponse(serializer.errors, status=400)

@csrf_exempt
def api_urlscan(request):
    """
    Return all Urlscan OSINTs, or an OSINT.
    This method is used by React Frontend(osiete osint react).
    """
    # uscan = UrlScanClient()
    if request.method == 'GET':
        uscan_osints = UrlScan.objects.all()
        serializer = UrlScanSerializer(uscan_osints, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        req_data = JSONParser().parse(request)
        try:
            uscan = UrlScan.objects.filter(domain__icontains=req_data['domain'])
            serializer = UrlScanSerializer(uscan, many=True)
            return JsonResponse(serializer.data, safe=False)
        except:
            raise RuntimeError('No data in Urlscan.io')

@csrf_exempt
def api_vtsummary(request):
    """
    List all OSINTs, or create a new OSINT.
    This method is used by React Frontend(osiete osint react).
    """
    if request.method == 'GET':
        vtsum = VtSummary.objects.all()
        serializer = VtSummarySerializer(vtsum, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        data = JSONParser().parse(request)
        if VtSummary.objects.filter(osint_id=data['osint_id']):
            vtsum = VtSummary.objects.get(osint_id__osint_id=data['osint_id'])
            vtsum_json = {'data_id': vtsum.osint_id.data_id, 
                          'malicious_level': vtsum.malicious_level, 
                          'owner': vtsum.owner, 
                          'gui': vtsum.gui_url}
            vtsum_json = json.dumps(vtsum_json)
            return HttpResponse(vtsum_json, status=202)
        else:
            serializer = OsintListSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
            return JsonResponse(serializer.errors, status=400)


@csrf_exempt
def api_vtcomments(request):
    pass
