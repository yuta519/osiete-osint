from datetime import datetime
import logging
import os
import re

from django.db.utils import IntegrityError
import requests

from apps.osiete_osint.lib.base import AbstractBaseClient
from apps.osiete_osint.models import Service, UrlScan

logger = logging.getLogger(__name__)


class UrlScanClient(AbstractBaseClient):
    def __init__(self):
        super().__init__()
        self.headers = {'API-Key':os.environ.get('US_API'),
                        'Content-Type':'application/json'}
        self.us = Service.objects.get(slug='us')
        
    def fetch_domain_detail(self, target_osint) -> dict:
        target_osint = self.extract_url_domain(target_osint)
        endpoint = f'{self.us.url}/search/?q=domain:{target_osint}'
        response = requests.get(endpoint, headers=self.headers).json()
        if 'results' in response:
            result = []
            for res in response['results']:
                result.append(self.parse_domain_detail(res))
            return result
        elif 'status' in response:
            print(response['status'], response['message'])
        else:
            return {'result': 'This IoC is not in UrlScan'}
    
    def parse_domain_detail(self, res) -> dict:
        page = res['page']
        indexedAt = re.sub('\.\d*\.*Z', '', res['indexedAt'])
        ip = page['ip'] if 'ip' in page else None
        domain = page['domain'] if 'domain' in page else None
        server = page['server'] if 'server' in page else None
        asnname = page['asnname'] if 'asnname' in page else None
        asn = page['asn'] if 'asn' in page else None
        ptr = page['ptr'] if 'ptr' in page else None
        screenshot = res['screenshot'] if 'screenshot' in res else None
        parsed_result = {'date': datetime.fromisoformat(indexedAt), 
                        'ipaddress': ip, 'domain': domain, 'server': server,
                        'asnname': asnname, 'asn': asn, 'ptr': ptr,
                        'screenshot': screenshot}
        return parsed_result

    def update_uscaninfo(self, osint) -> None:
        us_results = self.fetch_domain_detail(osint.osint_id)
        for us_result in us_results:
            if us_result != 'result':
                us_osint = UrlScan(osint_id=osint, date=us_result['date'],
                    domain=us_result['domain'], server=us_result['server'], 
                    primary_ip=us_result['ipaddress'],
                    asnname=us_result['asnname'], ptr=us_result['ptr'], 
                    asn=us_result['asn'],screenshot=us_result['screenshot'])
                try:
                    us_osint.save()
                    print('Urlscan information is updated.')
                except IntegrityError:
                    pass
                # except Exception as e:
                #     print(e)