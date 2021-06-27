import json

from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
# from rest_framework import serializers
from rest_framework.parsers import JSONParser

from .models import OsintList, Service, VtSummary
from .serializers import OsintListSerializer

# Create your views here.

def top_page(request):
    """
    List all OSINTs, or create a new OSINT.
    This method is used by React Frontend(osiete osint react).
    """
    # if request.method == 'GET':
    #     osints = OsintList.objects.all()
    #     serializer = OsintListSerializer(osints, many=True)
    #     print(type(serializer))
        # return JsonResponse(serializer.data, safe=False)
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
                vtsm = VtSummary.objects.get(osint_id__osint_id=req['osint_id'])
                vtsm_json = {'data_id': vtsm.osint_id.osint_id, 
                             'malicious_level': vtsm.malicious_level, 
                             'owner': vtsm.owner, 
                             'gui': vtsm.gui_url}
                vtsm_json = json.dumps(vtsm_json)
                return HttpResponse(vtsm_json, status=201)
            except:
                message = f'{req["osint_id"]} is not updated yet'
                print(message)
                return JsonResponse(message, status=202 )
                raise RuntimeError('Just in OsintList')
        else:
            serializer = OsintListSerializer(data=req)
            if serializer.is_valid():
                serializer.save()
                message = f'{req["osint_id"]} is not regisered yet'
                return JsonResponse(message, status=202)
            return JsonResponse(serializer.errors, status=400)