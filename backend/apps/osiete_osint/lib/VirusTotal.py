import logging
import time

from django.utils import timezone
import requests

from apps.osiete_osint.lib.base import AbstractBaseClient
from apps.osiete_osint.models import OsintList, Service, VtComments, VtSummary

logger = logging.getLogger(__name__)


class VirusTotalClient(AbstractBaseClient):
    """ """
    def __init__(self):
        super().__init__()
        self.headers['x-apikey'] = ('1c2fb58f31b82e29a93c6a87392b21bc3b64247b8'
                                    'af0a42788a7dd03d6728c57')
        self.vt = Service.objects.get(slug='vt')

    # TODO: Change method name
    # TODO: Using vt.py for handling IP, Domain, URL
    def fetch_vt_risk(self, osint, osint_type) -> dict:
        """ """
        # osint_type = self.judge_osint_type(osint)
        if osint_type == 1:
            return self.get_vt_ipaddress(osint)
        elif osint_type == 2:
            return self.get_vt_domain(osint)
        elif osint_type == 3:
            return self.get_vt_hash(osint)
        else:
            raise RuntimeError('Error: {osint} is not setted a type')

    def request(self, endpoint) -> dict:
        response = requests.get(endpoint, headers=self.headers).json()
        return response

    def get_vt_ipaddress(self, ip) -> dict:
        base = f'{self.vt.url}ip_addresses/'
        response = [self.request(f'{base}{ip}'), 
                    self.request(f'{base}{ip}/comments'),
                    # self.request(f'{base}{ip}/historical_whois'),
                    # self.request(f'{base}{ip}/resolution')
                    ]
        # TODO@yuta create historical and resolution
        if response[0]['error'] or response[0]['error']:
            raise RuntimeError('Error: exceeded VirusTotal API restriction')
        result = self.parse_summary_ipaddress(response[0])
        result['comments'] = self.parse_comments_of_ipaddress(response[1])
        return result

    def parse_summary_ipaddress(self, res) -> dict:
        """ """
        attributes = res['data']['attributes']
        analysis = res['data']['attributes']['last_analysis_stats']

        if analysis['malicious'] > 0:
            malicious_level = OsintList.MAL
        elif analysis['malicious'] == 0 and analysis['suspicious'] > 0:
            malicious_level = OsintList.SUS
        else:
            malicious_level = OsintList.SA
        owner = attributes['as_owner'] if 'as_owner' in attributes else 'null'
        gui = ('https://www.virustotal.com/gui/ip-address/'
                f'{res["data"]["id"]}/detection')
        result = {'owner': owner,'malicious_level': malicious_level, 
                    'gui': gui, 'type': OsintList.IP}
        return result

    def parse_comments_of_ipaddress(self, res) -> dict:     
        result = [r['attributes']['text'] for r in res['data']]
        return result
    
    def parse_historical_whois_of_ipaddress(self, res):  
        pass
    #     result = [r['attributes']['text'] for r in res['data']]
    #     return result

    def parse_resolution_of_ipaddress(self, res):  
        pass
    #     result = [r['attributes']['text'] for r in res['data']]
    #     return result

    def get_vt_domain(self, domain) -> dict:
        # domain = urlparse(domain).netloc        
        base = f'{self.vt.url}domains/'
        response = [self.request(f'{base}{domain}'), 
                    # self.request(f'{base}{ip}/comments'),
                    # self.request(f'{base}{ip}/historical_whois'),
                    # self.request(f'{base}{ip}/resolution')
                    ]
        if response[0].get('error') != None:
            raise Exception('Your Input is invalid.')
        # TODO@yuta create historical and resolution
        result = self.parse_summary_domain(response[0])
        # result['comments'] = self.parse_comments_of_ipaddress(response[1])
        return result
    
    def parse_summary_domain(self, res) -> dict:
        """ """
        try:
            attributes = res['data']['attributes']
            analysis = res['data']['attributes']['last_analysis_stats']
        except KeyError:
            raise RuntimeError('This IoC is not searched VT yet.')
        if analysis['malicious'] > 0:
            malicious_level = OsintList.MAL
        elif (analysis['malicious'] == 0 and analysis['suspicious'] > 0):
            malicious_level = OsintList.SUS
        else:
            malicious_level = OsintList.SA
        owner = attributes['as_owner'] if 'as_owner' in attributes else 'null'
        gui = ('https://www.virustotal.com/gui/domain/'
                f'{res["data"]["id"]}/detection')
        result = {'owner': owner,'malicious_level': malicious_level, 
                    'gui': gui, 'type': OsintList.DOM}
        return result

    def get_vt_hash(self, hash):
        pass

    def fetch_unknown_vtrisk(self):
        not_yet_investgated = OsintList.objects.filter(malicious_level=0)
        print(not_yet_investgated)
        for target in not_yet_investgated:
            vt_result = self.fetch_vt_risk(target.data_id)
            print(target, vt_result)
            target_data = OsintList.objects.get(data_id=target)
            target_data.analyzing_type = vt_result['type']
            target_data.gui_url = vt_result['gui']
            target_data.last_analyzed = timezone.now()
            target_data.malicious_level = vt_result['malicious_level']
            target_data.save()
            vt_osint = VtSummary(osint_id=target_data, owner=vt_result['owner'], 
                                gui_url=vt_result['gui'],
                                malicious_level=vt_result['malicious_level'],)
            vt_osint.save()

    def update_vtrisk(self, osint):
        try:
            vt_result = self.fetch_vt_risk(osint.osint_id, osint.osint_type)
            print(vt_result)
            osint_data = OsintList.objects.get(osint_id=osint.osint_id)
            VtSummary.objects.update_or_create(gui_url=vt_result['gui'],
                            osint_id=osint_data, owner=vt_result['owner'],
                            malicious_level=vt_result['malicious_level'])
            for comment in vt_result['comments']:
                try:
                    VtComments.objects.update_or_create(osint_id=osint_data, 
                                                        comment=comment)
                except:
                    print('Could not insert data')
            print('VirusTotal information is updated.')
            time.sleep(15)
        except BaseException as e:
            print(e)
            print('Something went wrong')
            pass
