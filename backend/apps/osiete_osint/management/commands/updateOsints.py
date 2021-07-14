from datetime import datetime, timedelta
from django.core.management.base import BaseCommand
from django.utils import timezone

from apps.osiete_osint.lib.Shodan import ShodanClient
from apps.osiete_osint.lib.Urlscan import UrlScanClient 
from apps.osiete_osint.lib.VirusTotal import VirusTotalClient 
from apps.osiete_osint.models import OsintList 


class Command(BaseCommand):
    help = 'Update all OSINTS in database.'

    def update_osint_of_vt(self, osint) -> None:
        vtclient = VirusTotalClient()
        vtclient.update_vtrisk(osint)

    def update_osint_of_us(self, osint) -> None:
        usclient = UrlScanClient()
        usclient.update_uscaninfo(osint)
    
    def test_shodan(self) -> None:
        shodan = ShodanClient()
        shodan.test()

    def handle(self, *args, **kwargs) -> None:
        self.test_shodan()
        time_threshold = datetime.now() - timedelta(minutes=2)
        # time_threshold = datetime.now() - timedelta(days=3)
        time_threshold = timezone.make_aware(time_threshold)
        all_osints = OsintList.objects.filter(updated_at__lt=time_threshold)
        print('All Osints:', all_osints)
        for osint in all_osints:
            try:
                print('threshold', time_threshold)
                print(osint, osint.updated_at)
                self.update_osint_of_vt(osint)
                self.update_osint_of_us(osint)
                osint.updated_at = timezone.now()
                osint.save()
            except:
                print('Got Restriction of VT API:', osint)
                self.update_osint_of_us(osint)
